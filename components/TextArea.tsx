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
  isSwapped?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ variant, value, onChange, placeholder, readOnly = false, className, isSwapped = false, ...props }, ref) => {
    const isInput = variant === "input";
    
    // Determine direction and font based on variant and swap state
    const shouldBeRtl = isSwapped ? !isInput : isInput;
    const shouldUseArabicFont = isSwapped ? !isInput : isInput;
    
    return (
      <TextareaAutosize
        ref={ref}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        dir={shouldBeRtl ? "rtl" : "ltr"}
        className={cn(
          // Base styles
          "w-full p-4 text-xl leading-relaxed resize-none rounded-2xl shadow-inner border border-neutral-200 transition-colors",
          "focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none",
          // Variant-specific styles
          isInput
            ? "bg-white/80 backdrop-blur"
            : "bg-neutral-50 cursor-text",
          // Text direction and font styles
          shouldBeRtl ? "text-right" : "text-left",
          shouldUseArabicFont ? "font-arabic" : "font-sans",
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