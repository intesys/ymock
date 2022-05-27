/* ---------------------------------
Nav
--------------------------------- */

import * as React from "react";
import { PropsWithChildren, ReactElement, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Divider,
  Group,
  NativeSelect,
  Navbar,
  NavbarProps,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { RestHandler } from "msw";
import { HandlerSortKeysType, MSWglobalExports } from "../types";
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
  const [select, setSelect] = useState<HandlerSortKeysType>("Select an option");
  const theme = useMantineTheme();

  function handleItemClick(item: RestHandler) {
    setCurrentItem(item);
    onItemClick && onItemClick(item);
  }

  function handleSort(sortKey: HandlerSortKeysType) {
    return function (a: RestHandler, b: RestHandler): number {
      if (sortKey === "Name") {
        if (a.info.path < b.info.path) {
          return -1;
        }

        if (a.info.path > b.info.path) {
          return 1;
        }
      }

      //
      else if (sortKey === "Method") {
        if (a.info.method < b.info.method) {
          return -1;
        }

        if (a.info.method > b.info.method) {
          return 1;
        }
      }

      return 0;
    };
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
            Mocked requests
          </Title>

          <Divider
            sx={(t) => ({
              borderColor: t.colors.dark[5],
            })}
          />
        </header>

        {handlers?.length ? (
          <section>
            <NativeSelect
              data={
                ["Select an option", "Name", "Method"] as HandlerSortKeysType[]
              }
              label={
                <Text size={"xs"} mb={"6px"}>
                  Order by…
                </Text>
              }
              sx={(t) => ({
                padding: t.spacing.md,
                paddingBottom: t.spacing.lg,
              })}
              value={select}
              onChange={(e) =>
                setSelect(e.currentTarget.value as HandlerSortKeysType)
              }
            />
          </section>
        ) : null}

        {handlers?.length
          ? [...handlers]
              .sort(handleSort(select))
              .map((handler: RestHandler, i: number, arr) => {
                const isSelected =
                  handler?.info?.path === currentItem?.info?.path;

                return (
                  <React.Fragment key={i}>
                    <Divider
                      sx={(t) => ({
                        borderColor: t.colors.dark[5],
                      })}
                    />
                    <Box
                      onClick={() => handleItemClick(handler)}
                      sx={(t) => ({
                        backgroundColor: isSelected
                          ? t.colorScheme === "dark"
                            ? t.colors.blue[9]
                            : t.colors.indigo[9]
                          : "none",
                        padding: t.spacing.md,
                        cursor: "pointer",
                        fontSize: t.fontSizes.sm,

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

                        <Text size={"sm"}>
                          {stripBasePath(handler.info?.path)}
                        </Text>
                      </Group>
                    </Box>

                    {i === arr.length - 1 && (
                      <Divider
                        sx={(t) => ({
                          borderColor: t.colors.dark[5],
                        })}
                      />
                    )}
                  </React.Fragment>
                );
              })
          : null}
      </Navbar.Section>

      {children && <Navbar.Section>{children}</Navbar.Section>}

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
    </Navbar>
  );
}
