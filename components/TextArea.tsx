"use client";

import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { cn } from "@/lib/utils";

interface TextAreaProps {
  variant: "input" | "output";
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ variant, value, onChange, placeholder, readOnly = false, className, ...props }, ref) => {
    const isInput = variant === "input";
    
    return (
      <TextareaAutosize
        ref={ref}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        dir={isInput ? "rtl" : "ltr"}
        className={cn(
          // Base styles
          "w-full p-4 text-xl leading-relaxed resize-none rounded-2xl shadow-inner border border-neutral-200 transition-colors",
          "focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none",
          // Variant-specific styles
          isInput
            ? "bg-white/80 backdrop-blur text-right font-arabic"
            : "bg-neutral-50 cursor-text font-sans text-left",
          // Disabled/readonly styles
          readOnly && "disabled:opacity-70 disabled:cursor-default",
          className
        )}
        minRows={3}
        maxRows={10}
        {...props}
      />
    );
  }
);

TextArea.displayName = "TextArea";