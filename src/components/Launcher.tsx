/* ---------------------------------
Launcher
--------------------------------- */

import * as React from "react";
import { PropsWithChildren } from "react";
import { MSWglobalExports } from "../types";
import { APP_BASE_PATH } from "../constants";

type OwnProps = {
  msw: MSWglobalExports;
};

export default function Launcher({
  msw,
}: PropsWithChildren<OwnProps>): JSX.Element | null {
  if (!msw) return null;

  return (
    <div>
      <button
        type={"button"}
        style={{ marginTop: "2rem", width: "100%" }}
        onClick={() => {
          const windowRef = window.open(
            APP_BASE_PATH + "/",
            "_blank",
            "popup, right=100, top=100, width=1200, height=700"
          );

          if (windowRef) {
            windowRef.msw = msw;
          }
        }}
      >
        Open Admin UI
      </button>
    </div>
  );
}
