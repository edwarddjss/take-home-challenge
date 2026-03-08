import type { ReactNode } from "react";

type FieldLabelProps = {
  children: ReactNode;
  htmlFor?: string;
};

export function FieldLabel({ children, htmlFor }: FieldLabelProps) {
  return (
    <label className="field-label" htmlFor={htmlFor}>
      {children}
    </label>
  );
}
