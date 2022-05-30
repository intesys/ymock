import React from "react";
import ReactDOM from "react-dom";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { APP_BASE_PATH, isDevMode } from "./constants";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Demo from "./demo/Demo";

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles>
      <NotificationsProvider
        position="top-right"
        limit={3}
        autoClose={4000}
        zIndex={999}
      >
        <BrowserRouter basename={APP_BASE_PATH}>
          <Routes>
            {isDevMode ? <Route path="/demo" element={<Demo />} /> : null}

            <Route path="/" element={<App />} />
          </Routes>
        </BrowserRouter>
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
