/* ---------------------------------
SidebarItem
--------------------------------- */

import * as React from "react";
import { Box, Divider, useMantineTheme } from "@mantine/core";
import { NavLink, NavLinkProps } from "react-router-dom";

type OwnProps = {
  children: JSX.Element;
};

export default function SidebarItem({
  children,
  ...navLinkProps
}: OwnProps & Partial<NavLinkProps>): JSX.Element {
  const theme = useMantineTheme();

  return (
    <NavLink
      {...(navLinkProps ?? {})}
      style={{
        color: theme.colors.gray[1],
        textDecoration: "none",
      }}
    >
      {({ isActive }) => (
        <>
          <Divider
            sx={(t) => ({
              borderColor: t.colors.dark[5],
            })}
          />
          <Box
            sx={(t) => ({
              padding: t.spacing.md,
              cursor: "pointer",
              fontSize: t.fontSizes.sm,

              backgroundColor: isActive
                ? t.colorScheme === "dark"
                  ? t.colors.dark[9]
                  : t.colors.indigo[9]
                : "none",

              "&:hover": {
                backgroundColor: isActive
                  ? t.colorScheme === "dark"
                    ? t.colors.dark[8]
                    : t.colors.gray[1]
                  : t.colorScheme === "dark"
                  ? t.colors.dark[5]
                  : t.colors.gray[1],
              },
            })}
          >
            {children}
          </Box>
        </>
      )}
    </NavLink>
  );
}
