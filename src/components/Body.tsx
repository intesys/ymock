/* ---------------------------------
Body
--------------------------------- */

import * as React from "react";
import {
  FormEvent,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Badge,
  Box,
  Button,
  Center,
  Code,
  Container,
  Divider,
  Group,
  JsonInput,
  Paper,
  Space,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { OutletContext, SidebarContext } from "./Layout";
import { useOutletContext } from "react-router-dom";
import { RestHandler } from "msw";
import { stripBasePath } from "../utils";

export default function Body(): ReactElement {
  const [input, setInput] = useState<string>("");
  const [enabled, setEnabled] = useState(true);
  const { onSubmit } = useOutletContext<OutletContext>();
  const { sidebarItem, setSidebarItem } = useContext(SidebarContext);
  const { info } = (sidebarItem as unknown as RestHandler) ?? {};
  const notifications = useNotifications();

  function handleReset() {
    setInput("");
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!input) {
      notifications.showNotification({
        title: "Missing input",
        message: "Please provide a value.",
      });

      return;
    }

    if (!info?.path) {
      notifications.showNotification({
        title: "Missing path",
        message: "No path provided.",
      });

      return;
    }

    try {
      onSubmit(input, info.path as string);

      notifications.showNotification({
        title: "Saved!",
        color: "green",
        message: "The override was correctly submitted.",
      });
    } catch (err) {
      notifications.showNotification({
        title: "Submission error",
        color: "red",
        message: `There was an error in submitting the form${
          (err as Error).message ? ": " + (err as Error).message : ""
        }`,
      });
    }

    handleReset();
  }

  useEffect(() => {
    if (sidebarItem) {
      handleReset();

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
    <Container>
      {!info ? (
        <Center>
          <Box>
            {/* TODO should be centered in page */}
            <Space h={216} />
            <Text size={"sm"}>Please select an item from the sidebar.</Text>
            <Space h={"xl"} />
          </Box>
        </Center>
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

          <Divider
            my="xs"
            label={<Title order={4}>Override response</Title>}
            labelPosition="left"
          />

          <Box component={"section"} style={{ padding: "20px 0" }}>
            <Text mb={40} size={"sm"}>
              Enter a value in the following field to override the mocked
              response served by the service worker. The field accepts JSON, and
              will validate & format your input. Please note the override will
              run just once, then the previous response will be in effect.
            </Text>

            <form action="#" onSubmit={handleSubmit}>
              <JsonInput
                placeholder={
                  !enabled
                    ? `Please enable the mock to use overrides.`
                    : `Insert runtime response override for the path: "${info.path}"...`
                }
                variant="filled"
                validationError="Invalid json"
                formatOnBlur
                autosize
                minRows={10}
                onChange={setInput}
                value={input}
                disabled={!enabled}
              />

              <Group position="right">
                <Button
                  size="sm"
                  uppercase
                  type="submit"
                  disabled={!input}
                  mt={20}
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
