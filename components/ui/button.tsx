import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "option";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  isActive?: boolean;
};

export function Button({
  children,
  className = "",
  isActive = false,
  variant = "primary",
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "primary" ? "primary-button" : "option-button";
  const activeClass = isActive ? " is-active" : "";

  return (
    <button
      className={`${variantClass}${activeClass}${className ? ` ${className}` : ""}`}
      data-active={isActive}
      {...props}
    >
      {children}
    </button>
  );
}
