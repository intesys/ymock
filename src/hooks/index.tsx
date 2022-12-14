/* ---------------------------------
Hooks
--------------------------------- */

import { useContext } from "react";
import { WorkerContext } from "../components/Layout";
import { MSWglobalExports } from "../types";

export function useWorkerContext(): MSWglobalExports {
  const { worker, rest, handlers } = useContext(WorkerContext) ?? {};

  if ([worker, rest, handlers].some((truthy) => !truthy)) {
    throw new Error(`Missing context value(s) in \`useWorkerContext\``);
  }

  return { worker, rest, handlers };
}
