/* ---------------------------------
Main
--------------------------------- */

import * as React from "react";
import Body from "../components/Body";
import { useSidebarContext } from "../components/Layout";

export default function Home(): JSX.Element {
  const { currentItem, onSubmit } = useSidebarContext();

  return <Body currentItem={currentItem} onSubmit={onSubmit} />;
}
