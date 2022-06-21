/* ---------------------------------
Nav
--------------------------------- */

import * as React from "react";
import { PropsWithChildren, ReactElement } from "react";
import {
  Divider,
  Navbar,
  NavbarProps,
  Title,
  useMantineTheme,
} from "@mantine/core";
import WorkerControl from "./WorkerControl";
import { Route, Routes } from "react-router-dom";
import HomeSidebar from "./HomeSidebar";
import SettingsSidebar from "./SettingsSidebar";
import { matchPath, useLocation } from "react-router";
import { APP_ROOT, isStandaloneMode } from "../constants";

export type SidebarProps = Omit<NavbarProps, "children"> & {
  title?: string;
  workerControl?: boolean;
};

export default function Sidebar({
  title,
  children,
  workerControl = true,
  ...navbarProps
}: PropsWithChildren<SidebarProps>): ReactElement | null {
  const theme = useMantineTheme();

  if (!title) {
    const location = useLocation();

    title = matchPath(
      { path: `${!isStandaloneMode ? APP_ROOT + "/" : ""}settings/*` },
      location.pathname
    )
      ? "Settings"
      : "Mocked requests";
  }

  return (
    <Navbar {...navbarProps}>
      <Navbar.Section grow mt={theme.spacing.sm}>
        <header>
          <Title
            order={6}
            sx={(t) => ({
              padding: t.spacing.md,
              textTransform: "uppercase",
              fontSize: "small",
            })}
          >
            {title}
          </Title>

          <Divider
            sx={(t) => ({
              borderColor: t.colors.dark[5],
            })}
          />
        </header>

        {/* Route-specific sidebars */}
        <Routes>
          <Route path="/" element={<HomeSidebar />} />
          <Route path="settings*" element={<SettingsSidebar />} />
        </Routes>
      </Navbar.Section>

      {workerControl && <WorkerControl />}
    </Navbar>
  );
}
