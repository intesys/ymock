/* ---------------------------------
App
--------------------------------- */

import React, { useEffect } from "react";
import Layout from "./components/Layout";
// import _msw from "./mocks/msw"; <== Re-enable mocks if you need them
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

let msw: MSWglobalExports;

if (process.env.NODE_ENV === "development") {
  const { rest } = require("msw");
  const { worker } = require("./demo/mocks/browser");
  const { handlers } = require("./demo/mocks/handlers");

  msw = { rest, worker, handlers };
}


function App() {
  const { worker, rest, handlers } = msw ?? window?.msw ?? {};

  if ([worker, rest, handlers].some((el) => !el)) {
    return (
      <Container size={"md"} sx={{ height: "100vh" }}>
        <Center sx={{ height: "100%" }}>
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
              Such object should be shaped according to this type:
              <Space h={"xl"} />
              <Code block>`TODO;`</Code>
            </Text>
          </Box>
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
