/* ---------------------------------
Settings
--------------------------------- */

import * as React from "react";
import { PropsWithChildren } from "react";
import { Container, Switch, useMantineColorScheme } from "@mantine/core";
import { useParams } from "react-router";
import { GlobalStateSettings } from "../types";

type OwnProps = {};

export default function Setting({}: PropsWithChildren<OwnProps>): JSX.Element | null {
  const { setting } = useParams();

  switch (setting as keyof GlobalStateSettings) {
    case "theme": {
      const { colorScheme, toggleColorScheme } = useMantineColorScheme();
      const dark = colorScheme === "dark";

      return (
        <Container>
          <Switch
            styles={{
              root: { flexDirection: "row-reverse" },
              label: { paddingRight: 12, paddingLeft: 0 },
            }}
            onClick={() => toggleColorScheme()}
            label={`Toggle ${dark ? "light" : "dark"} theme`}
          />
        </Container>
      );
    }

    default:
      return null;
  }
}
