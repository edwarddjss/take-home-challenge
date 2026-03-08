import type { InputHTMLAttributes } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement>;

export function TextField({ className = "", ...props }: TextFieldProps) {
  return (
    <input
      className={`text-input${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
