/* eslint-disable camelcase */

exports.up = (pgm) => {
  // create new user
  pgm.sql("INSERT INTO users (id, username, password, fullname) VALUES ('old_notes', 'old_notes', 'old_notes', 'old_notes')");

  // modify owner value in notes table where owner is NULL
  pgm.sql("UPDATE notes SET owner = 'old_notes' WHERE owner = NULL");

  // set foreign key constraints on owner column to id from users table
  // format: fk_<tabel foreign key>.<kolom foreign key>_<tabel primary key>.<kolom primary key>
  pgm.addConstraint('notes', 'fk_notes.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // drop constraint fk_notes.owner_users.id from notes table
  pgm.dropConstraint('notes', 'fk_notes.owner_users.id');

  // modify owner value in notes table to NULL where owner is old_notes
  pgm.sql("UPDATE notes SET owner = NULL WHERE owner = 'old_notes'");

  // delete new user
  pgm.sql("DELETE FROM users WHERE id = 'old_notes'");
};
