import React from "react";

import { cn } from "@/utils/cn";

export interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: NonNullable<React.ButtonHTMLAttributes<HTMLButtonElement>["type"]>;
  children?: React.ReactNode;
  className?: string;
}
export const Button = ({
  type,
  children,
  className,
  ...props
}: Readonly<BaseButtonProps>) => {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        "inline-block",
        "rounded-md",
        "py-2 px-4",
        "bg-teal-500",
        "border-2 border-solid border-teal-700",
        `hover:bg-teal-600 hover:border-teal-600`,
        `active:bg-teal-400 active:border-teal-400`,
        className
      )}
    >
      {children}
    </button>
  );
};
