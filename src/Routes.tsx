/* ---------------------------------
Routes
--------------------------------- */

import * as React from "react";
import { APP_ROOT, isHostedMode, isStandaloneMode } from "./constants";
import {
  BrowserRouter,
  Route,
  Routes as RoutesComponent,
} from "react-router-dom";
import Layout from "./components/Layout";
import Mocks from "./views/Mocks";
import Settings from "./views/Settings";
import NotFound from "./components/NotFound";
import Setting from "./views/Setting";
import Mock from "./views/Mock";
import Error from "./views/Error";
import BlankSlate from "./components/BlankSlate";

export default function Routes({}): JSX.Element {
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
          <Route path="mocks" element={<Mocks />}>
            <Route index element={<BlankSlate />} />
            <Route path=":mock" element={<Mock />} />
          </Route>

          <Route path="settings" element={<Settings />}>
            <Route index element={<BlankSlate />} />
            <Route path=":setting" element={<Setting />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="error" element={<Error />} />
      </RoutesComponent>
    </BrowserRouter>
  );
}
