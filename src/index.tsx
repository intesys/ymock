import React from "react";
import ReactDOM from "react-dom";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { APP_ROOT, isHostedMode, isStandaloneMode } from "./constants";
import NotFound from "./components/NotFound";

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <NotificationsProvider
        position="top-right"
        limit={3}
        autoClose={4000}
        zIndex={999}
      >
        <BrowserRouter>
          <Routes>
            {isHostedMode && (
              <Route
                path="/"
                element={React.createElement(require("./demo/Demo")?.default)}
              />
            )}

            <Route path={isStandaloneMode ? "/" : APP_ROOT} element={<App />}>
              <Route path="settings" element={"settings"} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
