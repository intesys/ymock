/* ---------------------------------
Body
--------------------------------- */

import * as React from "react";
import { PropsWithChildren, ReactElement } from "react";
import { Box, Container } from "@mantine/core";

type OwnProps = {};

export default function PageBody({
  children,
}: PropsWithChildren<OwnProps>): ReactElement {
  return (
    <Box component={"main"} className={"page-body"}>
      <Container className={"page-body-container"}>{children}</Container>

      <style jsx>{`
        :global(.page-body),
        :global(.page-body-container) {
          height: 100%;
        }
      `}</style>
    </Box>
  );
}
