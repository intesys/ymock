/**
 * This is a development-only support file, it works as host application for ymock
 */

import { worker } from "../src/mocks/browser";
import { handlers } from "../src/mocks/handlers";
import { ymock } from "../src/main";
import ReactDOM from "react-dom/client";
import React from "react";
import { HostApp } from "./HostApp";

worker.start();
ymock.load({ worker, handlers }).addButton();
// ymock.load({ worker, handlers }).open();

const root = document.getElementById("root");
ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <HostApp {...{ worker, handlers }} />
  </React.StrictMode>
);
