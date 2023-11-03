import { MutableRefObject, forwardRef, useRef } from "react";

export const ResizableTextarea = forwardRef<
  HTMLTextAreaElement,
  Partial<HTMLTextAreaElement>
>((props, ref) => {
  const internalRef = useRef<HTMLTextAreaElement>(ref?.current);
  const resizeTextArea = () => {
    if (!internalRef?.current) {
      return;
    }
    internalRef.current.style.height = "auto";
    internalRef.current.style.height = internalRef.current?.scrollHeight + "px";
  };

  const onInput: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    props?.onInput && props.onInput(e);
    props?.onChange && props.onChange(e);
    resizeTextArea();
  };

  return <textarea {...props} onInput={onInput} ref={internalRef} />;
});
