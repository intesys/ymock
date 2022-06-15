/* ---------------------------------
Logs
--------------------------------- */

import * as React from "react";
import { PropsWithChildren, useEffect, useState } from "react";
import { WorkerLifecycleEventsMap } from "msw/lib/types/setupWorker/glossary";
import { useWorkerContext } from "../hooks";
import {
  Box,
  Button,
  Code,
  Group,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { ArrowAutofitRight, Trash } from "tabler-icons-react";

type OwnProps = {
  onClose: () => void;
};

export default function Logs({
  onClose,
}: PropsWithChildren<OwnProps>): JSX.Element {
  const { worker } = useWorkerContext();
  const [logs, setLogs] = useState("");
  const [detached, setDetached] = useState(false); // TODO implement
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
        <Button
          variant={"light"}
          size={"xs"}
          onClick={() => setLogs("")}
          sx={() => ({ marginRight: 10 })}
        >
          <Trash {...iconStyles} />
          Clear logs
        </Button>

        <Button
          variant={"light"}
          size={"xs"}
          onClick={() => setDetached((d) => !d)}
        >
          <ArrowAutofitRight {...iconStyles} />
          Detach panel
        </Button>
      </div>

      <style jsx>{`
        .logs {
          position: fixed;
          bottom: 0;
          right: 0;
          left: 0;
          z-index: 1;
          background: ${theme.colors.dark[7]};
          box-shadow: 0 -8px 16px rgba(0, 0, 0, 0.15);
        }

        .log-container {
          height: 260px;
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
