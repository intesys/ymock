/* ---------------------------------
Mock
--------------------------------- */

import {
  Accordion,
  Badge,
  Box,
  Button,
  Code,
  Divider,
  Group,
  Indicator,
  JsonInput,
  Paper,
  Switch,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNotifications } from "@mantine/notifications";
import { RestHandler } from "msw";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useOutletContext } from "react-router-dom";
import BlankSlate from "../components/BlankSlate";
import { OutletContext, SidebarContext } from "../components/Layout";
import PageBody from "../components/PageBody";
import PageHeader from "../components/PageHeader";
import { worker } from "../demo/mocks/browser";
import { useWorkerContext } from "../hooks";
import { useStore } from "../store";
import { stripBasePath } from "../utils";

export default function Mock(): JSX.Element {
  const [enabled, setEnabled] = useState(true);
  const { sidebarItem, setSidebarItem } = useContext(SidebarContext);
  const { onSubmit } = useOutletContext<OutletContext>();
  // const { handlers } = useWorkerContext();
  const notifications = useNotifications();
  const theme = useMantineTheme();
  const mocks = useStore((s) => s.mocks);
  const { setRuntimeOverride } = useStore((s) => s.actions);
  const { state } = useLocation();
  // TODO: remove ts-ignore
  // @ts-ignore
  const info = state?.selected;

  const form = useForm({
    initialValues: {
      override_body: "",
      override_run_once: false,
    },
  });

  // TODO: controllare il casting perché path può essere anche una RegEx
  const itemOverrides = mocks?.[(sidebarItem as unknown as RestHandler)?.info?.path as string]?.overrides;

  function handleSubmit(v: typeof form.values) {
    const { override_body: body, override_run_once: once } = v;

    if (!body) {
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
      // commit the override to `msw`
      onSubmit({
        body: JSON.parse(body),
        once,
        path: info.path,
        method: info.method.toLowerCase(),
      });

      // also save it to state for the UI to use it
      setRuntimeOverride(info.path, once, body);

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
      // worker.resetHandlers(handlers);
      worker.resetHandlers();

      // setOverride(null); TODO

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
    if (sidebarItem?.markAsSkipped) {
      setEnabled((enabled) => {
        const _markAsSkipped = (sidebarItem as unknown as RestHandler).markAsSkipped.bind(sidebarItem);

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

  return !info ? (
    <BlankSlate />
  ) : (
    <PageBody>
      {/* TODO use sx, not style, use theme values not arbitrary values */}

      <PageHeader
        title={
          <>
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
              {stripBasePath(info?.path)}
            </Code>
          </>
        }
      >
        {/*<Switch*/}
        {/*  styles={{*/}
        {/*    root: { flexDirection: "row-reverse" },*/}
        {/*    label: { paddingRight: 12, paddingLeft: 0 },*/}
        {/*  }}*/}
        {/*  checked={enabled}*/}
        {/*  onChange={handleMockActivation}*/}
        {/*  label={enabled ? "ENABLED" : "DISABLED"}*/}
        {/*/>*/}
      </PageHeader>

      <Paper shadow="xs" withBorder mb={40}>
        <Group noWrap>
          <Group sx={(t) => ({ padding: t.spacing.lg })}>
            <Text size={"xs"} transform={"uppercase"}>
              Method:
            </Text>
            <Badge color={"teal"} component={"span"}>
              {info?.method}
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
            <Code>{info?.path}</Code>
          </Group>
        </Group>
      </Paper>

      <Divider color={theme.colors.dark[4]} />

      <Accordion multiple initialItem={0}>
        <Accordion.Item label="Override this mock">
          <Box component={"section"} pb={20} pt={10}>
            <Text mb={40} size={"sm"}>
              Enter a value in the following field to override the mocked response served by the service worker. The
              field accepts JSON, and will validate & format your input. The override can run just once, (then the
              previous response will be in effect), or permanently.
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
                    : `Insert runtime response override for the path: "${info?.path}"...`
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

                <Button size="sm" uppercase type="submit" disabled={!form.values.override_body}>
                  Submit
                </Button>
              </Group>
            </form>
          </Box>
        </Accordion.Item>

        <Accordion.Item label="Overrides">
          {itemOverrides?.length ? (
            <>
              <Box component={"section"} pb={20} pt={10}>
                {itemOverrides.map((o, i, arr) => {
                  const content = (
                    <Code block key={i} mb={i !== arr.length - 1 ? 16 : 0}>
                      {o.body}
                    </Code>
                  );

                  if (o.once) {
                    return (
                      <Indicator label="Once" size={10} key={i}>
                        {content}
                      </Indicator>
                    );
                  }

                  return <React.Fragment key={i}>{content}</React.Fragment>;
                })}
              </Box>

              <Box component={"section"} py={20}>
                <Group position={"apart"}>
                  <Text size={"sm"} sx={() => ({ flexBasis: "80%", paddingRight: 16 })}>
                    Click to destroy all runtime overrides.
                    <br />
                    Only the mocks provided to <Code>msw</Code> during initialization will be active.
                  </Text>

                  <Button color={"red"} variant={"outline"} onClick={handleDestroyOverrides}>
                    Destroy
                  </Button>
                </Group>
              </Box>
            </>
          ) : (
            "There are no overrides."
          )}
        </Accordion.Item>
      </Accordion>
    </PageBody>
  );
}
