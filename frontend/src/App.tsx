import "./App.css";
import getNotes from "./hooks/getNotes";
import { useEffect, useState } from "react";

console.log(await getNotes());

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  useEffect(() => {
    getNotes().then((data) => {
      setNotes(data);
    });
  });
  return (
    <div>
      Hello World!
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
