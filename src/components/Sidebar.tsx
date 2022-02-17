/* ---------------------------------
Nav
--------------------------------- */

import * as React from "react";
import { PropsWithChildren, ReactElement, useState } from "react";
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
import { stripBasePath } from "../utils";

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
  const [currentItem, setCurrentItem] = useState<RestHandler>();

  function handleItemClick(item: RestHandler) {
    setCurrentItem(item);
    onItemClick && onItemClick(item);
  }

  return (
    <Navbar {...navbarProps}>
      <Navbar.Section
        grow
        mt={10}
        sx={(t) => ({
          padding: t.spacing.md,
        })}
      >
        {handlers?.length
          ? handlers.map((handler: RestHandler, i: number) => {
              const isSelected =
                handler?.info?.path === currentItem?.info?.path;

              return (
                <Box
                  key={i}
                  onClick={() => handleItemClick(handler)}
                  sx={(t) => ({
                    backgroundColor: isSelected
                      ? t.colorScheme === "dark"
                        ? t.colors.blue[9]
                        : t.colors.indigo[0]
                      : t.colorScheme === "dark"
                      ? t.colors.dark[6]
                      : t.colors.gray[0],
                    padding: t.spacing.md,
                    borderRadius: t.radius.sm,
                    cursor: "pointer",
                    fontSize: t.fontSizes.sm,
                    marginTop: i !== 0 ? t.spacing.sm : 0,

                    "&:hover": {
                      backgroundColor: isSelected
                        ? t.colorScheme === "dark"
                          ? t.colors.blue[8]
                          : t.colors.gray[1]
                        : t.colorScheme === "dark"
                        ? t.colors.dark[5]
                        : t.colors.gray[1],
                    },
                  })}
                >
                  <Group spacing="md" noWrap>
                    <Badge color={"green"} component={"span"}>
                      {handler.info?.method}
                    </Badge>

                    <Text size={"sm"}>{stripBasePath(handler.info?.path)}</Text>
                  </Group>
                </Box>
              );
            })
          : null}
      </Navbar.Section>

      {children && <Navbar.Section>{children}</Navbar.Section>}

      <Divider />

      <Navbar.Section
        sx={(t) => ({
          padding: t.spacing.md,
        })}
      >
        <Group position={"left"} spacing={"sm"}>
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
