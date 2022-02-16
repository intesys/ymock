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
            <Title order={1} style={{ marginBottom: 30 }}>
              Request info
            </Title>
          </header>

          <Paper padding="lg" shadow="xs" withBorder mb={40}>
            <Title order={3}>
              <Group spacing="md">
                <Badge color={"green"} component={"span"}>
                  {info.method}
                </Badge>

                <Code>{info.path}</Code>
              </Group>
            </Title>
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
                <Button size="sm" uppercase type="submit" mt={20}>
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
