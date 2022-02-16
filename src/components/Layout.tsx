/* ---------------------------------
Layout
--------------------------------- */

import * as React from "react";
import { PropsWithChildren, useState } from "react";
import {
  AppShell,
  Box,
  Burger,
  Button,
  Header,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { MSWglobalExports } from "../types/app";

export default function Layout({
  worker,
  rest,
  handlers,
}: PropsWithChildren<MSWglobalExports>): JSX.Element {
  const [input, setInput] = useState<string>("");
  const [toggleUI, setToggleUI] = useState<boolean>(false);

  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  function setRuntimeRequestHandler(
    body: Record<string, unknown>,
    path: string,
    method: string = "get"
  ) {
    worker.use(
      rest[method](path, (req: any, res: any, ctx: any) => {
        return res.once(ctx.json(body));
      })
    );
  }

  function handleReset() {
    setInput("");
  }

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          padding="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 300, lg: 400 }}
          fixed
          position={{ top: 0, left: 0 }}
        >
          {handlers?.length
            ? handlers.map((handler: any, i: number) => (
                <Box
                  key={i}
                  sx={(theme) => ({
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                    padding: theme.spacing.md,
                    borderRadius: theme.radius.sm,
                    cursor: "pointer",
                    fontSize: theme.fontSizes.sm,
                    marginTop: i !== 0 ? theme.spacing.md : 0,

                    "&:hover": {
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[5]
                          : theme.colors.gray[1],
                    },
                  })}
                >
                  {`${handler.info?.method} | ${handler.info?.path}`}
                </Box>
              ))
            : null}
        </Navbar>
      }
      header={
        <Header height={70} padding="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Module</Text>
          </div>
        </Header>
      }
    >
      <div>
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            padding: ".5rem",
          }}
        >
          <Button
            type="button"
            onClick={() => {
              setToggleUI((ui) => !ui);
            }}
          >
            Set runtime request handler
          </Button>

          {toggleUI && (
            <form
              action="#"
              onSubmit={(e) => {
                if (!input) {
                  window.alert("Please provide a value.");
                  return;
                }

                e.preventDefault();
                setRuntimeRequestHandler({ title: input }, "");
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
    </AppShell>
  );
}
