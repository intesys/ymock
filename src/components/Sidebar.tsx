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

export type SidebarProps = Omit<NavbarProps, "children"> & {
  title: string;
  workerControl?: boolean;
};

export default function Sidebar({
  title,
  children,
  workerControl = true,
  ...navbarProps
}: PropsWithChildren<SidebarProps>): ReactElement | null {
  const theme = useMantineTheme();

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
        {children}
      </Navbar.Section>

      {workerControl && <WorkerControl />}
    </Navbar>
  );
}
