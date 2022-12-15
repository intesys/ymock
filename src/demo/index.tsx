import React from "react";
import ReactDOM from "react-dom";
import DemoApp from "./DemoApp";

if (import.meta.env.DEV) {
  import("./mocks/browser").then(({ worker }) => {
    worker.start().then(startApp);
  });
} else {
  startApp();
}

function startApp() {
  ReactDOM.render(
    <React.StrictMode>
      <DemoApp />
    </React.StrictMode>,
    document.getElementById("root")
  );
}
