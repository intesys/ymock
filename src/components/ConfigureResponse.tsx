import { rest } from "msw";
import { useContext } from "react";
import { useParams } from "react-router";
import { MSWContext } from "./MSWContext";
import { Form, FormValues } from "./form/Form";

type Method = "all" | "post" | "get" | "put" | "patch" | "options" | "delete";

export const ConfigureResponse: React.FC = () => {
  const { method, "*": path } = useParams();
  const { worker } = useContext(MSWContext);

  const setResponse = (data: FormValues) => {
    const _method = method?.toLowerCase() || "get";

    worker.use(
      rest[_method](`/${path}`, (req, res, ctx) => {
        return res(ctx.json(data.response));
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
            <label>Override response</label>
            <textarea name="response" placeholder="{}" />
          </div>
          <button type="submit" className="primary">
            Set response
          </button>
        </Form>
      </div>
    </div>
  );
};
