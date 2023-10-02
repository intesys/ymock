import {
  Box,
  Button,
  Center,
  Code,
  Container,
  Flex,
  JsonInput,
  MantineProvider,
  NavLink,
  Stack,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useForm } from "@mantine/form";
import { IconClick } from "@tabler/icons-react";
import { DefaultBodyType, MockedRequest, RestHandler } from "msw";
import { useEffect, useState } from "react";
import { RenderFnParams } from "../src/types/ymock";

type HandlerProp = {
  handler?: RestHandler<MockedRequest<DefaultBodyType>>;
};

const CurrentHandler: React.FC<HandlerProp> = ({ handler }) =>
  handler && (
    <Title order={4} pb={20}>
      Invoke {handler.info.header}
    </Title>
  );

const RequestForm: React.FC<
  HandlerProp & { setResponse: React.Dispatch<any> }
> = ({ handler, setResponse }) => {
  const form = useForm({
    initialValues: {
      url: handler?.info.path,
      method: handler?.info.method,
      // mode: "no-cors",
      // cache: "no-cache",
      Headers: {
        "Content-Type": "application/json",
      },
      // referrerPolicy: "no-referrer",
      body: "",
    },
  });

  useEffect(() => {
    form.setFieldValue("url", handler?.info.path);
    form.setFieldValue("method", handler?.info.method);
  }, [handler]);

  const send = async (values: typeof form.values) => {
    try {
      const { url, ...options } = values;
      const response = await fetch(url as string, options as RequestInit);
      console.log(response);
      const data = await response.json();
      setResponse(data);
    } catch (err) {
      setResponse(err.message);
    }
  };

  const method = handler?.info.method;

  switch (method) {
    case undefined:
      return <Box>Select an api on the right</Box>;
    case "POST":
    case "PUT":
      return (
        <form style={{ width: "100%" }} onSubmit={form.onSubmit(send)}>
          <Stack>
            <JsonInput
              label="Body (json)"
              placeholder="{}"
              autosize
              minRows={10}
              style={{ width: "100%" }}
              {...form.getInputProps("body")}
            />
            <Button type="submit">Send</Button>
          </Stack>
        </form>
      );
    case "GET":
    default:
      return (
        <Stack>
          <Button>Send</Button>
        </Stack>
      );
  }
};

const Response: React.FC<any> = ({ data }) => data && <Code>{data}</Code>;

export const HostApp: React.FC<RenderFnParams> = ({ worker, handlers }) => {
  const [currentHandler, setCurrentHandler] =
    useState<RestHandler<MockedRequest<DefaultBodyType>>>();
  const [response, setResponse] = useState<any>();

  const changeHandler = (
    handler: RestHandler<MockedRequest<DefaultBodyType>>
  ) => {
    setCurrentHandler(handler);
    setResponse(null);
  };

  return (
    <MantineProvider>
      <Container>
        <Center py={10}>
          <Title>Host app</Title>
        </Center>
        <Flex
          gap={20}
          align="stretch"
          style={{
            alignContent: "stretch",
          }}
        >
          <Box>
            <Title order={4} pb={10}>
              Select an api
            </Title>
            {handlers.map((api) => (
              <NavLink
                key={api.info.header}
                label={api.info.header}
                rightSection={<IconClick />}
                onClick={() => changeHandler(api)}
              />
            ))}
          </Box>
          <Box style={{ flexGrow: 2 }}>
            <Container>
              <CurrentHandler handler={currentHandler} />
              <RequestForm handler={currentHandler} setResponse={setResponse} />
              <Response data={response} />
            </Container>
          </Box>
        </Flex>
      </Container>
    </MantineProvider>
  );
};
