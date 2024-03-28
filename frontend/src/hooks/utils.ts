import Fuse from "fuse.js";

export function searchNotes(notes: Note[], searchPattern: string) {
  const fuse = new Fuse(notes, {
    keys: ["title", "summary", "tags"],
  });
  return fuse.search(searchPattern).map((result) => result.item);
}

export function displayDate(date: Date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date
    .getFullYear()
    .toString()
    .slice(-2)}`;
}
