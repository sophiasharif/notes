import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import getNotes from "./hooks/getNotes.ts";
import NoteDetails from "./NoteDetails.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: getNotes,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/notes/:noteId",
    element: <NoteDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
