import { useEffect, useState } from "react";
import noteService from "./services/notes";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const lastCount = window.localStorage.getItem("count");
    if (lastCount) {
      setCount(parseInt(lastCount, 10));
    }
    noteService.getAll().then((notes) => setNotes(notes));
  }, []);
  const handleTimerStart = () => {
    setInterval(() => {
      setCount((prev) => {
        const countTemp = prev + 1;
        window.localStorage.setItem("count", countTemp);
        return prev + 1;
      });
      console.log("hello");
    }, 1000);
  };
  return (
    <>
      <h1>Count : {count}</h1>
      <button
        onClick={() => {
          setCount(count + 1);
          window.localStorage.setItem("count", count + 1);
        }}
      >
        PLUS
      </button>
      <button
        onClick={() => {
          setCount(0);
          window.localStorage.removeItem("count");
        }}
      >
        RESET
      </button>
      <ul>
        {notes.map((note) => {
          <li id={note.id}>{note.content}</li>;
        })}
      </ul>
      <button onClick={handleTimerStart}>Start Counter</button>
    </>
  );
}

export default App;
