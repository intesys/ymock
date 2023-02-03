import React from "react";
import ReactDOM from "react-dom/client";
import Launcher from "./Launcher";
import mockMsw from "./mocks/mock-msw";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div
      className="App"
      style={{
        padding: "80px 1rem",
        fontFamily: "'Helvetica', 'Arial', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          margin: "0 auto",
        }}
      >
        <h1 style={{ textAlign: "center" }}>yMock Launcher Host App</h1>
      </div>

      <Launcher msw={mockMsw} />
    </div>
  </React.StrictMode>
);
