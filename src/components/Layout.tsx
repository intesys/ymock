/* ---------------------------------
Layout
--------------------------------- */

import * as React from "react";
import { useState } from "react";
import {
  AppShell,
  Burger,
  Group,
  Header,
  MediaQuery,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { RestHandler } from "msw";
import Sidebar from "./Sidebar";
import { APP_HOME, APP_NAME, APP_ROOT, isStandaloneMode } from "../constants";
import { Link, Outlet, useMatch, useOutletContext } from "react-router-dom";
import { setRuntimeRequestHandler } from "../lib";
import { BodyProps } from "./Body";
import { useWorkerContext } from "../hooks";

export default function Layout(): JSX.Element {
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarItem, setSidebarItem] = useState<RestHandler>();
  const { worker, rest, handlers } = useWorkerContext();
  const theme = useMantineTheme();

  const isSettingsPath = useMatch(
    `${!isStandaloneMode ? APP_ROOT + "/" : ""}settings*`
  );

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
          mainSectionTitle={!isSettingsPath ? "Mocked requests" : "Settings"}
          {...(!isSettingsPath
            ? {
                worker,
                handlers,
              }
            : {})}
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
            color: t.colors.gray[1],
            textDecoration: "none",
          })}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "100%",
            }}
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
                {/* TODO style tags */}
                <Link
                  style={{
                    color: theme.colors.gray[1],
                    textDecoration: "none",
                  }}
                  to={APP_HOME}
                >
                  {APP_NAME}
                </Link>
              </Text>
            </Group>

            <Group>
              <Link
                style={{
                  color: theme.colors.gray[1],
                  textDecoration: "none",
                  fontSize: "small",
                  textTransform: "uppercase",
                }}
                to={`settings`}
              >
                Settings
              </Link>
            </Group>
          </div>
        </Header>
      }
    >
      <Outlet
        // https://reactrouter.com/docs/en/v6/hooks/use-outlet-context
        context={{
          currentItem: sidebarItem,
          onSubmit: setRuntimeRequestHandler(worker, rest),
        }}
      />
    </AppShell>
  );
}

export function useSidebarContext() {
  return useOutletContext<BodyProps>();
}
