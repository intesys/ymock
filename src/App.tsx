import React, { useState } from "react";
import { MOCK_PATH } from "./constants";

function App() {
  const [response, setResponse] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [toggleUI, setToggleUI] = useState<boolean>(false);

  async function handleRequest() {
    return (await fetch(MOCK_PATH)).json();
  }

  function setRuntimeRequestHandler(i: string = "RUNTIME OVERRIDE") {
    const { worker, rest } = window.msw;

    worker.use(
      rest.get(MOCK_PATH, (req: any, res: any, ctx: any) => {
        return res.once(ctx.json({ title: i }));
      })
    );
  }

  function handleReset() {
    setInput("");
    setResponse("");
  }

  return (
    <div className="App">
      <div
        style={{
          maxWidth: 480,
          margin: "0 auto",
          fontFamily: "'Helvetica', 'Arial', system-ui, sans-serif",
        }}
      >
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            padding: ".5rem",
          }}
        >
          <pre style={{ padding: "3rem 1rem" }}>
            <code>{response ? response : null}</code>
          </pre>

          <button
            type="button"
            onClick={() => {
              handleReset();

              handleRequest().then((response) =>
                setResponse(JSON.stringify(response))
              );
            }}
          >
            Perform request
          </button>
        </section>

        <section
          style={{
            display: "flex",
            flexDirection: "column",
            padding: ".5rem",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setToggleUI((ui) => !ui);
            }}
          >
            Set runtime request handler
          </button>

          {toggleUI && (
            <form
              action="#"
              onSubmit={(e) => {
                if (!input) {
                  window.alert("Please provide a value.");
                  return;
                }

                e.preventDefault();
                setRuntimeRequestHandler(input);
                handleReset();
                setToggleUI(false);
              }}
            >
              <input
                type="text"
                placeholder={"insert runtime response override..."}
                onChange={(event) => setInput(event.target.value)}
                value={input}
              />

              <button type="submit">Submit</button>
            </form>
          )}
        </section>

        <section
          style={{
            display: "flex",
            padding: ".5rem",
          }}
        >
          <button
            type="button"
            onClick={() => {
              handleReset();
              window.msw?.worker?.start?.();
            }}
          >
            Start worker
          </button>

          <button
            type="button"
            onClick={() => {
              handleReset();
              window.msw?.worker?.stop?.();
            }}
          >
            Stop worker
          </button>

          <button type="button" onClick={handleReset}>
            Reset response
          </button>
        </section>
      </div>
    </div>
  );
}

export default App;
