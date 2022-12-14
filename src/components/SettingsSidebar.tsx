/* ---------------------------------
HomeSidebar
--------------------------------- */

import { Divider } from "@mantine/core";
import * as React from "react";
import { useStore } from "../store";
import SidebarItem from "./SidebarItem";

export default function SettingsSidebar(): JSX.Element {
  const settings = useStore((s) => s.settings);

  // TODO mock items
  return (
    <>
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
        <React.Fragment key={i}>
          <SidebarItem state={{ selected: mockItem }} to={mockItem.label.toLowerCase() ?? ""}>
            <span>{mockItem.label}</span>
          </SidebarItem>

          {i === arr.length - 1 && (
            <Divider
              sx={(t) => ({
                borderColor: t.colors.dark[5],
              })}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
}
