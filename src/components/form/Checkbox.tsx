import { IconCheck, IconSquare, IconSquareCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";

type Checkbox = {
  name: string;
  defaultChecked?: boolean;
  label?: string;
  onChange?: (value: boolean) => void;
};

export const Checkbox: React.FC<Checkbox> = ({
  name,
  defaultChecked = false,
  label,
  onChange,
}) => {
  if (!label) {
    label = name;
  }

  const [value, setValue] = useState<boolean>(defaultChecked);

  const toggle = () => setValue((v) => !v);

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
  }, [value]);

  const checkedClass = value ? "checked" : "";

  return (
    <div onClick={toggle} className={`input-checkbox ${checkedClass}`}>
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        checked={value}
        onChange={toggle}
        style={{ display: "none" }}
      />
      {value ? <IconCheck /> : <IconSquare />}
      <label htmlFor={name}>{value ? "Mock enabled" : "Mock disabled"}</label>
    </div>
  );
};
