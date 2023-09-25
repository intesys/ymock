import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// TODO: render this app into ymock window, opened by ymock.open()
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ymock singleton
export const ymock = {
  /**
   * Setup ymock my bassing it msw worker and the static handlers
   */
  load: ({ worker, handlers }) => {
    return this;
  },
  /**
   * Open a new window with ymock UI
   */
  open: () => {
    return this;
  },
};
