/* ---------------------------------
PageHeader
--------------------------------- */

import * as React from "react";
import { PropsWithChildren } from "react";
import { Group, Title } from "@mantine/core";

type OwnProps = { title: string | JSX.Element };

export default function PageHeader({
  title,
  children,
}: PropsWithChildren<OwnProps>): JSX.Element {
  return (
    <header style={{ marginBottom: 30 }}>
      <Group noWrap position={"apart"} align={"center"}>
        <Title order={2}>{title}</Title>

        {children}
      </Group>
    </header>
  );
}
