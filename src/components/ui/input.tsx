import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        // Apply glass-input class, remove conflicting Tailwind classes
        className={cn(
          "glass-input", // Replaced border, bg-slate-900/20/10, rounded-md, focus-visible rings
          "flex h-10 w-full px-3 py-2 text-base font-normal leading-relaxed tracking-[0.01em] ring-offset-background file:border-0 file:bg-transparent file:text-sm font-normal leading-relaxed file:font-medium file:text-slate-100 placeholder:text-slate-300-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm font-normal leading-relaxed", // Kept layout, sizing, text, placeholder, file, disabled styles
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
