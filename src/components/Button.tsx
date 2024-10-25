import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../libr/utils"
import '../sass/Button.scss'

const buttonVariants = cva("button", {
  variants: {
    variant: {
      default: "button--default",
      destructive: "button--destructive",
      outline: "button--outline",
      secondary: "button--secondary",
      ghost: "button--ghost",
      link: "button--link",
    },
    size: {
      default: "button--default-size",
      sm: "button--sm",
      lg: "button--lg",
      icon: "button--icon",
    },
    mode: {
      dark: "button--dark-mode",
      light: "button--light-mode",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    mode: "dark",
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isDarkMode?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isDarkMode = true, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, mode: isDarkMode ? "dark" : "light", className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }