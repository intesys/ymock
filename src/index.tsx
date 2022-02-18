import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles>
      <NotificationsProvider
        position="top-right"
        limit={3}
        autoClose={4000}
        zIndex={999}
      >
        <App />
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
