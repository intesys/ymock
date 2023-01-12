/* ---------------------------------
Routes
--------------------------------- */

import * as React from "react";
import { HashRouter, Route, Routes as RoutesComponent } from "react-router-dom";
import Layout from "../components/Layout";
import Mocks from "./Mocks";
import Settings from "./Settings";
import NotFound from "../components/NotFound";
import Setting from "./Setting";
import Mock from "./Mock";
import Error from "./Error";
import BlankSlate from "../components/BlankSlate";

export default function Routes({}): JSX.Element {
  return (
    <HashRouter>
      <RoutesComponent>
        <Route path={"/"} element={<Layout />}>
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
    </HashRouter>
  );
}
