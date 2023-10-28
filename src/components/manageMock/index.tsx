import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { mock } from "../../lib/mock";
import { passthroughResponseHandler } from "../../lib/responseHandlers/passthroughResponseHandler";
import { MSWContext } from "../MSWContext";
import { Params } from "../Main";
import { Checkbox } from "../form/Checkbox";
import { Form } from "../form/Form";
import { JsonInput } from "../form/JsonInput";

export const ManageMock: React.FC = () => {
  const { method, "*": path } = useParams<Params>();
  const { worker } = useContext(MSWContext);
  const [enabled, setEnabled] = useState(true);

  const setResponse = useMemo(
    () => mock(worker)(method, path),
    [worker, method, path]
  );

  useEffect(() => {
    if (!enabled) {
      // passwthrough
      mock(worker)(method, path)(passthroughResponseHandler)({});
    }
  }, [enabled]);

  return (
    <div className="manage-mock">
      <div className="title">Request info</div>
      <div className="request-info">
        <div className="method">{method}</div>
        <div className="path">/{path}</div>
      </div>
      <div className="configure-form">
        <div className="input">
          <Checkbox
            name="enabled"
            label="Enable"
            defaultChecked={enabled}
            onChange={setEnabled}
          />
        </div>
        {enabled && (
          <Form onSubmit={setResponse()}>
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
          </Form>
        )}
      </div>
    </div>
  );
};
