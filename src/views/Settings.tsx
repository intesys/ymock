/* ---------------------------------
Settings
--------------------------------- */

import * as React from "react";
import { Outlet } from "react-router-dom";
import PageBody from "../components/PageBody";

export default function Settings(): JSX.Element {
  return (
    <PageBody>
      <Outlet />
    </PageBody>
  );
}
