/* ---------------------------------
Host app (vite)
--------------------------------- */

import React, { useEffect, useState } from "react";
import "./App.css";
import { DEV_MODE } from "./constants.js";

// Initialization based on the env;
// this should reflect a real-life scenario
// where the user won't import msw or ymock
// unless the env is not production.
const { rest } = DEV_MODE ? await import("msw") : undefined;
const { worker } = DEV_MODE ? await import("./mocks/browser") : undefined;
const { handlers } = DEV_MODE ? await import("./mocks/handlers") : undefined;
const Launcher = DEV_MODE ? (await import("ymock")).default : undefined;

export default function App() {
  const [response, setResponse] = useState("");
  const [request, setRequest] = useState("");

  async function handleRequest(path) {
    return (await fetch(path)).json();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!request) {
      alert("Please select a request");
      return;
    }

    setResponse("");

    const response = await handleRequest(request);

    setResponse(JSON.stringify(response));
  }

  useEffect(() => {
    worker?.start?.();
  }, []);

  return (
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
        <h1 style={{ textAlign: "center" }}>yMock Host App</h1>

        <section
          style={{
            display: "flex",
            flexDirection: "column",
            padding: ".5rem",
          }}
        >
          <form action="#" onSubmit={handleSubmit}>
            <label htmlFor="request_selector" />

            <select
              style={{ marginBottom: "1rem", width: "100%" }}
              name="request_selector"
              id="request_selector"
              onChange={(e) => setRequest(e.target.value)}
              value={request}
            >
              {handlers?.length
                ? [{}].concat(handlers).map((h, i) => {
                    const { info } = h ?? {};

                    return (
                      <option key={i} value={String(info?.path ?? "")}>{`${
                        info?.method ?? ""
                      } ${info?.method && info?.path ? "|" : ""} ${
                        info?.path ?? "Select a request"
                      }`}</option>
                    );
                  })
                : null}
            </select>

            <button type="submit" style={{ width: "100%" }}>
              Perform request
            </button>

            <pre
              style={{
                padding: "3rem 1rem",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                backgroundColor: "#eee",
                borderRadius: "6px",
                boxShadow: "inset 0 -1px #0000001a",
                color: "black",
              }}
            >
              <code>{response ? response : null}</code>
            </pre>
          </form>
        </section>

        {/* yMock Launcher */}
        {DEV_MODE ? (
          <Launcher
            msw={{
              worker,
              rest,
              handlers,
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
