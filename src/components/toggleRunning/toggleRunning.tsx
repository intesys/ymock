import {
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
} from "@tabler/icons-react";
import { useContext, useState } from "react";
import { MSWContext } from "../MSWContext";

type WithActionProp = {
  action: () => void;
};

export const Running: React.FC<WithActionProp> = ({ action }) => {
  return (
    <div className="toggle-running running">
      <label>Running</label>
      <button title="Stop mocking" onClick={action}>
        <IconPlayerStopFilled />
      </button>
    </div>
  );
};

export const Stopped: React.FC<WithActionProp> = ({ action }) => {
  return (
    <div className="toggle-running stopped">
      <label>Stopped</label>
      <button title="Start mocking" onClick={action}>
        <IconPlayerPlayFilled />
      </button>
    </div>
  );
};

export const useToggleRunning = (): [boolean, () => void] => {
  const { worker } = useContext(MSWContext);
  const [running, setRunning] = useState(true);
  const toggleRunning = () => {
    if (running) {
      worker.stop();
    } else {
      worker.start();
    }
    setRunning(!running);
  };
  return [running, toggleRunning];
};
