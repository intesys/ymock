/* ---------------------------------
Layout
--------------------------------- */

import * as React from "react";
import { useEffect, useState } from "react";
import {
  Anchor,
  AppShell,
  Breadcrumbs,
  Burger,
  Button,
  Group,
  Header,
  MediaQuery,
  Text,
  useMantineTheme,
} from "@mantine/core";
import Sidebar from "./Sidebar";
import { APP_HOME, APP_NAME, APP_ROOT, isStandaloneMode } from "../constants";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { RuntimeRequestHandlerType } from "../lib";
import { Settings as SettingsIcon, ThreeDCubeSphere } from "tabler-icons-react";
import Error from "../routes/Error";
import { MSWglobalExports } from "../types";

let msw: MSWglobalExports;

/*
 * This app's use case is to manage a `msw`
 * instance launched by a host app.
 *
 * @see: README.md:23 (Hosted mode)
 * @see: README.md:30 (Standalone mode)
 *
 * */

(async function () {
  if (isStandaloneMode) {
    const {
      default: { rest, worker, handlers },
    } = (await import("../mocks/msw.js")) ?? {};

    msw = { rest, worker, handlers };
  }
})();

type SidebarItemAndSetter = {
  sidebarItem: Record<string, unknown> | undefined;
  setSidebarItem: React.Dispatch<
    React.SetStateAction<Record<string, unknown> | undefined>
  >;
};

// Outlet context shared by all Consumers inside `Outlet`
export type OutletContext = {
  onSubmit: RuntimeRequestHandlerType;
};

// Sidebar context shared by all Consumers inside `Layout`
export const SidebarContext = React.createContext<SidebarItemAndSetter>({
  sidebarItem: {},
  setSidebarItem: () => {},
});

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
  const [sidebarItem, setSidebarItem] = useState<
    Record<string, unknown> | undefined
  >();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const location = useLocation();

  if (fatalError) return <Error />;

  useEffect(() => {
    // Redirect to `/mocks` since there's no real homepage ATM
    if (location.pathname === (isStandaloneMode ? "/" : "/" + APP_ROOT))
      navigate("mocks");
  }, [location]);

  const breadcrumbItems = location.pathname.split("/").map((part, i) => {
    function stripLeadingSlash(s: string): string {
      return s.charAt(0) === "/" ? s.slice(1) : s;
    }

    return (
      <Anchor
        key={i}
        component={NavLink}
        to={stripLeadingSlash(part)} // TODO
        sx={() => ({ fontSize: 14 })}
      >
        {stripLeadingSlash(decodeURIComponent(part))}
      </Anchor>
    );
  });

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
                <Group sx={() => ({ gap: 0 })}>
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

                  <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
                </Group>

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
          {/* OUTLET */}
          <Outlet />
        </AppShell>
      </SidebarContext.Provider>
    </WorkerContext.Provider>
  );
}
