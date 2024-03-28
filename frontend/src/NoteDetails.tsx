import { getNote } from "./hooks/getNotes";
import { Link, useLoaderData } from "react-router-dom";
import { displayDate } from "./hooks/utils";
import "./NoteDetails.css";

export async function loader({ params }: any) {
  const note = await getNote(params.noteId);
  return note ? note : null;
}

export default function NoteDetails() {
  const note = useLoaderData() as Note | null;
  if (!note) {
    return <div>404 Not Found</div>;
  }

  const date = displayDate(note.date);
  const tags = note.tags.join(", ");

  return (
    <div id="note-details">
      <Link to="/">◀ Back</Link>
      <div className="title-layout">
        <div>
          <h1>{note.title}</h1>
        </div>
        <div className="metadata">
          <p>{tags}</p>
          <p>{date}</p>
        </div>
      </div>
      <i>{note.summary}</i>
      <div dangerouslySetInnerHTML={{ __html: note.content }} />
    </div>
  );
}
