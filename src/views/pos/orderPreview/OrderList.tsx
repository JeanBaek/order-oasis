import { useCouponContext, useOrderContext } from "../Providers";
import Order from "./Order";
import Coupon from "./Coupon";

export type Props = {
  hideButton?: boolean;
};
export default function OrderList(props: Props) {
  const { orders } = useOrderContext();
  const { appliedCoupons } = useCouponContext();

  return (
    <div className="scroll-content">
      <ul className="divide-y">
        {orders
          .sort((a, b) => a.orderTimestamp - b.orderTimestamp)
          .map((o, i) => (
            <Order key={i} {...o} hideButton={props.hideButton} />
          ))}
        {appliedCoupons
          .filter(({ checked }) => checked)
          .map((c, i) => (
            <Coupon key={i} {...c} hideButton={props.hideButton} />
          ))}
      </ul>
    </div>
  );
}
