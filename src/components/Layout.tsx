/* ---------------------------------
Layout
--------------------------------- */

import * as React from "react";
import { PropsWithChildren, useState } from "react";
import {
  AppShell,
  Badge,
  Box,
  Burger,
  Button,
  Code,
  Divider,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Text,
  UnstyledButton,
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
          <Navbar.Section grow mt={10}>
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
                    <Group spacing="md" noWrap>
                      <Badge color={"green"} component={"span"}>
                        {handler.info?.method}
                      </Badge>

                      <Text size={"sm"}>
                        {handler.info?.path?.replace?.(/http[s]?:\/\//, "")}
                      </Text>
                    </Group>
                  </Box>
                ))
              : null}
          </Navbar.Section>

          <Navbar.Section>
            <Divider />

            <Group
              position={"left"}
              spacing={"sm"}
              style={{ padding: "20px 0 10px" }}
            >
              <UnstyledButton
                type="button"
                onClick={() => {
                  worker?.start?.();
                }}
              >
                <Badge variant="dot">Start worker</Badge>
              </UnstyledButton>

              <UnstyledButton
                type="button"
                onClick={() => {
                  worker?.stop?.();
                }}
              >
                <Badge variant="dot">Stop worker</Badge>
              </UnstyledButton>
            </Group>
          </Navbar.Section>
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

            <Text size={"sm"} weight={700} transform="uppercase">
              {`MSW Admin UI`}
            </Text>
          </div>
        </Header>
      }
    >
      <Body currentItem={sidebarItem} onSubmit={setRuntimeRequestHandler} />
    </AppShell>
  );
}
