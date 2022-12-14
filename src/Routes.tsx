/* ---------------------------------
Routes
--------------------------------- */

import * as React from "react";
import { BrowserRouter, Route, Routes as RoutesComponent } from "react-router-dom";
import BlankSlate from "./components/BlankSlate";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import { APP_ROOT, isHostedMode, isStandaloneMode } from "./constants";
import Error from "./views/Error";
import Mock from "./views/Mock";
import Mocks from "./views/Mocks";
import Setting from "./views/Setting";
import Settings from "./views/Settings";

export default function Routes({}): JSX.Element {
  return (
    <BrowserRouter>
      <RoutesComponent>
        {isHostedMode && <Route path="/" element={React.createElement(require("./demo/Demo")?.default)} />}

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
