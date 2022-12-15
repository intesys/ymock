import { Button } from "@mantine/core";
import { RestHandler, rest } from "msw";
import React, { FormEventHandler, useState } from "react";
import Launcher from "../components/Launcher";
import { APP_NAME, isDevMode, isHostedMode } from "../constants";
import { worker } from "./mocks/browser";
import { handlers } from "./mocks/handlers";

export default function DemoApp() {
  const [response, setResponse] = useState<string>("");
  const [request, setRequest] = useState<string>("");

  async function handleRequest(path: string) {
    return (await fetch(path)).json();
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!request) {
      alert("Please select a request");
      return;
    }

    setResponse("");

    handleRequest(request).then((response) => setResponse(JSON.stringify(response)));
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
        <h1 style={{ textAlign: "center" }}>
          {`${APP_NAME} Demo App`}

          {isHostedMode && (
            <>
              <br /> (hosted mode)
            </>
          )}
        </h1>

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
                ? [{} as Partial<RestHandler>].concat(handlers).map((h, i) => {
                    const { info } = h ?? {};

                    return (
                      <option key={i} value={String(info?.path ?? "")}>{`${info?.method ?? ""} ${
                        info?.method && info?.path ? "|" : ""
                      } ${info?.path ?? "Select a request"}`}</option>
                    );
                  })
                : null}
            </select>

            <Button type="submit" style={{ width: "100%" }}>
              Perform request
            </Button>

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
        {isDevMode ? (
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
