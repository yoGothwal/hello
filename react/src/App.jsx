import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const lastCount = window.localStorage.getItem("count");
    if (lastCount) {
      setCount(parseInt(lastCount, 10));
    }
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
      <button onClick={handleTimerStart}>Start Counter</button>
    </>
  );
}

export default App;
