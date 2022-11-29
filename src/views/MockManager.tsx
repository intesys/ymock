import {
  Accordion,
  Badge,
  Box,
  Button,
  Code,
  ColorScheme,
  ColorSchemeProvider,
  Divider,
  Group,
  JsonInput,
  MantineProvider,
  Paper,
  Switch,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  NotificationsProvider,
  useNotifications,
} from "@mantine/notifications";
import { SetupWorkerApi } from "msw";
import { FC, useState } from "react";
import PageBody from "../components/PageBody";
import PageHeader from "../components/PageHeader";
import { DEFAULT_THEME } from "../constants";
import { stripBasePath } from "../utils";

interface IProps {
  worker: SetupWorkerApi;
}

interface IFormValues {
  override_body: string;
  override_run_once: boolean;
}

const MockManagerView: FC<IProps> = ({ worker }) => {
  const [enabled, setEnabled] = useState(true);

  const notifications = useNotifications();

  const theme = useMantineTheme();

  const form = useForm<IFormValues>({
    initialValues: {
      override_body: "",
      override_run_once: false,
    },
  });

  const handleSubmit = (values: IFormValues) => {
    if (!values.override_body) {
      notifications.showNotification({
        title: "Missing input",
        color: "red",
        message: "Please provide a value.",
      });

      return;
    }

    // if (!info?.path) {
    //   notifications.showNotification({
    //     title: "Missing path",
    //     color: "red",
    //     message: "No path provided.",
    //   });

    //   return;
    // }

    try {
      // commit the override to `msw`
      // onSubmit({
      //   body: JSON.parse(body),
      //   once,
      //   path: info.path,
      //   method: info.method.toLowerCase(),
      // });

      // also save it to state for the UI to use it
      // setRuntimeOverride(info.path, once, body);

      window.opener.postMessage({ source: "window-child", values }, "*");

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
  };

  return (
    <div className="mock-manager">
      <PageBody>
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
                {stripBasePath("info?.path")}
              </Code>
            </>
          }
        />

        <Paper shadow="xs" withBorder mb={40}>
          <Group noWrap>
            <Group sx={(t) => ({ padding: t.spacing.lg })}>
              <Text size={"xs"} transform={"uppercase"}>
                Method:
              </Text>
              <Badge color={"teal"} component={"span"}>
                {"info?.method"}
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
              <Code>{"info?.path"}</Code>
            </Group>
          </Group>
        </Paper>

        <Divider color={theme.colors.dark[4]} />

        <Accordion multiple initialItem={0}>
          <Accordion.Item label="Override this mock">
            <Box component={"section"} pb={20} pt={10}>
              <Text mb={40} size={"sm"}>
                Enter a value in the following field to override the mocked
                response served by the service worker. The field accepts JSON,
                and will validate & format your input. The override can run just
                once, (then the previous response will be in effect), or
                permanently.
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
                      : `Insert runtime response override for the path: "${"info?.path"}"...`
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
          </Accordion.Item>

          <Accordion.Item label="Overrides">
            {/* {itemOverrides?.length ? (
                    <>
                      <Box component={"section"} pb={20} pt={10}>
                        {itemOverrides.map((o, i, arr) => {
                          const content = (
                            <Code
                              block
                              key={i}
                              mb={i !== arr.length - 1 ? 16 : 0}
                            >
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

                          return <Fragment key={i}>{content}</Fragment>;
                        })}
                      </Box>

                      <Box component={"section"} py={20}>
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
                  ) : (
                    "There are no overrides."
                  )} */}
          </Accordion.Item>
        </Accordion>
      </PageBody>
    </div>
  );
};

export const MockManager: FC<IProps> = ({ worker }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(DEFAULT_THEME);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider
          position="top-right"
          limit={3}
          autoClose={4000}
          zIndex={999}
        >
          <MockManagerView worker={worker} />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
