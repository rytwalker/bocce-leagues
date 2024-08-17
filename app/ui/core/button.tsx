import { cva, VariantProps } from "class-variance-authority";
import { ButtonOrLink, Props as ButtonOrLinkProps } from "./button-or-link";

const buttonStyles = cva(
  "flex items-center justify-center px-4 py-2 rounded font-medium text-3xl focus:outline-none focus:ring-2 focus:ring-offset-white dark:focus:ring-offset-black focus:ring-offset-1 disabled:opacity-60 disabled:pointer-events-none hover:bg-opacity-80 shadow-md",
  {
    variants: {
      intent: {
        primary: "bg-pantina-400 text-white",
        secondary:
          "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 focus:ring-gray-500",
        transparent:
          "border-off-white-primary border-solid border-2 rounded-xl",
        danger: "bg-red-500 text-white focus:ring-red-500",
        link: "px-0 py-0 text-gray-900 text-sm shadow-none",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  },
);

export interface Props
  extends ButtonOrLinkProps,
    VariantProps<typeof buttonStyles> {}

export function Button({ intent, fullWidth, ...props }: Props) {
  return (
    <ButtonOrLink className={buttonStyles({ intent, fullWidth })} {...props} />
  );
}
