/* ---------------------------------
Logs
--------------------------------- */

import { Box, Button, Code, Group, Title, useMantineTheme } from "@mantine/core";
import { WorkerLifecycleEventsMap } from "msw/lib/types/setupWorker/glossary";
import * as React from "react";
import { PropsWithChildren, useEffect, useState } from "react";
import { ArrowAutofitDown, ArrowAutofitRight, Trash, WaveSawTool } from "tabler-icons-react";
import { useWorkerContext } from "../hooks";

type OwnProps = {
  onClose: () => void;
};

export default function Logs({ onClose }: PropsWithChildren<OwnProps>): JSX.Element {
  const { worker } = useWorkerContext();
  const [logs, setLogs] = useState("");
  const [detached, setDetached] = useState(true);
  const theme = useMantineTheme();

  const iconStyles = {
    size: 18,
    strokeWidth: 1,
    color: theme.colors.blue[2],
    style: {
      marginRight: 4,
    },
  };

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
      <Box component={"header"} px={8} pt={8} pb={8}>
        <Group position={"apart"}>
          <Title
            order={6}
            sx={() => ({
              textTransform: "uppercase",
            })}
          >
            <WaveSawTool
              {...{
                ...iconStyles,
                style: { ...iconStyles.style, position: "relative", top: 4 },
              }}
            />
            Logs
          </Title>

          <Button
            onClick={onClose}
            variant={"subtle"}
            size={"lg"}
            sx={() => ({
              padding: "2px 8px 6px",
              height: "auto",
            })}
          >
            &times;
          </Button>
        </Group>
      </Box>

      <div className="log-container">
        <Code block sx={() => ({ height: "100%", overflowY: "auto" })}>
          {logs}
        </Code>
      </div>

      <div className="log-controls">
        <Button variant={"light"} size={"xs"} onClick={() => setLogs("")} sx={() => ({ marginRight: 10 })}>
          <Trash {...iconStyles} />
          Clear logs
        </Button>

        <Button variant={"light"} size={"xs"} onClick={() => setDetached((d) => !d)}>
          {detached ? <ArrowAutofitDown {...iconStyles} /> : <ArrowAutofitRight {...iconStyles} />}
          {detached ? "Attach panel" : "Detach panel"}
        </Button>
      </div>

      <style jsx>{`
        .logs {
          position: fixed;
          bottom: ${detached ? "16px" : "0"};
          right: ${detached ? "16px" : "0"};
          left: ${detached ? "initial" : "0"};
          width: ${detached ? "50%" : "initial"};
          z-index: 1;
          opacity: 0.95;
          background: ${theme.colors.dark[7]};
          box-shadow: ${detached ? "0 0 16px rgba(0,0,0,0.15)" : "0 -8px 16px rgba(0, 0, 0, 0.25)"};
          border: ${detached ? "1px solid #2C2E33" : "none"};
          border-top: 1px solid #2c2e33;
          border-radius: ${detached ? theme.radius.sm + "px" : "0"};
        }

        .log-container {
          height: ${detached ? "160px" : "260px"};
          padding: 0 8px;
        }

        .log-controls {
          display: flex;
          justify-content: flex-end;
          padding: 8px;
        }
      `}</style>
    </section>
  );
}
