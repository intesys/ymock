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
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) {
      // passwthrough
      mock(worker)(method, path)(passthroughResponseHandler)({});
    }
  }, [enabled]);

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
            name="enabled"
            label="Enable"
            defaultChecked={enabled}
            onChange={setEnabled}
          />
        </div>
        {enabled && <MockForm {...{ method, path }} />}
      </div>
    </div>
  );
};
