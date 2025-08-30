import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-[#FF014F] text-white hover:bg-[#e60047] hover:shadow-xl",
        outline: "border-2 border-[#FF014F] text-[#FF014F] hover:bg-[#FF014F] hover:text-white",
        secondary: "bg-white text-[#FF014F] hover:bg-[#FF014F] hover:text-white hover:border-white hover:border-2",
        ghost: "text-black/70 hover:text-[#FF014F] transition-colors",
      },
      size: {
        default: "px-6 py-2.5 text-sm",
        sm: "px-4 py-2 text-sm",
        lg: "px-8 py-4 text-base",
        xl: "px-8 py-4 text-lg",
        icon: "w-9 h-9 p-0",
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
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
