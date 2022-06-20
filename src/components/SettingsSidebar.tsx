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
  const theme = useMantineTheme();

  // TODO mock items
  return (
    <React.Fragment>
      {[
        {
          label: "Lorem",
        },
        {
          label: "Ipsum",
        },
        {
          label: "Dolor",
        },
        {
          label: "Sit",
        },
        {
          label: "Amet",
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
                }}
                to={`settings/${mockItem.label.toLowerCase()}`}
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
