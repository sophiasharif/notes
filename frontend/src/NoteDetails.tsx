import { getNote } from "./hooks/getNotes";
import { Link, useLoaderData } from "react-router-dom";
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

  return (
    <div id="note-details">
      <Link to="/">◀ Back</Link>
      <section className="title-layout">
        <h1>{note.title}</h1>
        <em>{note.summary}</em>
        <div className="tags">
          {note.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </section>
      <div dangerouslySetInnerHTML={{ __html: note.content }} />
    </div>
  );
}
