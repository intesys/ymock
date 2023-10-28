import { useContext } from "react";
import { useParams } from "react-router";
import { mock } from "../lib/mock";
import { Method } from "../types/method";
import { MSWContext } from "./MSWContext";
import { Form } from "./form/Form";

type Params = {
  method: Method;
} & Record<string, string>;

export const SetMock: React.FC = () => {
  const { method, "*": path } = useParams<Params>();
  const { worker } = useContext(MSWContext);

  const setResponse = mock(worker)(method, path);

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
              <option value="json">json</option>
              <option value="redirect">redirect</option>
              <option value="text">text</option>
              <option value="xml">xml</option>
              <option value="formData">form data</option>
              <option value="arrayBuffer">array buffer</option>
              <option value="error">network error</option>
              <option value="other">Other</option>
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
