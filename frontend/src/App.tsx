import "./App.css";
import { getNotes } from "./hooks/getNotes";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { displayDate, searchNotes } from "./hooks/utils";
import { useState } from "react";

export async function loader() {
  return getNotes();
}

function Note({ note }: { note: Note }) {
  const date = displayDate(note.date);
  const tags = note.tags.join(", ");
  return (
    <div className="note">
      <span className="date">{date}</span>
      <span className="title">
        <Link to={`/notes/${note.id}`}> {note.title} </Link>
      </span>
      <span className="tags">{tags}</span>
      <div className="summary">{note.summary}</div>
    </div>
  );
}

function LatestNotes() {
  const notes = useLoaderData() as Note[];
  const [searchPattern, setSearchPattern] = useState("");
  let filteredNotes = [] as Note[];

  if (searchPattern === "") {
    filteredNotes = notes;
  } else {
    filteredNotes = searchNotes(notes, searchPattern);
  }

  return (
    <div id="latest-notes">
      <h1>Latest Notes</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchPattern(e.target.value)}
      />
      {filteredNotes.map((note) => (
        <Note note={note} key={note.id} />
      ))}
    </div>
  );
}

function App() {
  return (
    <>
      <LatestNotes />
    </>
  );
}

export default App;
