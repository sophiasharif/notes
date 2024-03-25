import { getNote } from "./hooks/getNotes";
import { useLoaderData } from "react-router-dom";

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
    <div>
      <h2>{note.title}</h2>
      <p>{note.date.toDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: note.content }} />
    </div>
  );
}
