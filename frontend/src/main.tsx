import React from "react";
import ReactDOM from "react-dom/client";
import App, { loader as appLoader } from "./App.tsx";
import NoteDetails, { loader as noteLoader } from "./NoteDetails.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: appLoader,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/notes/:noteId",
    loader: noteLoader,
    element: <NoteDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
