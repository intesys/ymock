/* ---------------------------------
Layout
--------------------------------- */

import * as React from "react";
import { useState } from "react";
import {
  AppShell,
  Burger,
  Button,
  Group,
  Header,
  MediaQuery,
  Text,
  useMantineTheme,
} from "@mantine/core";
import Sidebar from "./Sidebar";
import { APP_HOME, APP_NAME, isStandaloneMode } from "../constants";
import { Link, Outlet } from "react-router-dom";
import { RuntimeRequestHandlerType, setRuntimeRequestHandler } from "../lib";
import { Settings as SettingsIcon, ThreeDCubeSphere } from "tabler-icons-react";
import Error from "../views/Error";
import { MSWglobalExports } from "../types";
import { rest } from "msw";

let msw: MSWglobalExports;

/*
 * This app's use case is to manage a `msw`
 * instance launched by a host app.
 *
 * @see: README.md:23 (Hosted mode)
 * @see: README.md:30 (Standalone mode)
 *
 * */

if (isStandaloneMode) {
  const { rest } = require("msw");
  const { worker } = require("../demo/mocks/browser");
  const { handlers } = require("../demo/mocks/handlers");

  msw = { rest, worker, handlers };
}

type SidebarItemAndSetter = {
  sidebarItem: Record<string, unknown>;
  setSidebarItem: React.Dispatch<
    React.SetStateAction<Record<string, unknown> | undefined>
  >;
};

// Outlet context shared by all Consumers inside `Outlet`
export type OutletContext = {
  onSubmit: RuntimeRequestHandlerType;
};

// Sidebar context shared by all Consumers inside `Layout`
export const SidebarContext = React.createContext<SidebarItemAndSetter>({});

// Provides the worker's data & handlers to the whole app
export const WorkerContext = React.createContext<MSWglobalExports>({
  handlers: [],
  rest: undefined,
  worker: undefined,
});

export default function Layout(): JSX.Element {
  const { worker, rest, handlers } = msw ?? window?.msw ?? {};
  const fatalError = [worker, rest, handlers].some((truthy) => !truthy);

  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarItem, setSidebarItem] = useState<Record<string, unknown>>();
  const theme = useMantineTheme();

  if (fatalError) return <Error />;

  return (
    <WorkerContext.Provider value={{ worker, rest, handlers }}>
      <SidebarContext.Provider value={{ sidebarItem, setSidebarItem }}>
        <AppShell
          navbarOffsetBreakpoint="sm"
          fixed
          header={
            <Header
              height={46}
              sx={(t) => ({
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
                  padding: "0 1rem",
                }}
              >
                {/* TODO style tags */}
                <Link
                  style={{
                    color: theme.colors.gray[1],
                    textDecoration: "none",
                  }}
                  to={APP_HOME}
                >
                  <Group spacing={"xs"}>
                    <ThreeDCubeSphere
                      size={28}
                      strokeWidth={1}
                      color={"whitesmoke"}
                    />

                    <Text
                      size={"sm"}
                      weight={500}
                      sx={() => ({ position: "relative", left: -6 })}
                    >
                      {APP_NAME}
                    </Text>
                  </Group>
                </Link>

                <Group>
                  <Button component={Link} to="settings" variant={"subtle"}>
                    <SettingsIcon
                      size={22}
                      strokeWidth={1}
                      color={"whitesmoke"}
                    />
                  </Button>
                </Group>

                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                  <Burger
                    opened={showSidebar}
                    onClick={() => setShowSidebar((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>
              </div>
            </Header>
          }
          navbar={
            <Sidebar
              fixed
              position={{ top: 0, left: 0 }}
              hiddenBreakpoint="sm"
              hidden={!showSidebar}
              width={{ sm: 300, lg: 400 }}
            />
          }
        >
          <Outlet
            // https://reactrouter.com/docs/en/v6/hooks/use-outlet-context
            context={{
              onSubmit: setRuntimeRequestHandler(worker, rest),
            }}
          />
        </AppShell>
      </SidebarContext.Provider>
    </WorkerContext.Provider>
  );
}
