/* ---------------------------------
Body
--------------------------------- */

import * as React from "react";
import {
  FormEvent,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Title,
  Text,
  Badge,
  Group,
  Code,
  JsonInput,
  Center,
  Space,
} from "@mantine/core";
import { RestHandler } from "msw";
import { useNotifications } from "@mantine/notifications";

type OwnProps = {
  currentItem?: RestHandler;
  onSubmit: (input: string, path: string) => void;
};

export default function Body({
  currentItem,
  onSubmit,
}: PropsWithChildren<OwnProps>): ReactElement {
  const [input, setInput] = useState<string>("");
  const { info } = currentItem ?? {};
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
          err?.message ? ": " + err.message : ""
        }`,
      });
    }

    handleReset();
  }

  useEffect(() => {
    if (currentItem) {
      handleReset();
    }
  }, [currentItem]);

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
          <header>
            {/* TODO use sx, not style, use theme values not arbitrary values */}
            <Title order={2} style={{ marginBottom: 30 }}>
              Request info
            </Title>
          </header>

          <Paper shadow="xs" withBorder mb={40}>
            <Group noWrap>
              <Group sx={(t) => ({ padding: t.spacing.lg })}>
                <Text size={"xs"} transform={"uppercase"}>
                  Method:
                </Text>
                <Badge color={"green"} component={"span"}>
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
            <Text mb={40} size={"md"}>
              Enter a value in the following field to override the mocked
              response served by the service worker. The field accepts JSON, and
              will validate & format your input. Please note the override will
              run just once, then the previous response will be in effect.
            </Text>

            <form action="#" onSubmit={handleSubmit}>
              <JsonInput
                placeholder={`insert runtime response override for the path: "${info.path}"...`}
                variant="filled"
                validationError="Invalid json"
                formatOnBlur
                autosize
                minRows={10}
                onChange={setInput}
                value={input}
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
