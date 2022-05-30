/* ---------------------------------
Launcher
--------------------------------- */

import * as React from "react";
import { PropsWithChildren } from "react";
import { MSWglobalExports } from "../types";
import { APP_BASE_PATH } from "../constants";
import { Button, useMantineTheme } from "@mantine/core";

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
      "popup, right=100, top=100, width=1100, height=700"
    );

    if (windowRef) {
      windowRef.msw = msw;
    }
  }

  return (
    <div className={"launcher"}>
      <Button
        radius="xl"
        size="md"
        styles={{
          root: {
            padding: "0 24px",
            height: 46,
            boxShadow: "-10px 20px 55px #0000008f",
          },
        }}
        onClick={handleNewWindowClick}
      >
        🚀
        <span style={{ marginLeft: 8 }}>Launch yMock</span>
      </Button>

      <style jsx>{`
        .launcher {
          position: fixed;
          bottom: 20px;
          right: 20px;
        }
      `}</style>
    </div>
  );
}
