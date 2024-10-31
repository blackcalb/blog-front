import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface WrapperContentProps {
  children: ReactNode;
  className?: string;
}

export function WrapperContent({
  children,
  className,
}: Readonly<WrapperContentProps>) {
  return (
    <div className={cn("max-w-lg mx-auto pt-8", className)}>{children}</div>
  );
}
