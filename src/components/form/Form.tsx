import React, {
  FormEventHandler,
  PropsWithChildren,
  useCallback,
  useRef,
} from "react";

export interface FormValues extends Record<string, any> {}

type Form = {
  onSubmit: (data: FormValues) => void;
};

export const Form: React.FC<Form & PropsWithChildren> = ({
  children,
  onSubmit,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();
      const data: Record<string, any> = {};
      const formData = new FormData(formRef.current as HTMLFormElement);
      for (const [key, value] of formData) {
        data[key] = value;
      }
      onSubmit(data);
    },
    [onSubmit, formRef]
  );

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      {children}
    </form>
  );
};
