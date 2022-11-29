import { createRoot } from "react-dom/client";
import { Sample } from "./demo/Sample";

const container = document.getElementById("root");
const root = createRoot(container!);

if (process.env.NODE_ENV === "production") {
  root.render(<Sample />);
} else {
  console.log("NODE_ENV:", process.env.NODE_ENV);
  const { MockManager } = require("./views/MockManager");
  const { worker } = require("./mocks/browser");
  const { processChildIntent } = require("./utils/processChildIntent");
  const { processParentIntent } = require("./utils/processParentIntent");

  window.addEventListener(
    "message",
    function (event) {
      if (event.data.source === "window-child")
        processChildIntent(worker, event.data);
    },
    false
  );

  window.addEventListener(
    "message",
    function (event) {
      if (event.data.source === "window-parent")
        processParentIntent(event.data.content);
    },
    false
  );

  worker.start();

  if (window.location.pathname === "/mock-manager") {
    root.render(<MockManager />);
  } else {
    root.render(<Sample />);
  }
}
