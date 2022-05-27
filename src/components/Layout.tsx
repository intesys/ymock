/* ---------------------------------
Layout
--------------------------------- */

import * as React from "react";
import { PropsWithChildren, useState } from "react";
import {
  AppShell,
  Burger,
  Group,
  Header,
  MediaQuery,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { MSWglobalExports } from "../types";
import Body from "./Body";
import { RestHandler } from "msw";
import Sidebar from "./Sidebar";
import { setRuntimeRequestHandler } from "../lib";
import { APP_NAME } from "../constants";

export default function Layout({
  worker,
  rest,
  handlers,
}: PropsWithChildren<MSWglobalExports>): JSX.Element {
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarItem, setSidebarItem] = useState<RestHandler>();
  const theme = useMantineTheme();

  function handleCurrentSidebarItem(item: RestHandler) {
    setSidebarItem(item);
  }

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Sidebar
          fixed
          position={{ top: 0, left: 0 }}
          hiddenBreakpoint="sm"
          hidden={!showSidebar}
          width={{ sm: 300, lg: 400 }}
          onItemClick={handleCurrentSidebarItem}
          {...{
            worker,
            handlers,
          }}
        />
      }
      header={
        <Header
          height={50}
          padding="md"
          sx={(t) => ({
            background: `
              linear-gradient(to top, #141517,#262626 ),
              ${t.colors.dark[8]}
            `,
            borderBottom: `1px solid ${t.colors.dark}`,
          })}
        >
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={showSidebar}
                onClick={() => setShowSidebar((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Group>
              <Text size={"lg"}>🛠</Text>
              <Text size={"sm"} weight={500}>
                {APP_NAME}
              </Text>
            </Group>
          </div>
        </Header>
      }
    >
      <Body
        currentItem={sidebarItem}
        onSubmit={setRuntimeRequestHandler(worker, rest)}
      />
    </AppShell>
  );
}
