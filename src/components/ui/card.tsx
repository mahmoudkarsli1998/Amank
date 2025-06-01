import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // Apply glass-card class here, removing conflicting Tailwind classes
    // Keep text-slate-50 for now, may need adjustment later
    className={cn(
      "glass-card text-slate-50", // Replaced border, bg-white/5, shadow-sm, rounded-lg with glass-card
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

// CardHeader, CardTitle, CardDescription, CardContent, CardFooter remain unchanged
// as they handle internal padding and typography, not the card's outer shell.

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement, // Changed from HTMLDivElement based on typical usage
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3 // Changed from div to h3 for semantic correctness
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-tight tracking-[-0.025em] font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement, // Changed from HTMLDivElement based on typical usage
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p // Changed from div to p for semantic correctness
    ref={ref}
    className={cn("text-sm font-normal leading-relaxed text-slate-300-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
