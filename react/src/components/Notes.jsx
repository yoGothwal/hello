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
    const noteObject = {
      content: note,
    };
    noteService.create(noteObject).then((newNote) => {
      console.log("Created note: ", newNote);
      setNotes([...notes, newNote]);
      setNote("");
    });
  };
  return (
    <div>
      <h1>Notes</h1>
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note.id}>
            <h3>{note.content}</h3>
            <button onClick={() => deleteNote(note.id)}>delete</button>
          </div>
        ))
      ) : (
        <p>No notes available</p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default Notes;
