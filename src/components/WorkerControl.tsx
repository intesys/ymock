/* ---------------------------------
WorkerControl
--------------------------------- */

import * as React from "react";
import { Button, Divider, Group, Navbar, Title } from "@mantine/core";
import { useWorkerContext } from "../hooks";

export default function WorkerControl(): JSX.Element {
  const { worker } = useWorkerContext();

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
            paddingBottom: 32,
          })}
        >
          {/* TODO alternate based on MSW status (get it via global object?) */}
          <Button
            size="xs"
            variant="outline"
            compact
            uppercase
            onClick={() => {
              worker?.start?.();
            }}
          >
            Start MSW
          </Button>

          <Button
            size="xs"
            variant="outline"
            compact
            uppercase
            onClick={() => {
              worker?.stop?.();
            }}
          >
            Stop MSW
          </Button>
        </Group>
      </Navbar.Section>
    </>
  );
}
