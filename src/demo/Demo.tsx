import React, { FormEventHandler, useState } from "react";
import {
  DefaultRequestBody,
  MockedRequest,
  RestHandler,
  SetupWorkerApi,
} from "msw";
import Launcher from "../components/Launcher";
import { APP_NAME, isDevMode, isHostedMode } from "../constants";

/*
 * Not really required since this is a demo app,
 * but in a real-life scenario the worker should
 * only run (once) in dev mode.
 * */
let worker: SetupWorkerApi;
let rest: any; // TODO
let handlers: RestHandler<MockedRequest<DefaultRequestBody>>[];

if (isDevMode) {
  worker = require("./mocks/browser")?.worker;
  rest = require("msw")?.rest;
  handlers = require("./mocks/handlers")?.handlers;

  worker?.start?.();
}

export default function Demo() {
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
