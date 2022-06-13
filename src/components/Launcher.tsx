/* ---------------------------------
Launcher
--------------------------------- */

import * as React from "react";
import { useRef, useState } from "react";
import { MSWglobalExports } from "../types";
import { APP_ROOT, ERROR__LAUNCHER_FATAL_ERROR } from "../constants";
import { Alert, Button, useMantineTheme } from "@mantine/core";
import { CSSObject } from "@mantine/styles/lib/tss";

type OwnProps = {
  msw: MSWglobalExports;
};

export default function Launcher({ msw }: OwnProps): JSX.Element {
  const [launched, setLaunched] = useState(false);
  const theme = useMantineTheme();
  const windowRef = useRef<Window | null>(null);

  const buttonStyles: Partial<Record<string, CSSObject>> = {
    root: {
      padding: "0 20px",
      height: 46,
      boxShadow: "0 0 55px #00000066",
      textTransform: "uppercase",
      fontSize: "small",
    },
  };

  function handleNewWindowClick() {
    if (typeof window !== "undefined") {
      const w = window.open?.(
        APP_ROOT,
        "_blank",
        "popup, right=100, top=100, width=1100, height=700"
      );

      if (w) {
        // load msw in global state
        w.msw = msw;

        // save a ref to the new window
        windowRef.current = w;

        setLaunched(true);
      }
    }
  }

  function handleCloseWindowClick() {
    if (windowRef.current) {
      windowRef.current.close?.();

      windowRef.current = null;

      setLaunched(false);
    }
  }

  if (!msw?.rest || !msw?.worker || !msw?.handlers) {
    console.error(ERROR__LAUNCHER_FATAL_ERROR);

    return (
      <div className={"launcher"}>
        <Alert title="Cannot launch yMock" color="red" variant="filled">
          Please ensure <code>Launcher</code> is receiving a valid{" "}
          <code>msw</code> prop.
        </Alert>

        <style jsx>{`
          .launcher {
            position: fixed;
            bottom: 30px;
            right: 30px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={"launcher"}>
      {!launched ? (
        <Button
          radius="xl"
          size="md"
          styles={buttonStyles}
          onClick={handleNewWindowClick}
        >
          🚀
          <span style={{ marginLeft: 8 }}>Launch yMock</span>
        </Button>
      ) : (
        <Button
          radius="xl"
          size="md"
          styles={{
            root: {
              ...buttonStyles.root,
              backgroundColor: theme.colors.gray[8],
              "&:hover": { backgroundColor: theme.colors.gray[7] },
            },
          }}
          onClick={handleCloseWindowClick}
        >
          🚫
          <span style={{ marginLeft: 8 }}>Close yMock</span>
        </Button>
      )}

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
