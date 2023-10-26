/**
 * This is a development-only support file, it works as host application for ymock
 */

import { worker } from "./mocks/browser";
import { handlers } from "./mocks/handlers";
import { ymock } from "../src/main";
import ReactDOM from "react-dom/client";
import React from "react";
import { HostApp } from "./HostApp";

const root = document.getElementById("root");
const startApp = () =>
  ReactDOM.createRoot(root as HTMLElement).render(
    <React.StrictMode>
      <HostApp {...{ worker, handlers }} />
    </React.StrictMode>
  );

worker.start().then(startApp);
ymock.load({ worker, handlers }).addButton();
// ymock.load({ worker, handlers }).open();

// Start without mocks
// startApp();
