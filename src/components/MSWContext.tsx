import React, { PropsWithChildren } from "react";
import { RenderFnParams } from "../types/ymock";
import { SetupWorker } from "msw";

export const MSWContext = React.createContext<RenderFnParams>({
  worker: null as unknown as SetupWorker,
  handlers: [],
});

export const MSWContextProvider: React.FC<
  RenderFnParams & PropsWithChildren
> = ({ worker, handlers, children }) => {
  return (
    <MSWContext.Provider value={{ worker, handlers }}>
      {children}
    </MSWContext.Provider>
  );
};
