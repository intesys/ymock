/* ---------------------------------
Settings
--------------------------------- */

import * as React from "react";
import { PropsWithChildren } from "react";
import {
  Group,
  Paper,
  Switch,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useLocation, useParams } from "react-router";
import { GlobalStateSettings } from "../types";
import PageBody from "../components/PageBody";
import PageHeader from "../components/PageHeader";
import { capitalizeFirstLetter } from "../utils";

type OwnProps = {};

export default function Setting({}: PropsWithChildren<OwnProps>): JSX.Element {
  const { setting } = useParams();
  const { state } = useLocation();

  const getSettingPageContent = () => {
    switch (setting as keyof GlobalStateSettings) {
      case "theme": {
        const { colorScheme, toggleColorScheme } = useMantineColorScheme();
        const dark = colorScheme === "dark";

        return (
          <Paper shadow="xs" withBorder mb={40}>
            <Group noWrap p={"lg"} position={"apart"}>
              <Text>Toggle light theme</Text>

              <Switch
                styles={{
                  root: { flexDirection: "row-reverse" },
                  label: { paddingRight: 12, paddingLeft: 0 },
                }}
                onClick={() => toggleColorScheme()}
              />
            </Group>
          </Paper>
        );
      }

      default:
        return null;
    }
  };

  return (
    <PageBody>
      <PageHeader title={capitalizeFirstLetter(setting) ?? ""} />

      {getSettingPageContent()}
    </PageBody>
  );
}
