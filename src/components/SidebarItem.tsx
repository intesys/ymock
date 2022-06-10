/* ---------------------------------
SidebarItem
--------------------------------- */

import * as React from "react";
import { Box, Divider } from "@mantine/core";

type OwnProps = {
  onClick;
  selected;
  children;
};

export default function SidebarItem({
  onClick,
  selected,
  children,
}: OwnProps): JSX.Element {
  return (
    <>
      <Divider
        sx={(t) => ({
          borderColor: t.colors.dark[5],
        })}
      />
      <Box
        onClick={onClick}
        sx={(t) => ({
          backgroundColor: selected
            ? t.colorScheme === "dark"
              ? t.colors.dark[9]
              : t.colors.indigo[9]
            : "none",
          padding: t.spacing.md,
          cursor: "pointer",
          fontSize: t.fontSizes.sm,

          "&:hover": {
            backgroundColor: selected
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
  );
}
