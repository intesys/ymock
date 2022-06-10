/* ---------------------------------
App
--------------------------------- */

import React from "react";
import Layout from "./components/Layout";
import { MSWglobalExports } from "./types";
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
  isStandaloneMode,
} from "./constants";

let msw: MSWglobalExports;

/*
 * This app's use case is to manage a `msw`
 * instance launched by a host app.
 *
 * @see: README.md:23 (Hosted mode)
 * @see: README.md:30 (Standalone mode)
 *
 * */

if (isStandaloneMode) {
  const { rest } = require("msw");
  const { worker } = require("./demo/mocks/browser");
  const { handlers } = require("./demo/mocks/handlers");

  msw = { rest, worker, handlers };
}

// Provides the worker's data & handlers to the whole app
export const WorkerContext = React.createContext<MSWglobalExports>({
  handlers: [],
  rest: undefined,
  worker: undefined,
});

function App() {
  const { worker, rest, handlers } = msw ?? window?.msw ?? {};
  const fatalError = [worker, rest, handlers].some((truthy) => !truthy);

  if (fatalError) {
    if (isDevMode) {
      console.error(ERROR__GLOBAL_FATAL_ERROR);
    }

    return (
      <Container size={"md"} sx={{ height: "100vh" }}>
        <Center sx={{ height: "100%", flexDirection: "column" }}>
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
        </Center>
      </Container>
    );
  }

  return (
    <div className="App">
      <WorkerContext.Provider value={{ worker, rest, handlers }}>
        <Layout />
      </WorkerContext.Provider>
    </div>
  );
}

export default App;
