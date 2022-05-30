/* ---------------------------------
Launcher
--------------------------------- */

import * as React from "react";
import { PropsWithChildren } from "react";
import { MSWglobalExports } from "../types";
import { APP_BASE_PATH } from "../constants";
import { Button, Menu, useMantineTheme } from "@mantine/core";
import { ChevronDown, Package, SquareCheck } from "tabler-icons-react";

type OwnProps = {
  msw: MSWglobalExports;
};

export default function Launcher({
  msw,
}: PropsWithChildren<OwnProps>): JSX.Element | null {
  if (!msw) return null;

  const theme = useMantineTheme();

  function handleNewWindowClick() {
    const windowRef = window.open(
      APP_BASE_PATH + "/",
      "_blank",
      "popup, right=100, top=100, width=1200, height=700"
    );

    if (windowRef) {
      windowRef.msw = msw;
    }
  }

  return (
    <div>
      <Menu
        control={
          <Button
            rightIcon={<ChevronDown size={18} />}
            sx={{ paddingRight: 12 }}
          >
            🚀 yMock
          </Button>
        }
        transition="pop-top-right"
        placement="end"
        size="lg"
      >
        <Menu.Item
          icon={<Package size={16} color={theme.colors.blue[6]} />}
          onClick={handleNewWindowClick}
          // rightSection={
          //   <Text size="xs" transform="uppercase" weight={700} color="dimmed">
          //     Ctrl + P
          //   </Text>
          // }
        >
          Launch in a new window
        </Menu.Item>

        <Menu.Item
          icon={<SquareCheck size={16} color={theme.colors.pink[6]} />}
          // rightSection={
          //   <Text size="xs" transform="uppercase" weight={700} color="dimmed">
          //     Ctrl + T
          //   </Text>
          // }
        >
          Launch Docked to bottom
        </Menu.Item>
      </Menu>
    </div>
  );
}
