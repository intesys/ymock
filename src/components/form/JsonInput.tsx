import { IconChecks } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

export const JsonInput: React.FC = () => {
  const [body, setBody] = useState("{}");
  const [error, setError] = useState<string | undefined>();
  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    setError(undefined);
  };

  const formatJson = () => {
    try {
      setError(undefined);
      const parsed = JSON.parse(body);
      const formattedValue = JSON.stringify(parsed, undefined, 2);
      setBody(formattedValue);
    } catch (e) {
      console.warn(e);
      // @ts-ignore
      setError(e.message);
    }
  };

  const resizeTextArea = () => {
    if (!textarea.current) {
      return;
    }
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current?.scrollHeight + "px";
  };

  useEffect(() => {
    resizeTextArea();
  }, [body]);

  return (
    <div className="input-json">
      <textarea
        name="body"
        placeholder="{}"
        value={body}
        onChange={handleChange}
        ref={textarea}
      />
      {error ? <div className="error">{error}</div> : null}
      <button onClick={formatJson} className="icon format">
        <IconChecks />
      </button>
    </div>
  );
};
