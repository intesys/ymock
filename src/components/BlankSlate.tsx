/* ---------------------------------
BlankSlate
--------------------------------- */

import * as React from "react";
import { ReactChild } from "react";
import { Box, Center, Text } from "@mantine/core";
import { MESSAGE__SELECT_FROM_SIDEBAR } from "../constants";

type OwnProps = {
  children?: ReactChild;
};

export default function BlankSlate({ children }: OwnProps): JSX.Element {
  return (
    <Center sx={() => ({ height: "100%", width: "100%" })}>
      <Box>
        {children ?? <Text size={"sm"}>{MESSAGE__SELECT_FROM_SIDEBAR}</Text>}
      </Box>
    </Center>
  );
}
