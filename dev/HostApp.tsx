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
import { HttpHandler, Path } from "msw";
import { HttpHandlerInfo } from "msw/lib/core/handlers/HttpHandler";
import { useEffect, useState } from "react";
import { RenderFnParams } from "../src/types/ymock";

type HandlerProp = {
  handler?: HttpHandler;
};

type FormValues = {
  url?: Path;
  method?: HttpHandlerInfo["method"];
  mode?: string;
  cache?: string;
  headers?: Record<string, string>;
  referrerPolicy?: string;
  body?: string;
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
  const form = useForm<FormValues>({
    initialValues: {
      url: handler?.info.path,
      method: handler?.info.method,
      // mode: "no-cors",
      // cache: "no-cache",
      headers: {
        // "Content-Type": "application/json",
      },
      // referrerPolicy: "no-referrer",
      // body: "",
    },
  });

  useEffect(() => {
    form.setFieldValue("url", handler?.info.path);
    form.setFieldValue("method", handler?.info.method);
  }, [handler]);

  const send = async (values: FormValues) => {
    try {
      const { url, ...options } = values;
      if (!options.method) {
        throw new Error("Method not set");
      }
      if (["GET" as HttpHandlerInfo["method"]].includes(options.method)) {
        delete options.body;
        console.log(options);
      }
      const response = await fetch(url as string, options as RequestInit);
      console.log(response);
      const data = await response.json();
      setResponse(data);
    } catch (err) {
      // @ts-ignore
      setResponse(err?.message);
    }
  };

  const method = handler?.info.method;

  switch (method) {
    case undefined:
      return <Box>Select an api on the right</Box>;
    case "POST":
    case "PUT":
    case "PATCH":
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
    case "DELETE":
    default:
      return (
        <form style={{ width: "100%" }} onSubmit={form.onSubmit(send)}>
          <Stack>
            <Button type="submit">Send</Button>
          </Stack>
        </form>
      );
  }
};

const Response: React.FC<any> = ({ data }) => {
  try {
    let stringData;
    switch (typeof data) {
      case "string":
      case "boolean":
      case "number":
        stringData = data;
        break;
      case "object":
        stringData = JSON.stringify(data, null, 2);
    }
    return data && <Code>{data.toString()}</Code>;
  } catch (e) {
    console.warn(e);
  }
};

export const HostApp: React.FC<RenderFnParams> = ({ worker, handlers }) => {
  const [currentHandler, setCurrentHandler] = useState<HttpHandler>();
  const [response, setResponse] = useState<any>();

  const changeHandler = (handler: HttpHandler) => {
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
