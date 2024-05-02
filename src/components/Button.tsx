import { ReactNode, MouseEventHandler } from "react";
import { cva } from "class-variance-authority";

type Props = {
  content: ReactNode;
  onClick: MouseEventHandler;
  hide?: boolean;
};

export const buttonStyle = cva(
  [
    "p-1 rounded-lg",
    "hover:bg-gray-200 active:bg-gray-300",
    "disabled:pointer-events-none disabled:opacity-20",
  ],
  {
    variants: {
      hide: { true: "hidden" },
      border: { true: "border" },
    },
    defaultVariants: { border: true },
  },
);

export default function Button({ content, onClick, hide }: Props) {
  return (
    <button className={buttonStyle({ hide: !!hide })} onClick={onClick}>
      {content}
    </button>
  );
}
