import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config.js";

export default async function getNotes() {
  const snapshot = await getDocs(collection(db, "notes"));
  const notesList: Note[] = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      title: doc.data().title,
      content: doc.data().content,
      date: new Date(doc.data().date),
    };
  });
  return notesList;
}
