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
} from "@mantine/core";
import { RestHandler } from "msw";

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

  function handleReset() {
    setInput("");
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!input) {
      window.alert("Please provide a value.");
      return;
    }

    if (!info?.path) {
      window.alert("No path provided");
      return;
    }

    onSubmit && onSubmit(input, info.path as string);

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
        <span>Please select an item from the sidebar.</span>
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
            <Text mb={40}>
              Klingons die with understanding at the brave moon! Wind at the
              saucer section was the life of powerdrain, controlled to a
              collective girl. Ferengi of a cold shield, lower the sonic shower.
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
