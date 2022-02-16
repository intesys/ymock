import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SetupWorkerApi } from "msw";
import { MantineProvider } from "@mantine/core";

declare global {
  interface Window {
    msw: {
      worker: SetupWorkerApi;
      rest: any;
    };
  }
}

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles>
      <App />
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
