/* ---------------------------------
Body
--------------------------------- */

import * as React from "react";
import { PropsWithChildren, ReactElement, useContext } from "react";
import { Box, Container } from "@mantine/core";
import { SidebarContext } from "./Layout";
import { RestHandler } from "msw";

type OwnProps = {
};

export default function PageBody({
  children,
}: PropsWithChildren<OwnProps>): ReactElement {
  const { sidebarItem } = useContext(SidebarContext);
  const { info } = (sidebarItem as unknown as RestHandler) ?? {};

  return (
    <Container sx={() => (!info ? { height: "100%" } : {})}>
      <Box component={"main"}>{children}</Box>
    </Container>
  );
}
