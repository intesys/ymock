/* ---------------------------------
HomeSidebar
--------------------------------- */

import * as React from "react";
import { PropsWithChildren, useState } from "react";
import { useWorkerContext } from "../hooks";
import { Badge, Divider, Group, NativeSelect, Text } from "@mantine/core";
import { HandlerSortKeysType } from "../types";
import { RestHandler } from "msw";
import { stripBasePath } from "../utils";
import SidebarItem from "./SidebarItem";

type OwnProps = { onItemClick: (item: RestHandler) => void };

export default function HomeSidebar({
  onItemClick,
}: PropsWithChildren<OwnProps>): JSX.Element {
  const [select, setSelect] = useState<HandlerSortKeysType>("Select an option");
  const [currentItem, setCurrentItem] = useState<RestHandler>();
  const { handlers } = useWorkerContext();

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
    <>
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
                  <SidebarItem
                    onClick={() => handleItemClick(handler)}
                    selected={isSelected}
                  >
                    <Group spacing="md" noWrap>
                      <Badge color={"teal"} component={"span"}>
                        {handler.info?.method}
                      </Badge>

                      <Text size={"sm"}>
                        {stripBasePath(handler.info?.path)}
                      </Text>
                    </Group>
                  </SidebarItem>
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
    </>
  );
}
