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
import Body from "./Body";
import { RestHandler } from "msw";

export default function Layout({
  worker,
  rest,
  handlers,
}: PropsWithChildren<MSWglobalExports>): JSX.Element {
  const [opened, setOpened] = useState(false);
  const [sidebarItem, setSidebarItem] = useState<RestHandler>();
  const theme = useMantineTheme();

  function setRuntimeRequestHandler(
    body: string,
    path: string,
    method: string = "get"
  ) {
    worker.use(
      rest[method](path, (req: any, res: any, ctx: any) => {
        return res.once(ctx.json(JSON.parse(body)));
      })
    );
  }

  function handleCurrentSidebarItem(item: RestHandler) {
    setSidebarItem(item);
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
            ? handlers.map((handler: RestHandler, i: number) => (
                <Box
                  key={i}
                  onClick={() => handleCurrentSidebarItem(handler)}
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

            <Text>App</Text>

            <button
              type="button"
              onClick={() => {
                worker?.start?.();
              }}
            >
              Start worker
            </button>

            <button
              type="button"
              onClick={() => {
                worker?.stop?.();
              }}
            >
              Stop worker
            </button>
          </div>
        </Header>
      }
    >
      <Body currentItem={sidebarItem} onSubmit={setRuntimeRequestHandler} />
    </AppShell>
  );
}
