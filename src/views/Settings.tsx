/* ---------------------------------
Settings
--------------------------------- */

import * as React from "react";
import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import { Box, Container, Title } from "@mantine/core";

type OwnProps = {};

export default function Settings({}: PropsWithChildren<OwnProps>): JSX.Element {
  // const theme = useMantineTheme();

  return (
    <Container>
      <Box component={"main"}>
        <header>
          {/* TODO use sx, not style, use theme values not arbitrary values */}
          <Title order={2} style={{ marginBottom: 30 }}>
            <span style={{ marginRight: 10 }}>🛠</span>
            Settings
          </Title>
        </header>
      </Box>

      <Outlet />
    </Container>
  );
}
