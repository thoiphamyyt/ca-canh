import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        primary:
          "bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400",
        success:
          "bg-green-50 text-green-600 dark:bg-green-500/15 dark:text-green-500",
        error:
          "bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-500",
        warning:
          "bg-yellow-50 text-yellow-600 dark:bg-yellow-500/15 dark:text-orange-400",
        info: "bg-blue-light-50 text-blue-light-500 dark:bg-blue-light-500/15 dark:text-blue-light-500",
        light: "bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-white/80",
        dark: "bg-gray-500 text-white dark:bg-white/5 dark:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
