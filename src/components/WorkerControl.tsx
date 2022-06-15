/* ---------------------------------
WorkerControl
--------------------------------- */

import * as React from "react";
import { useState } from "react";
import {
  Button,
  Divider,
  Group,
  Navbar,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useWorkerContext } from "../hooks";
import Logs from "../views/Logs";
import { PlayerStop, WaveSawTool } from "tabler-icons-react";

export default function WorkerControl(): JSX.Element {
  const { worker } = useWorkerContext();
  const [logs, enableLogs] = useState(false);
  const theme = useMantineTheme();

  const iconStyles = {
    size: 18,
    strokeWidth: 1,
    color: theme.colors.blue[2],
    style: {
      marginRight: 4,
    },
  };

  return (
    <>
      <Divider
        sx={(t) => ({
          borderColor: t.colors.dark[5],
        })}
      />

      <Navbar.Section>
        <Title
          order={6}
          sx={(t) => ({
            textTransform: "uppercase",
            fontSize: "small",
            padding: t.spacing.md,
          })}
        >
          Worker control
        </Title>

        <Divider
          sx={(t) => ({
            borderColor: t.colors.dark[5],
          })}
        />

        <Group
          position={"left"}
          spacing={"sm"}
          sx={(t) => ({
            padding: t.spacing.md,
          })}
        >
          {/* TODO alternate based on MSW status (get it via global object?) */}
          {/*<Button*/}
          {/*  size="xs"*/}
          {/*  variant="outline"*/}
          {/*  compact*/}
          {/*  uppercase*/}
          {/*  onClick={() => {*/}
          {/*    worker?.start?.();*/}
          {/*  }}*/}
          {/*>*/}
          {/*  Start MSW*/}
          {/*</Button>*/}

          <Button
            size="xs"
            variant="subtle"
            compact
            uppercase
            onClick={() => {
              worker?.stop?.();
            }}
          >
            <PlayerStop {...iconStyles} />
            Stop MSW
          </Button>

          <Button
            size="xs"
            variant="subtle"
            compact
            uppercase
            onClick={!logs ? () => enableLogs(true) : () => enableLogs(false)}
          >
            <WaveSawTool {...iconStyles} />
            {!logs ? "View" : "Hide"} logs
          </Button>

          {logs && <Logs onClose={() => enableLogs(false)} />}
        </Group>
      </Navbar.Section>
    </>
  );
}
