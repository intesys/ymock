/* ---------------------------------
Mocks
--------------------------------- */

import * as React from "react";
import { Outlet } from "react-router-dom";
import PageBody from "../components/PageBody";
import { useWorkerContext } from "../hooks";
import { setRuntimeRequestHandler } from "../lib";

export default function Mocks(): JSX.Element {
  const { worker, rest } = useWorkerContext();

  return (
    <PageBody>
      <Outlet
        // https://reactrouter.com/docs/en/v6/hooks/use-outlet-context
        context={{
          onSubmit: setRuntimeRequestHandler(worker, rest),
        }}
      />
    </PageBody>
  );
}
