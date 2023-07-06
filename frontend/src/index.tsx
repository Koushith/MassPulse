import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { VideoProvider } from "./context/video.context";
import { RouterProvider } from "react-router-dom";
import { routerConfig } from "./router";
import { AuthProvider } from "./context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <VideoProvider>
        <RouterProvider router={routerConfig} />
      </VideoProvider>
    </AuthProvider>
  </React.StrictMode>
);
