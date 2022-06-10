/* ---------------------------------
HomeSidebar
--------------------------------- */

import * as React from "react";
import { PropsWithChildren } from "react";
import { Divider, Group, useMantineTheme } from "@mantine/core";
import { RestHandler } from "msw";
import { Link } from "react-router-dom";
import SidebarItem from "./SidebarItem";

type OwnProps = { onItemClick: (item: RestHandler) => void };

export default function SettingsSidebar({
  onItemClick,
}: PropsWithChildren<OwnProps>): JSX.Element {
  const theme = useMantineTheme();

  // TODO mock items
  return (
    <React.Fragment>
      {Array.from({ length: 5 }, (_, i) => (
        <>
          <SidebarItem onClick={() => null} selected={undefined} key={i}>
            <Group spacing="md" noWrap>
              <Link
                style={{
                  color: theme.colors.gray[1],
                  textDecoration: "none",
                  fontSize: "small",
                  textTransform: "uppercase",
                }}
                to={`settings/logs`}
              >
                {i === 0 ? "Logs" : `Logs ${i}`}
              </Link>
            </Group>
          </SidebarItem>

          {i === 5 - 1 && (
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
