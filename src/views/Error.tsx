/* ---------------------------------
Error
--------------------------------- */

import * as React from "react";
import { PropsWithChildren } from "react";
import {
  Alert,
  Box,
  Center,
  Code,
  Container,
  Space,
  Text,
} from "@mantine/core";
import {
  ERROR__GLOBAL_FATAL_ERROR,
  EXAMPLE_TYPE,
  isDevMode,
  isHostedMode,
} from "../constants";
import { ErrorTypes } from "../types";

type OwnProps = {
  errorType?: ErrorTypes;
};

export default function Error({
  errorType = "FATAL_ERROR",
}: PropsWithChildren<OwnProps>): JSX.Element {
  function renderError(err: ErrorTypes) {
    switch (err) {
      case "FATAL_ERROR":
      default: {
        if (isDevMode) {
          console.error(ERROR__GLOBAL_FATAL_ERROR);
        }

        return (
          <>
            <Box>
              <Alert
                title="Error in connecting to MSW"
                color="red"
                variant="filled"
              >
                Please ensure your app is saving a <code>msw</code> object to{" "}
                <code>window</code>.
              </Alert>
              <Text mt={"xl"}>
                This is the expected shape of the <code>msw</code> object:
                <Space h={"xl"} />
                <Code block>{EXAMPLE_TYPE}</Code>
              </Text>
            </Box>

            {isHostedMode && (
              <Box mt={"xl"}>
                <Text mt={"lg"}>
                  💡 Did you mean to launch the app in hosted mode?{" "}
                  <Text variant="link" component="a" href={`/`}>
                    Visit the demo page.
                  </Text>
                </Text>
              </Box>
            )}
          </>
        );
      }
    }
  }

  return (
    <Container size={"md"} sx={{ height: "100vh" }}>
      <Center sx={{ height: "100%", flexDirection: "column" }}>
        {renderError(errorType)}
      </Center>
    </Container>
  );
}
