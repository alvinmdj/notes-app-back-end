const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToModel } = require('../../utils');

class NotesService {
  constructor(collaborationService, cacheService) {
    this._pool = new Pool();
    this._collaborationService = collaborationService;
    this._cacheService = cacheService;
  }

  async addNote({
    title, body, tags, owner,
  }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO notes VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, body, tags, createdAt, updatedAt, owner],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Note could not be added');
    }

    await this._cacheService.delete(`notes:${owner}`);
    return result.rows[0].id;
  }

  async getNotes(owner) {
    try {
      // get notes from cache
      const result = await this._cacheService.get(`notes:${owner}`);
      return JSON.parse(result);
    } catch (error) {
      // if cache is not available, get notes from database
      const query = {
        text: `
          SELECT notes.* FROM notes
          LEFT JOIN collaborations ON collaborations.note_id = notes.id
          WHERE notes.owner = $1 OR collaborations.user_id = $1
          GROUP BY notes.id
        `,
        values: [owner],
      };

      const result = await this._pool.query(query);
      const mappedResult = result.rows.map(mapDBToModel);

      // save notes to cache before returning
      await this._cacheService.set(`notes:${owner}`, JSON.stringify(mappedResult));

      return mappedResult;
    }
  }

  async getNoteById(id) {
    const query = {
      text: `
        SELECT notes.*, users.username
        FROM notes
        LEFT JOIN users ON users.id = notes.owner
        WHERE notes.id = $1
      `,
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Note not found');
    }

    return result.rows.map(mapDBToModel)[0];
  }

  async editNoteById(id, { title, body, tags }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE notes SET title = $1, body = $2, tags = $3, updated_at = $4 WHERE id = $5 RETURNING id, owner',
      values: [title, body, tags, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Failed to update note. Id not found');
    }

    const { owner } = result.rows[0];
    await this._cacheService.delete(`notes:${owner}`);
  }

  async deleteNoteById(id) {
    const query = {
      text: 'DELETE FROM notes WHERE id = $1 RETURNING id, owner',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Failed to delete note. Id not found');
    }

    const { owner } = result.rows[0];
    await this._cacheService.delete(`notes:${owner}`);
  }

  async verifyNoteOwner(id, owner) {
    const query = {
      text: 'SELECT * FROM notes WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Note not found');
    }

    const note = result.rows[0];

    if (note.owner !== owner) {
      throw new AuthorizationError('You are not authorized to access this resource');
    }
  }

  async verifyNoteAccess(noteId, userId) {
    try {
      // verify note owner
      await this.verifyNoteOwner(noteId, userId);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      // else it must be an AuthorizationError, so try to verify collaborator
      try {
        await this._collaborationService.verifyCollaborator(noteId, userId);
      } catch {
        throw error;
      }
    }
  }
}

module.exports = NotesService;
