import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config.js";

export default async function getNotes() {
  const snapshot = await getDocs(collection(db, "notes"));
  const notesList = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return notesList;
}
