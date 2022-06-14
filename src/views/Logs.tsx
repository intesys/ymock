/* ---------------------------------
Logs
--------------------------------- */

import * as React from "react";
import { PropsWithChildren, useEffect, useState } from "react";
import { WorkerLifecycleEventsMap } from "msw/lib/types/setupWorker/glossary";
import { useWorkerContext } from "../hooks";
import { Button, Code, useMantineTheme } from "@mantine/core";

type OwnProps = {};

export default function Logs({}: PropsWithChildren<OwnProps>): JSX.Element {
  const { worker } = useWorkerContext();
  const [logs, setLogs] = useState("");
  const [detached, setDetached] = useState(false);
  const theme = useMantineTheme();

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
      <div className="log-container">
        <Button
          variant={"subtle"}
          size={"lg"}
          sx={() => ({
            position: "absolute",
            right: 10,
            top: 10,
            padding: "8px 14px;",
            height: "auto",
          })}
        >
          &times;
        </Button>

        <Code block sx={() => ({ height: "calc(100% - 38px)" })}>
          {logs}
        </Code>

        <div className="log-controls">
          <Button
            variant={"subtle"}
            size={"xs"}
            onClick={() => setLogs("")}
            sx={() => ({ marginRight: 10 })}
          >
            Clear logs
          </Button>

          <Button
            variant={"subtle"}
            size={"xs"}
            onClick={() => setDetached((d) => !d)}
          >
            Detach panel
          </Button>
        </div>
      </div>

      <style jsx>{`
        .logs {
          position: fixed;
          bottom: 0;
          right: 0;
          left: 0;
          height: 100%;
          max-height: 260px;
          z-index: 1;
          background: ${theme.colors.dark[6]};
        }

        .log-container {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 8px 8px 8px;
          overflow-y: scroll;
        }

        .log-controls {
          display: flex;
          justify-content: flex-end;
          margin-top: 8px;
        }
      `}</style>
    </section>
  );
}
