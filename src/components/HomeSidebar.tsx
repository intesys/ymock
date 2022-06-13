/* ---------------------------------
HomeSidebar
--------------------------------- */

import * as React from "react";
import { useContext, useState } from "react";
import { useWorkerContext } from "../hooks";
import {
  Badge,
  Divider,
  Group,
  Indicator,
  NativeSelect,
  Text,
} from "@mantine/core";
import { HandlerSortKeysType } from "../types";
import { RestHandler } from "msw";
import { stripBasePath } from "../utils";
import SidebarItem from "./SidebarItem";
import { SidebarContext } from "./Layout";

export default function HomeSidebar(): JSX.Element {
  const [select, setSelect] = useState<HandlerSortKeysType>("Select an option");
  const { handlers } = useWorkerContext();
  const { sidebarItem, setSidebarItem } = useContext(SidebarContext);

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
                handler?.info?.path ===
                (sidebarItem as unknown as RestHandler)?.info?.path;

              return (
                <React.Fragment key={i}>
                  <SidebarItem
                    onClick={() => setSidebarItem(handler)}
                    selected={isSelected}
                  >
                    <Indicator
                      position="middle-end"
                      size={8}
                      color={handler.shouldSkip ? "gray" : undefined}
                    >
                      <Group spacing="md" noWrap>
                        <Badge color={"teal"} component={"span"}>
                          {handler.info?.method}
                        </Badge>

                        <Text size={"sm"}>
                          {stripBasePath(handler.info?.path)}
                        </Text>
                      </Group>
                    </Indicator>
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
