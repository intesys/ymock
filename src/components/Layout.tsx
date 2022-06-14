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
import Sidebar, { SidebarProps } from "./Sidebar";
import { APP_HOME, APP_NAME } from "../constants";
import { Link, Outlet } from "react-router-dom";
import { setRuntimeRequestHandler } from "../lib";
import { useWorkerContext } from "../hooks";
import { useLocation } from "react-router";
import HomeSidebar from "./HomeSidebar";
import SettingsSidebar from "./SettingsSidebar";
import { ThreeDCubeSphere } from "tabler-icons-react";

type SidebarItemAndSetter = {
  sidebarItem: Record<string, unknown>;
  setSidebarItem: React.Dispatch<
    React.SetStateAction<Record<string, unknown> | undefined>
  >;
};

// Outlet context shared by all Consumers inside `Outlet`
export type OutletContext = {
  onSubmit: (input: string, path: string) => void;
};

// Sidebar context shared by all Consumers inside `Layout`
export const SidebarContext = React.createContext<SidebarItemAndSetter>({});

export default function Layout(): JSX.Element {
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarItem, setSidebarItem] = useState<Record<string, unknown>>();
  const { worker, rest } = useWorkerContext();
  const location = useLocation();
  const theme = useMantineTheme();

  function getRouteSpecificSidebar(): Partial<PropsWithChildren<SidebarProps>> {
    switch (location?.pathname) {
      // TODO fix in standalone mode
      case `${APP_HOME}/settings`:
      case `${APP_HOME}/settings/logs`: {
        return {
          title: "Settings",
          children: <SettingsSidebar />,
        };
      }

      default:
      case `${APP_HOME}`: {
        return {
          title: "Mocked requests",
          children: <HomeSidebar />,
        };
      }
    }
  }

  return (
    <SidebarContext.Provider value={{ sidebarItem, setSidebarItem }}>
      <AppShell
        navbarOffsetBreakpoint="sm"
        fixed
        header={
          <Header
            height={50}
            sx={(t) => ({
              background: t.colors.dark[9],
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
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={showSidebar}
                  onClick={() => setShowSidebar((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

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
        navbar={
          <Sidebar
            fixed
            position={{ top: 0, left: 0 }}
            hiddenBreakpoint="sm"
            hidden={!showSidebar}
            width={{ sm: 300, lg: 400 }}
            {...getRouteSpecificSidebar()}
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
  );
}
