import { useContext, useMemo } from "react";
import { mock } from "../../lib/mock";
import { MSWContext } from "../MSWContext";
import { MainParams } from "../Main";
import { Form } from "../form/Form";
import { JsonInput } from "../form/JsonInput";

export const MockForm: React.FC<MainParams> = ({ method, path }) => {
  const { worker } = useContext(MSWContext);

  const setResponse = useMemo(
    () => mock(worker)(method, path),
    [worker, method, path]
  );

  return (
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
  );
};
