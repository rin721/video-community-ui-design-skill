import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost";
};

export function Button({ children, variant = "primary", ...props }: ButtonProps) {
  return (
    <button className={`button button--${variant}`} type="button" {...props}>
      {children}
    </button>
  );
}
