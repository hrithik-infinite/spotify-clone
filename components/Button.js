import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Button = forwardRef(({ className, children, disabled, type = "button", ...props }, ref) => {
  return React.createElement(
    "button",
    {
      type: type,
      className: twMerge(
        `
        w-full 
        rounded-full 
        bg-green-500
        border
        border-transparent
        px-3 
        py-3 
        disabled:cursor-not-allowed 
        disabled:opacity-50
        text-black
        font-bold
        hover:opacity-75
        transition
      `,
        disabled && "opacity-75 cursor-not-allowed",
        className
      ),
      disabled: disabled,
      ref: ref,
      ...props,
    },
    children
  );
});

Button.displayName = "Button";

export default Button;
