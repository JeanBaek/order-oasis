import { Coupon as CouponType } from "../../../store/pos/type";
import { getDiscountPrice, getPriceDesc } from "../../../helper/price";
import { useOrderContext, useCouponContext } from "../Providers";
import Button from "../../../components/Button";
import { Props as OrderListProps } from "./OrderList";

type Props = CouponType & OrderListProps;

export default function Coupon(props: Props) {
  const { orders } = useOrderContext();
  const { removeCoupon } = useCouponContext();

  return (
    <li className="flex flex-col w-full px-4 py-2">
      <div className="flex w-full justify-end">
        <Button
          hide={props.hideButton}
          content={
            <img
              src="/assets/icons/close.svg"
              alt="Close Icon"
              className="w-[20px] h-[20px] m-1"
            />
          }
          onClick={() => removeCoupon(props)}
        />
      </div>
      <div className="flex w-full justify-between">
        <h6 className="w-3/6 font-bold">{props.name}</h6>
        <p className="w-4/12 font-extrabold text-right text-blue-700">
          -&nbsp;
          {getPriceDesc(getDiscountPrice(orders, props))}
        </p>
      </div>
    </li>
  );
}
