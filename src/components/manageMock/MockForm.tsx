import { useContext, useMemo, useState } from "react";
import { mock } from "../../lib/mock";
import { MSWContext } from "../MSWContext";
import { MainParams } from "../Main";
import { Form } from "../form/Form";
import { JsonInput } from "../form/JsonInput";
import { PlainTextInput } from "../form/PlainTextInput";

const responseTypes = ["json", "text"];

type ResponseTypes = (typeof responseTypes)[number];

const renderResponseInput = (type: ResponseTypes) => {
  switch (type) {
    case "text":
      return <PlainTextInput />;
    case "json":
    default:
      return <JsonInput />;
  }
};

export const MockForm: React.FC<MainParams> = ({ method, path }) => {
  const { worker } = useContext(MSWContext);
  const [responseType, setResponseType] = useState<ResponseTypes>("json");

  const setResponse = useMemo(
    () => mock(worker)(method, path),
    [worker, method, path]
  );

  const handleResponseType: React.ChangeEventHandler<HTMLSelectElement> = (e) =>
    setResponseType(e.target.value);

  return (
    <Form onSubmit={setResponse()}>
      <div className="input">
        <label htmlFor="responseType">Response type</label>
        <select name="responseType" onChange={handleResponseType}>
          {responseTypes.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="input">
        <label>Body</label>
        {renderResponseInput(responseType)}
      </div>
      <button type="submit" className="primary">
        Set response
      </button>
    </Form>
  );
};
