const routes = (handler) => [
  {
    method: 'POST',
    path: '/notes',
    handler: handler.postNoteHandler, // receive and store a single note
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.getNotesHandler, // return many notes
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.getNoteByIdHandler, // return a single note
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.putNoteByIdHandler, // receive and update a single note
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.deleteNoteByIdHandler, // delete a single note
  },
];

module.exports = routes;
