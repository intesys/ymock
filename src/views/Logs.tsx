/* ---------------------------------
Logs
--------------------------------- */

import * as React from "react";
import { PropsWithChildren, useEffect, useState } from "react";
import { WorkerLifecycleEventsMap } from "msw/lib/types/setupWorker/glossary";
import { useWorkerContext } from "../hooks";
import { Code } from "@mantine/core";

type OwnProps = {};

export default function Logs({}: PropsWithChildren<OwnProps>): JSX.Element {
  const { worker } = useWorkerContext();
  const [logs, setLogs] = useState("");
  const [detached, setDetached] = useState(false);

  console.log(logs);

  useEffect(() => {
    function handleLogUpdates(logEntry: string) {
      return function (prevLogs: string) {
        prevLogs += `[${new Date().toLocaleString()}] ${logEntry} \n`;

        return prevLogs;
      };
    }

    if (worker?.events) {
      const events: (keyof WorkerLifecycleEventsMap)[] = [
        "request:end",
        "request:match",
        "request:start",
        "request:unhandled",
        "response:bypass",
        "response:mocked",
      ];
      const listener = (ev: string) => () => setLogs(handleLogUpdates(ev));

      events.forEach((ev) => worker.events.on(ev, listener(ev)));
    }

    return () => {
      worker.events.removeAllListeners();
    };
  }, [worker]);

  return (
    <section className={"logs"}>
      Here's some logs!
      <Code block>{logs}</Code>
      <button onClick={() => setLogs("")}>Clear logs</button>
      <button onClick={() => setDetached((d) => !d)}>
        Toggle detached logs
      </button>
      <style jsx>{`
        .logs {
          position: ${detached ? "fixed" : "static"};
          bottom: 20px;
          right: 20px;
        }
      `}</style>
    </section>
  );
}
