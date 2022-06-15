/* ---------------------------------
BlankSlate
--------------------------------- */

import * as React from "react";
import { Box, Center } from "@mantine/core";

export default function BlankSlate({ children }): JSX.Element {
  return (
    <Center sx={() => ({ height: "100%", width: "100%" })}>
      <Box>{children}</Box>
    </Center>
  );
}
