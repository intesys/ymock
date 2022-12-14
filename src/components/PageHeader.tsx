/* ---------------------------------
PageHeader
--------------------------------- */

import { Group, Title } from "@mantine/core";
import * as React from "react";
import { PropsWithChildren } from "react";

type OwnProps = { title: string | JSX.Element };

export default function PageHeader({ title, children }: PropsWithChildren<OwnProps>): JSX.Element {
  return (
    <header>
      <Group noWrap position={"apart"} align={"center"}>
        <Title order={2}>{title}</Title>

        {children}
      </Group>

      <style jsx>{`
        header {
          padding: 50px 0 30px;
        }
      `}</style>
    </header>
  );
}
