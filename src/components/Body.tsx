/* ---------------------------------
Body
--------------------------------- */

import * as React from "react";
import {
  FormEvent,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { Button } from "@mantine/core";
import { RestHandler } from "msw";

type OwnProps = {
  currentItem?: RestHandler;
  onSubmit: (input: string, path: string) => void;
};

export default function Body({
  currentItem,
  onSubmit,
}: PropsWithChildren<OwnProps>): ReactElement {
  const [input, setInput] = useState<string>("");
  const { info } = currentItem ?? {};

  function handleReset() {
    setInput("");
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!input) {
      window.alert("Please provide a value.");
      return;
    }

    if (!info?.path) {
      window.alert("No path provided");
      return;
    }

    onSubmit && onSubmit(input, info.path as string);

    handleReset();
  }

  useEffect(() => {
    if (currentItem) {
      handleReset();
    }
  }, [currentItem]);

  return !info ? (
    <span>Please select an item from the sidebar.</span>
  ) : (
    <div>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          padding: ".5rem",
        }}
      >
        <h6>Request</h6>
        <h1>
          <span>{info.method}</span> | {info.path}
        </h1>

        <h3>Set runtime request handler</h3>

        <form action="#" onSubmit={handleSubmit}>
          <textarea
            style={{ width: "100%", height: 200, padding: "1rem" }}
            placeholder={`insert runtime response override for the path: "${info.path}"...`}
            onChange={(event) => setInput(event.target.value)}
            value={input}
          />

          <Button type="submit">Submit</Button>
        </form>
      </section>
    </div>
  );
}
