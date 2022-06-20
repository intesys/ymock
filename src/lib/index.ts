/* ---------------------------------
lib
--------------------------------- */

import { SetupWorkerApi } from "msw";
import * as React from "react";
import { PropsWithChildren } from "react";
import { SidebarProps } from "../components/Sidebar";
import { matchPath } from "react-router";
import SettingsSidebar from "../components/SettingsSidebar";
import HomeSidebar from "../components/HomeSidebar";
import { Location } from "history";

type RuntimeRequestHandlerArgsType = {
  body: any;
  path: any;
  method?: any;
  once?: boolean;
};

export type RuntimeRequestHandlerType = (
  args: RuntimeRequestHandlerArgsType
) => any;

// TODO types, error handling...
export function setRuntimeRequestHandler(
  worker: SetupWorkerApi,
  rest: {
    [x: string]: (
      arg0: string,
      arg1: (req: any, res: any, ctx: any) => any
    ) => any;
  }
): RuntimeRequestHandlerType {
  return function ({ body, path, method = "get", once = false }) {
    worker.use(
      rest[method.toLowerCase()](path, (req: any, res: any, ctx: any) => {
        const responseBody = ctx.json(body);

        return once ? res.once?.(responseBody) : res(responseBody);
      })
    );
  };
}

export function getRouteSpecificSidebar(
  location: Location
): Partial<PropsWithChildren<SidebarProps>> {
  const matchesSettingsPage = matchPath(
    { path: "__yMock/settings/*" },
    location.pathname
  );

  if (matchesSettingsPage)
    return {
      title: "Settings",
      children: React.createElement(SettingsSidebar),
    };

  return {
    title: "Mocked requests",
    children: React.createElement(HomeSidebar),
  };
}
