import { IconChecks } from "@tabler/icons-react";
import { ChangeEventHandler, useRef, useState } from "react";
import { ResizableTextarea } from "./ResizableTextarea";

export const JsonInput: React.FC = () => {
  const [body, setBody] = useState("{}");
  const [error, setError] = useState<string | undefined>();
  const [verified, setVerified] = useState(false);
  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setBody(e.target.value);
    setError(undefined);
    setVerified(false);
  };

  const formatJson = () => {
    setVerified(true);
    try {
      JSON.parse(body);
    } catch (e) {
      console.warn(e);
      // @ts-ignore
      setError(e.message);
    }
  };

  const isError = () => {
    if (!verified) {
      return "";
    }
    return error ? "has-errors" : "no-errors";
  };

  return (
    <div className={`input-json ${isError()}`}>
      <ResizableTextarea
        name="body"
        placeholder="{}"
        value={body}
        onInput={handleChange}
        ref={textarea}
      />
      {error ? <div className="error">{error}</div> : null}
      <button onClick={formatJson} className="icon format">
        <IconChecks />
      </button>
    </div>
  );
};
