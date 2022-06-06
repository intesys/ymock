/* ---------------------------------
Main
--------------------------------- */

import * as React from "react";
import { PropsWithChildren } from "react";
import Body from "../components/Body";
import { useSidebarContext } from "../components/Layout";

type OwnProps = {};

export default function Main({}: PropsWithChildren<OwnProps>): JSX.Element {
  const { currentItem, onSubmit } = useSidebarContext();

  return <Body currentItem={currentItem} onSubmit={onSubmit} />;
}
