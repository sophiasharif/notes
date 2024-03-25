import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config.js";

export async function getNotes() {
  const snapshot = await getDocs(collection(db, "notes"));
  const notesList: Note[] = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      title: doc.data().title,
      content: doc.data().content,
      summary: doc.data().summary,
      tags: doc.data().tags,
      date: new Date(doc.data().date),
    };
  });
  return notesList;
}

export async function getNote(nodeId: string): Promise<Note | null> {
  const d = await getDoc(doc(db, "notes", nodeId));
  if (!d.exists()) {
    console.log("Failed to fetch note ", nodeId);
    return null;
  }
  return {
    id: d.id,
    title: d.data().title,
    content: d.data().content,
    summary: d.data().summary,
    tags: d.data().tags,
    date: new Date(d.data().date),
  };
}
