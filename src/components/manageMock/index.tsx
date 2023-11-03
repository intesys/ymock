import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { mock } from "../../lib/mock";
import { passthroughResponseHandler } from "../../lib/responseHandlers/passthroughResponseHandler";
import { MSWContext } from "../MSWContext";
import { MainParams } from "../Main";
import { Welcome } from "../Welcome";
import { Checkbox } from "../form/Checkbox";
import { MockForm } from "./MockForm";

export const ManageMock: React.FC = () => {
  const { method, "*": path } = useParams<MainParams>();
  const { worker } = useContext(MSWContext);
  const [passthrough, setPassthrough] = useState(false);

  useEffect(() => {
    if (passthrough) {
      // passwthrough
      mock(worker)(method, path)(passthroughResponseHandler)({});
    }
  }, [passthrough]);

  if (!method || !path) {
    console.warn("Invalid route: even method and path must be set");
    return <Welcome />;
  }

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
            name="passthrough"
            label="Passthrough"
            defaultChecked={passthrough}
            onChange={setPassthrough}
          />
        </div>
        {!passthrough && <MockForm {...{ method, path }} />}
      </div>
    </div>
  );
};
