/* ---------------------------------
App
--------------------------------- */

import React, { useEffect } from "react";
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
  ERROR__FATAL_ERROR_DEV_VARIANT,
  EXAMPLE_TYPE,
  isDevMode,
  isHostedMode,
  isStandaloneMode,
} from "./constants";
// import _msw from "./mocks/msw"; <== Re-enable mocks if you need them

let msw: MSWglobalExports;

/*
 * This app's use case is to manage a `msw`
 * instance launched by a host app.
 *
 * This is the default behavior when you run
 * `yarn dev`, so the app will run alongside
 * a "demo" page rendered at `/demo`; if you
 * try to run the app from its own route (`/`)
 * you will get an error.
 *
 * For cases when you want to develop the app
 * _without_ tying it to the host app (for example,
 * you may want to provide your own mock instance of
 * msw), enable STANDALONE_MODE in .env.
 *
 * This way, the msw instance required by the app will
 * be populated from this file, without needing to look
 * for it in the window object.
 *
 * */

if (isStandaloneMode) {
  const { rest } = require("msw");
  const { worker } = require("./demo/mocks/browser");
  const { handlers } = require("./demo/mocks/handlers");

  msw = { rest, worker, handlers };
}

function App() {
  const { worker, rest, handlers } = msw ?? window?.msw ?? {};
  const fatalError = [worker, rest, handlers].some((el) => !el);

  if (fatalError) {
    if (isDevMode) {
      console.error(ERROR__FATAL_ERROR_DEV_VARIANT);
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

  useEffect(() => {
    if (worker?.events) {
      const events = ["request:start", "request:unhandled", "response:bypass"];
      const listener = (ev: string) => () => console.log(ev);

      events.forEach((ev) => worker.events.on(ev, listener(ev)));
    }

    return () => {
      worker.events.removeAllListeners();
    };
  }, [worker]);

  return (
    <div className="App">
      <Layout
        {...({ worker, rest, handlers } as unknown as MSWglobalExports)} // TODO...
      />
    </div>
  );
}

export default App;
