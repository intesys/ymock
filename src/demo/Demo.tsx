import React, { FormEventHandler, useState } from "react";
import { rest, RestHandler } from "msw";
import { worker } from "./mocks/browser";
import { handlers } from "./mocks/handlers";

function Demo() {
  const [response, setResponse] = useState<string>("");
  const [request, setRequest] = useState<string>("");

  async function handleRequest(path: string) {
    return (await fetch(path)).json();
  }

  if (process.env.NODE_ENV === "development") {
    const { worker } = require("./mocks/browser");
    worker.start();
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!request) {
      alert("Please select a request");
      return;
    }

    setResponse("");

    handleRequest(request).then((response) =>
      setResponse(JSON.stringify(response))
    );
  };

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
        <h1 style={{ textAlign: "center" }}>MSW Admin UI tester</h1>

        <section
          style={{
            display: "flex",
            flexDirection: "column",
            padding: ".5rem",
          }}
        >
          <pre
            style={{
              padding: "3rem 1rem",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              backgroundColor: "#eee",
              borderRadius: "6px",
              boxShadow: "inset 0 -1px #0000001a",
            }}
          >
            <code>{response ? response : null}</code>
          </pre>

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
                ? [{} as Partial<RestHandler>].concat(handlers).map((h, i) => {
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
          </form>
        </section>

        <section>
          <button
            type={"button"}
            style={{ marginTop: "2rem", width: "100%" }}
            onClick={() => {
              const windowRef = window.open(
                "/",
                "_blank",
                "popup, right=100, top=100, width=1200, height=700"
              );

              if (windowRef) {
                windowRef.msw = {
                  worker,
                  rest,
                  handlers,
                };
              }
            }}
          >
            Open Admin UI
          </button>
        </section>
      </div>
    </div>
  );
}

export default Demo;
