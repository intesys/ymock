/* ---------------------------------
Main
--------------------------------- */

import * as React from "react";
import { Outlet } from "react-router-dom";
import { setRuntimeRequestHandler } from "../lib";
import { useWorkerContext } from "../hooks";
import PageBody from "../components/PageBody";

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
