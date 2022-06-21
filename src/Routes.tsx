/* ---------------------------------
Routes
--------------------------------- */

import * as React from "react";
import { PropsWithChildren } from "react";
import { APP_ROOT, isHostedMode, isStandaloneMode } from "./constants";
import {
  BrowserRouter,
  Route,
  Routes as RoutesComponent,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./views/Home";
import Settings from "./views/Settings";
import NotFound from "./components/NotFound";
import Setting from "./views/Setting";

type OwnProps = {};

export default function Routes({}: PropsWithChildren<OwnProps>): JSX.Element {
  return (
    <BrowserRouter>
      <RoutesComponent>
        {isHostedMode && (
          <Route
            path="/"
            element={React.createElement(require("./demo/Demo")?.default)}
          />
        )}

        <Route path={isStandaloneMode ? "/" : APP_ROOT} element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="home" element={<Home />} />
          <Route path="mocks" element={<Home />} />

          <Route path="settings" element={<Settings />}>
            <Route path=":setting" element={<Setting />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </RoutesComponent>
    </BrowserRouter>
  );
}
