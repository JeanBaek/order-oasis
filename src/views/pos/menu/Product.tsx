import { MouseEventHandler } from "react";
import { cva } from "class-variance-authority";
import { getPriceDesc } from "../../../helper/price";

type Props = {
  name: string;
  price: number;
  hasOption?: boolean;
  color?: "default" | "orange" | "green" | "blue" | "purple";
  clickHandler: MouseEventHandler;
};

export default function Product(props: Props) {
  const { name, price, hasOption, color = "default", clickHandler } = props;

  const style = cva(
    [
      "flex flex-col items-center justify-center p-2 gap-1",
      "w-full h-full rounded-lg overflow-hidden shadow-md cursor-pointer",
      "hover:bg-gray-200 active:bg-gray-300",
    ],
    {
      variants: {
        color: {
          default: "bg-white",
          orange: "bg-orange-200",
          green: "bg-lime-200",
          blue: "bg-cyan-200",
          purple: "bg-fuchsia-200",
        },
      },
    },
  );

  return (
    <article className={style({ color })} onClick={clickHandler}>
      <h5 className="h-2/3 inline-flex items-center text-lg font-bold tracking-tight text-gray-900 text-center break-words whitespace-pre-wrap">
        {name.replace(/ /g, "\n")}
      </h5>
      <span className="h-1/3 inline-flex text-gray-600 justify-center items-center">
        {getPriceDesc(price)}
        {hasOption ? " ~" : ""}
      </span>
    </article>
  );
}
