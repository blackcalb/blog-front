import { cn } from "@/utils/cn";
import { cloneElement, createElement, ReactElement, ReactNode } from "react";

type TyphographyProps = {
  children: ReactNode;
  className?: string;
  element?: ReactElement;
  kind?: "p" | "h1" | "span";
};

const styles = {
  "text-h1": "text-3xl font-bold",
};

export function Typhography(props: Readonly<TyphographyProps>) {
  const { children, className, element: el, kind = "p", ...otherProps } = props;

  const element = el ?? createElement(kind);
  const computedClassName = cn(
    className,
    kind === "h1" && styles["text-h1"],
    el?.props.classname
  );

  const newProps = {
    className: computedClassName,
    ...otherProps,
  };

  return cloneElement(element, newProps, children);
}
