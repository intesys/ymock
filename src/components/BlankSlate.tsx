/* ---------------------------------
BlankSlate
--------------------------------- */

import * as React from "react";
import { ReactChild } from "react";
import { Box, Center } from "@mantine/core";

type OwnProps = {
  children: ReactChild;
};

export default function BlankSlate({ children }: OwnProps): JSX.Element {
  return (
    <Center sx={() => ({ height: "100%", width: "100%" })}>
      <Box>{children}</Box>
    </Center>
  );
}
