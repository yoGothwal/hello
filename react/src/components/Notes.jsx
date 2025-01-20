const Notes = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      {notes.length > 0 ? (
        notes.map((note) => <h3 key={note.id}>{note.content}</h3>)
      ) : (
        <p>No notes available</p>
      )}
      <button>Add note</button>
    </div>
  );
};

export default Notes;
