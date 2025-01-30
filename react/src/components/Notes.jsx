import { useState } from "react";
import noteService from "../services/notes";

const Notes = ({ notes, setNotes }) => {
  const [note, setNote] = useState("");

  const deleteNote = (id) => {
    noteService.remove(id).then(() => {
      setNotes(notes.filter((note) => note.id !== id));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note === "") return;
    const noteObject = { content: note };

    noteService.create(noteObject).then((newNote) => {
      console.log("Created note: ", newNote);
      setNotes([...notes, newNote]);
      setNote("");
    });
  };

  return (
    <div className="container mt-4">
      <h4 className="text-primary">Notes</h4>
      <form onSubmit={handleSubmit} className="mt-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
      <div className="container mt-2">
        {notes.length > 0 ? (
          <div className="list-group">
            {notes.map((note) => (
              <div
                key={note.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <h5 className="mb-0">{note.content}</h5>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteNote(note.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted"></p>
        )}
      </div>
    </div>
  );
};

export default Notes;
