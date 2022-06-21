/* ---------------------------------
Settings
--------------------------------- */

import * as React from "react";
import { PropsWithChildren } from "react";
import { Container } from "@mantine/core";
import { useParams } from "react-router";

type OwnProps = {};

export default function Setting({}: PropsWithChildren<OwnProps>): JSX.Element {
  const { setting } = useParams();

  return <Container>{setting}</Container>;
}
