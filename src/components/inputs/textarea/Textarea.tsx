import React, { forwardRef, type ForwardRefRenderFunction } from "react";

import { cn } from "@/utils/cn";

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  helper?: string | React.ReactNode;
  error?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
}

const TextAreaComponent: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  InputProps
> = (
  { className, label, placeholder, id, name, helper, error, ...props },
  ref
) => {
  return (
    <div>
      <label htmlFor={id} aria-label={label}>
        {label}
        <textarea
          {...props}
          className={cn(
            "p-4 w-full text-black",
            "border-2 border-light-4",
            className
          )}
          id={id ?? name}
          name={name}
          placeholder={placeholder || label}
          ref={ref}
        />
      </label>
      {!!helper && helper}
      <div>
        {error && (
          <p key={error} className="text-red-500 text-xs">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export const Textarea = forwardRef(TextAreaComponent);
