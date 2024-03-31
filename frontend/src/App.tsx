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
  return (
    <div className="note">
      <header>
        <h4>
          <Link to={`/notes/${note.id}`}>
            <strong>{note.title}</strong>
          </Link>
        </h4>
        <p className="date">{date}</p>
      </header>
      <p>{note.summary}</p>
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

  let [page, setPage] = useState(1);
  const notesPerPage = 5;
  const maxPage = Math.ceil(filteredNotes.length / notesPerPage);
  const start = (page - 1) * notesPerPage;
  const end = page * notesPerPage;
  filteredNotes = filteredNotes.slice(start, end);

  return (
    <div id="latest-notes">
      <div className="hero">
        <h1>Sophia's Notes</h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchPattern(e.target.value)}
        />
      </div>
      <div className="notes-column">
        <div className="notes">
          {filteredNotes.map((note) => (
            <Note note={note} key={note.id} />
          ))}
        </div>
        <div className="pagination">
          <button
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          >
            ◀
          </button>
          <span>
            Page {page} of {maxPage}
          </span>
          <button
            onClick={() => {
              if (page < maxPage) {
                setPage(page + 1);
              }
            }}
          >
            ▶
          </button>
        </div>
      </div>
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
