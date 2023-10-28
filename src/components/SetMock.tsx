import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { mock } from "../lib/mock";
import { Method } from "../types/method";
import { MSWContext } from "./MSWContext";
import { Form } from "./form/Form";
import { JsonInput } from "./form/JsonInput";
import { Checkbox } from "./form/Checkbox";

type Params = {
  method: Method;
} & Record<string, string>;

export const SetMock: React.FC = () => {
  const { method, "*": path } = useParams<Params>();
  const { worker } = useContext(MSWContext);
  const [enabled, setEnabled] = useState(true);

  const setResponse = mock(worker)(method, path);

  useEffect(() => {
    if (!enabled) {
      // passwthrough
    }
  }, [enabled]);

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
            <Checkbox
              name="enabled"
              label="Enable"
              defaultChecked={enabled}
              onChange={setEnabled}
            />
          </div>
          {enabled && (
            <>
              <div className="input">
                <label htmlFor="responseType">Response type</label>
                <select name="responseType">
                  <option value="json">json</option>
                  <option value="text">plain text</option>
                  <option value="xml">xml</option>
                  <option value="formData">form data</option>
                  <option value="redirect">redirect</option>
                </select>
              </div>
              <div className="input">
                <label>Body</label>
                <JsonInput />
              </div>
              <button type="submit" className="primary">
                Set response
              </button>
            </>
          )}
        </Form>
      </div>
    </div>
  );
};
