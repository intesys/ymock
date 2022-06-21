/* ---------------------------------
Settings
--------------------------------- */

import * as React from "react";
import { PropsWithChildren } from "react";
import { Switch, useMantineColorScheme } from "@mantine/core";
import { useParams } from "react-router";
import { GlobalStateSettings } from "../types";
import PageBody from "../components/PageBody";
import PageHeader from "../components/PageHeader";

type OwnProps = {};

export default function Setting({}: PropsWithChildren<OwnProps>): JSX.Element {
  const { setting } = useParams();

  const getSettingPageContent = () => {
    switch (setting as keyof GlobalStateSettings) {
      case "theme": {
        const { colorScheme, toggleColorScheme } = useMantineColorScheme();
        const dark = colorScheme === "dark";

        return (
          <Switch
            styles={{
              root: { flexDirection: "row-reverse" },
              label: { paddingRight: 12, paddingLeft: 0 },
            }}
            onClick={() => toggleColorScheme()}
            label={`Toggle ${dark ? "light" : "dark"} theme`}
          />
        );
      }

      default:
        return null;
    }
  };

  return (
    <PageBody>
      <PageHeader title={setting} />

      {getSettingPageContent()}
    </PageBody>
  );
}
