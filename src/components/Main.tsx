import { useParams } from "react-router-dom";
import { ManageMock } from "./manageMock/index";
import { Method } from "../types/method";

export type Params = {
  method: Method;
} & Record<string, string>;

export const Main: React.FC = () => {
  const { method, "*": path } = useParams<Params>();

  return <ManageMock key={`${method}${path}`} />;
};
