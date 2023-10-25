import { rest } from "msw";
import { useContext } from "react";
import { useParams } from "react-router";
import { MSWContext } from "./MSWContext";
import { Form, FormValues } from "./form/Form";

type Method = "all" | "post" | "get" | "put" | "patch" | "options" | "delete";

type Params = {
  method: Method;
} & Record<string, string>;

export const ConfigureResponse: React.FC = () => {
  const { method, "*": path } = useParams<Params>();
  const { worker } = useContext(MSWContext);

  const setResponse = (data: FormValues) => {
    const _method: Method = (method?.toLowerCase() as Method) ?? "get";

    worker.use(
      rest[_method](`/${path}`, (req, res, ctx) => {
        return res(ctx.json(data.body));
      })
    );
  };

  return (
    <div className="configure-response" key={`${method}${path}`}>
      <div className="title">Request info</div>
      <div className="request-info">
        <div className="method">{method}</div>
        <div className="path">/{path}</div>
      </div>
      <div className="configure-form">
        <Form onSubmit={setResponse}>
          <div className="input">
            <label>Response type</label>
            <select name="responseType">
              <option value="application/json">application/json</option>
              <option value="text/html">text/html</option>
              <option value="text/css">text/css</option>
              <option value="custom">Other</option>
            </select>
          </div>
          <div className="input">
            <label>Body</label>
            <textarea name="body" placeholder="{}" />
          </div>
          <button type="submit" className="primary">
            Set response
          </button>
        </Form>
      </div>
    </div>
  );
};
