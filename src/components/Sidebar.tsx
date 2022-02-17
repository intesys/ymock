/* ---------------------------------
Nav
--------------------------------- */

import * as React from "react";
import { PropsWithChildren, ReactElement } from "react";
import {
  Badge,
  Box,
  Divider,
  Group,
  Navbar,
  NavbarProps,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { RestHandler } from "msw";
import { MSWglobalExports } from "../types";

type OwnProps = Omit<NavbarProps, "children"> &
  Pick<MSWglobalExports, "handlers" | "worker"> & {
    onItemClick: (arg0: RestHandler) => void;
  };

export default function Sidebar({
  handlers,
  worker,
  onItemClick,
  children,
  ...navbarProps
}: PropsWithChildren<OwnProps>): ReactElement | null {
  return (
    <Navbar {...navbarProps}>
      <Navbar.Section grow mt={10}>
        {handlers?.length
          ? handlers.map((handler: RestHandler, i: number) => (
              <Box
                key={i}
                onClick={() => onItemClick(handler)}
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

      {children && <Navbar.Section>{children}</Navbar.Section>}

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
  );
}
