import { useContext } from "react";
import { useParams } from "react-router";
import { MSWContext } from "./MSWContext";
import { rest } from "msw";
import { useForm } from "@mantine/form";
import { Button, JsonInput, Stack } from "@mantine/core";

type Method = "all" | "post" | "get" | "put" | "patch" | "options" | "delete";

export const ConfigureResponse: React.FC = () => {
  const { method, "*": path } = useParams();
  const { worker } = useContext(MSWContext);
  const form = useForm({
    initialValues: {
      response: "",
    },
  });

  const setResponse = (data) => {
    console.table({ method, data });
    const _method = method?.toLowerCase() || "get";
    worker.use(
      rest[_method](`/${path}`, (req, res, ctx) => {
        return res(ctx.json(data.response));
      })
    );
  };

  return (
    <>
      <div style={{ width: "100%", border: "1px solid #f00" }}>
        {method} {path}
      </div>
      <form onSubmit={form.onSubmit(setResponse)}>
        <Stack>
          <JsonInput
            unstyled
            label="Response (json)"
            placeholder="{}"
            autosize
            minRows={10}
            style={{ width: "100%" }}
            {...form.getInputProps("response")}
          />
          <Button unstyled type="submit">
            Set response
          </Button>
        </Stack>
      </form>
    </>
  );
};
