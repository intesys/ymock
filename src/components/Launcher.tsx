/* ---------------------------------
Launcher
--------------------------------- */

import * as React from "react";
import { MSWglobalExports } from "../types";
import { APP_ROOT, ERROR__FATAL_ERROR } from "../constants";
import { Alert, Button } from "@mantine/core";

type OwnProps = {
  msw: MSWglobalExports;
};

export default function Launcher({ msw }: OwnProps): JSX.Element {
  function handleNewWindowClick() {
    if (typeof window !== "undefined") {
      const windowRef = window.open(
        APP_ROOT,
        "_blank",
        "popup, right=100, top=100, width=1100, height=700"
      );

      if (windowRef) {
        windowRef.msw = msw;
      }
    }
  }

  if (!msw?.rest || !msw?.worker || !msw?.handlers) {
    console.error(ERROR__FATAL_ERROR);

    return (
      <div className={"launcher"}>
        <Alert title="Cannot launch yMock" color="red" variant="filled">
          Please ensure <code>Launcher</code> is receiving a valid{" "}
          <code>msw</code> prop.
        </Alert>

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

  return (
    <div className={"launcher"}>
      <Button
        radius="xl"
        size="md"
        styles={{
          root: {
            padding: "0 20px",
            height: 46,
            boxShadow: "0 0 55px #00000066",
            textTransform: "uppercase",
            fontSize: "small",
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
          bottom: 30px;
          right: 30px;
          transition: transform 0.3s ease;
        }

        .launcher:hover {
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
}
