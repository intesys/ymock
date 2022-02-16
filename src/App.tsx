/* ---------------------------------
App
--------------------------------- */

import React, { useEffect } from "react";
import Layout from "./components/Layout";
import _msw from "./mocks/msw";
import { MSWglobalExports } from "./types";
import {
  DefaultRequestBody,
  MockedRequest,
  RestHandler,
  SetupWorkerApi,
} from "msw";
import { Box, Code, Container } from "@mantine/core";

function App() {
  const { msw } = window;
  const { worker, rest, handlers } = _msw ?? {};

  if (!worker || !rest || !handlers) {
    return (
      <Container size={"sm"}>
        <Box>
          Error in connecting to MSW. Please ensure your app is saving a{" "}
          <code>msw</code> object to <code>window</code>. Such object should be
          shaped according to this type:
          <Code block>`TODO;`</Code>
        </Box>
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
