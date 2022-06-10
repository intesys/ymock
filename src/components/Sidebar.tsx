/* ---------------------------------
Nav
--------------------------------- */

import * as React from "react";
import { PropsWithChildren, ReactElement } from "react";
import {
  Button,
  Divider,
  Group,
  Navbar,
  NavbarProps,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useWorkerContext } from "../hooks";

export type SidebarProps = Omit<NavbarProps, "children"> & {
  title: string;
  workerControl?: boolean;
};

export default function Sidebar({
  children,
  title,
  workerControl = true,
  ...navbarProps
}: PropsWithChildren<SidebarProps>): ReactElement | null {
  const { worker } = useWorkerContext();
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

      {workerControl ? (
        <>
          <Divider
            sx={(t) => ({
              borderColor: t.colors.dark[5],
            })}
          />

          <Navbar.Section>
            <Title
              order={6}
              sx={(t) => ({
                textTransform: "uppercase",
                fontSize: "small",
                padding: t.spacing.md,
              })}
            >
              Worker control
            </Title>

            <Divider
              sx={(t) => ({
                borderColor: t.colors.dark[5],
              })}
            />

            <Group
              position={"left"}
              spacing={"sm"}
              sx={(t) => ({
                padding: t.spacing.md,
                paddingBottom: 32,
              })}
            >
              {/* TODO alternate based on MSW status (get it via global object?) */}
              <Button
                size="xs"
                variant="outline"
                compact
                uppercase
                onClick={() => {
                  worker?.start?.();
                }}
              >
                Start MSW
              </Button>

              <Button
                size="xs"
                variant="outline"
                compact
                uppercase
                onClick={() => {
                  worker?.stop?.();
                }}
              >
                Stop MSW
              </Button>
            </Group>
          </Navbar.Section>
        </>
      ) : null}
    </Navbar>
  );
}
