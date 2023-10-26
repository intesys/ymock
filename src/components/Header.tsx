import { IconRestore } from "@tabler/icons-react";
import {
  Running,
  Stopped,
  useToggleRunning,
} from "./toggleRunning/toggleRunning";
import { useContext } from "react";
import { MSWContext } from "./MSWContext";

export const Header: React.FC = () => {
  const [running, toggleRunning] = useToggleRunning();
  const { worker } = useContext(MSWContext);
  const restore = () => {
    worker.resetHandlers();
  };

  return (
    <div className="header">
      <div className="title">yMock dashboard</div>
      <div className="tools">
        {running ? (
          <Running action={toggleRunning} />
        ) : (
          <Stopped action={toggleRunning} />
        )}
      </div>
      <div className="tools">
        <button title="Restore initial mocks" onClick={restore}>
          <IconRestore />
        </button>
      </div>
    </div>
  );
};
