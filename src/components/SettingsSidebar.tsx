/* ---------------------------------
HomeSidebar
--------------------------------- */

import * as React from "react";
import { useContext } from "react";
import { Divider, Group, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { SidebarContext } from "./Layout";
import { useStore } from "../state";

export default function SettingsSidebar(): JSX.Element {
  const { sidebarItem, setSidebarItem } = useContext(SidebarContext);
  const settings = useStore((s) => s.settings);

  console.log(settings);
  const theme = useMantineTheme();

  // TODO mock items
  return (
    <React.Fragment>
      {[
        {
          label: "Theme",
          info: "Theme", // TODO
        },
        {
          label: "Ipsum",
          info: "Ipsum",
        },
        {
          label: "Dolor",
          info: "Dolor",
        },
        {
          label: "Sit",
          info: "Sit",
        },
        {
          label: "Amet",
          info: "Amet",
        },
      ].map((mockItem, i, arr) => (
        <>
          <SidebarItem
            onClick={() => setSidebarItem(mockItem)}
            selected={
              (sidebarItem as { label: string })?.label === mockItem.label
            }
            key={i}
          >
            <Group spacing="md" noWrap>
              <Link
                style={{
                  color: theme.colors.gray[1],
                  textDecoration: "none",
                  fontSize: "small",
                  textTransform: "uppercase",
                  display: "block",
                }}
                to={mockItem.label.toLowerCase() ?? ""}
              >
                {mockItem.label}
              </Link>
            </Group>
          </SidebarItem>

          {i === arr.length - 1 && (
            <Divider
              sx={(t) => ({
                borderColor: t.colors.dark[5],
              })}
            />
          )}
        </>
      ))}
    </React.Fragment>
  );
}
