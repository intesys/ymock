import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import Demo from "./demo/Demo";
import { APP_BASE_PATH } from "./constants";
import { BrowserRouter, Route, Switch } from "react-router-dom";

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
          <Switch>
            <Route path="/demo">
              <Demo />
            </Route>
            <Route path="/">
              <App />
            </Route>
          </Switch>
        </BrowserRouter>
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
