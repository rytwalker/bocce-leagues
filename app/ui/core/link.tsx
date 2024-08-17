import { ButtonOrLink, Props as ButtonOrLinkProps } from "./button-or-link";
import { cva, VariantProps } from "class-variance-authority";

const linkStyles = cva(
  "underline font-medium focus:outline-none hover:text-opacity-80 focus:ring-2 focus:ring-gray-500",
  {
    variants: {
      intent: {
        primary: "text-patina-400",
        gray: "text-gray-900",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  },
);

export interface Props
  extends ButtonOrLinkProps,
    VariantProps<typeof linkStyles> {}

export function Link(props: Props) {
  return (
    <ButtonOrLink
      className={`${linkStyles({ intent: props.intent })}`}
      {...props}
    />
  );
}
