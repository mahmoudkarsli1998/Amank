import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base styles for all buttons - removed rounded-md and transition-colors as glass classes handle these
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-normal leading-relaxed font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Apply glass styles to relevant variants
        default: "glass-btn-primary", // Use primary glass button style
        destructive:
          "bg-red-500/20/20 text-rose-400-foreground hover:bg-red-500/20/20/90 rounded-md", // Keep original, add back rounded-md
        outline:
          "glass-btn", // Use default glass button style
        secondary:
          "glass-btn-secondary", // Use secondary glass button style
        ghost: "hover:bg-indigo-500/30/15 hover:text-violet-300 transition-colors duration-200-foreground rounded-md", // Keep original, add back rounded-md
        link: "text-violet-400 underline-offset-4 hover:underline", // Keep original link style
      },
      size: {
        // Size variants remain the same, controlling height and padding
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3", // Glass buttons have 8px radius, sm has rounded-md (6px). Keep sm specific radius for now.
        lg: "h-11 px-8", // Glass buttons have 8px radius, lg has rounded-md (6px). Keep lg specific radius for now.
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
