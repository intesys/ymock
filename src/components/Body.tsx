/* ---------------------------------
Body
--------------------------------- */

import * as React from "react";
import { ReactElement, useContext, useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Code,
  Container,
  Divider,
  Group,
  JsonInput,
  Paper,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { OutletContext, SidebarContext } from "./Layout";
import { useOutletContext } from "react-router-dom";
import { RestHandler } from "msw";
import { stripBasePath } from "../utils";
import { useForm } from "@mantine/form";
import { worker } from "../demo/mocks/browser";
import { useWorkerContext } from "../hooks";
import BlankSlate from "./BlankSlate";

type OverrideDefinitionType = { path: string; body: string };

export default function Body(): ReactElement {
  const [enabled, setEnabled] = useState(true);
  const [override, setOverride] = useState<OverrideDefinitionType | null>();
  const { sidebarItem, setSidebarItem } = useContext(SidebarContext);
  const { info } = (sidebarItem as unknown as RestHandler) ?? {};
  const { onSubmit } = useOutletContext<OutletContext>();
  const notifications = useNotifications();
  const { handlers } = useWorkerContext();

  const form = useForm({
    initialValues: {
      override_body: "",
      override_run_once: false,
    },
  });

  function handleSubmit(v: typeof form.values) {
    if (!v.override_body) {
      notifications.showNotification({
        title: "Missing input",
        color: "red",
        message: "Please provide a value.",
      });

      return;
    }

    if (!info?.path) {
      notifications.showNotification({
        title: "Missing path",
        color: "red",
        message: "No path provided.",
      });

      return;
    }

    try {
      const { override_body: body, override_run_once: once } = v;

      onSubmit({
        body: JSON.parse(body),
        once,
        path: info.path,
        method: info.method.toLowerCase(),
      });

      setOverride({ path: info.path, body });

      notifications.showNotification({
        title: "Saved!",
        color: "green",
        message: "The override was correctly submitted.",
      });
    } catch (err) {
      notifications.showNotification({
        autoClose: false,
        title: "Submission error",
        color: "red",
        message: `There was an error in submitting the form${
          (err as Error).message ? ": " + (err as Error).message : ""
        }`,
      });
    }

    form.reset();
  }

  function handleDestroyOverrides() {
    // TODO redo with UI lib
    const confirmed = window.confirm("Are you sure?");

    if (confirmed) {
      // TODO doesn't work
      worker.resetHandlers(handlers);

      setOverride(null);

      notifications.showNotification({
        title: "KABOOOM!",
        color: "green",
        message: "Overrides were destroyed.",
      });
    }
  }

  useEffect(() => {
    if (sidebarItem) {
      form.reset();

      // sidebarItem is a RestHandler
      if ("shouldSkip" in sidebarItem) {
        setEnabled(!(sidebarItem as unknown as RestHandler).shouldSkip);
      }
    }
  }, [sidebarItem]);

  function handleMockActivation() {
    // `markAsSkipped` is not an own prop,
    // it goes up the prototype chain by 2 levels
    if (sidebarItem.markAsSkipped) {
      setEnabled((enabled) => {
        const _markAsSkipped = (
          sidebarItem as unknown as RestHandler
        ).markAsSkipped.bind(sidebarItem);

        // The value of `shouldSkip` should be whatever
        // the value of `enabled` is when I click;
        // The mock is enabled (true) => I click to disable it => shouldSkip = true
        // At the end of the process, we update the UI of `Switch` by flipping `enabled`.
        _markAsSkipped(enabled);

        // We don't create an object literal with new props spread into it,
        // otherwise we'd lose the inherited properties from the proto chain.
        setSidebarItem(sidebarItem);

        return !enabled;
      });
    }
  }

  return (
    <Container sx={() => (!info ? { height: "100%" } : {})}>
      {!info ? (
        <BlankSlate>
          <Text size={"sm"}>Please select an item from the sidebar.</Text>
        </BlankSlate>
      ) : (
        <Box component={"main"}>
          {/* TODO use sx, not style, use theme values not arbitrary values */}
          <header style={{ marginBottom: 30 }}>
            <Group noWrap position={"apart"} align={"center"}>
              <Title order={2}>
                Mock info:{" "}
                <Code
                  sx={() => ({
                    fontSize: 20,
                    marginLeft: 10,
                    marginBottom: -3,
                    position: "relative",
                    top: -1,
                  })}
                >
                  {stripBasePath(info.path)}
                </Code>
              </Title>
              <Switch
                styles={{
                  root: { flexDirection: "row-reverse" },
                  label: { paddingRight: 12, paddingLeft: 0 },
                }}
                checked={enabled}
                onChange={handleMockActivation}
                label={enabled ? "ENABLED" : "DISABLED"}
              />
            </Group>
          </header>

          <Paper shadow="xs" withBorder mb={40}>
            <Group noWrap>
              <Group sx={(t) => ({ padding: t.spacing.lg })}>
                <Text size={"xs"} transform={"uppercase"}>
                  Method:
                </Text>
                <Badge color={"teal"} component={"span"}>
                  {info.method}
                </Badge>
              </Group>

              <Box
                component={"span"}
                sx={{
                  display: "inline-block",
                  width: 1,
                  height: 60,
                  background: "#2C2E33", // TODO color not in theme
                }}
              />

              <Group sx={(t) => ({ padding: t.spacing.lg })}>
                <Text size={"xs"} transform={"uppercase"}>
                  Path:
                </Text>
                <Code>{info.path}</Code>
              </Group>
            </Group>
          </Paper>

          {override?.path ===
            (sidebarItem as unknown as RestHandler).info.path && (
            <>
              <Divider
                my="xs"
                label={<Title order={4}>Active overrides</Title>}
                labelPosition="left"
              />

              <Box component={"section"} py={20} mb={40}>
                <Code block>{override.body}</Code>
              </Box>

              <Divider
                my="xs"
                label={<Title order={4}>Destroy overrides</Title>}
                labelPosition="left"
              />

              <Box component={"section"} py={20} mb={40}>
                <Group position={"apart"}>
                  <Text
                    size={"sm"}
                    sx={() => ({ flexBasis: "80%", paddingRight: 16 })}
                  >
                    Click to destroy all runtime overrides.
                    <br />
                    Only the mocks provided to <Code>msw</Code> during
                    initialization will be active.
                  </Text>

                  <Button
                    color={"red"}
                    variant={"outline"}
                    onClick={handleDestroyOverrides}
                  >
                    Destroy
                  </Button>
                </Group>
              </Box>
            </>
          )}

          <Divider
            my="xs"
            label={<Title order={4}>Override this mock</Title>}
            labelPosition="left"
          />

          <Box component={"section"} py={40}>
            <Text mb={40} size={"sm"}>
              Enter a value in the following field to override the mocked
              response served by the service worker. The field accepts JSON, and
              will validate & format your input. The override can run just once,
              (then the previous response will be in effect), or permanently.
            </Text>

            <form action="#" onSubmit={form.onSubmit(handleSubmit)}>
              <JsonInput
                required
                disabled={!enabled}
                validationError="Invalid json"
                formatOnBlur
                placeholder={
                  !enabled
                    ? `Please enable the mock to use overrides.`
                    : `Insert runtime response override for the path: "${info.path}"...`
                }
                variant="filled"
                autosize
                minRows={10}
                {...form.getInputProps("override_body")}
              />

              <Group position="apart" align={"center"} mt={20}>
                <Switch
                  styles={{
                    root: { flexDirection: "row-reverse" },
                    label: { paddingRight: 12, paddingLeft: 0 },
                  }}
                  label={"Run once"}
                  disabled={!enabled}
                  {...form.getInputProps("override_run_once", {
                    type: "checkbox",
                  })}
                />

                <Button
                  size="sm"
                  uppercase
                  type="submit"
                  disabled={!form.values.override_body}
                >
                  Submit
                </Button>
              </Group>
            </form>
          </Box>
        </Box>
      )}
    </Container>
  );
}
