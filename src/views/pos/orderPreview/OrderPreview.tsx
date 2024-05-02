import { useEffect } from "react";
import { getPriceDesc, getRateDesc } from "../../../helper/price";
import Button from "../../../components/Button";
import OrderList from "./OrderList";
import PayButton from "./PayButton";
import {
  useCouponContext,
  useCouponController,
  useOrderContext,
  usePosContext,
} from "../Providers";
import { Props as ModalProps } from "../../../components/SelectModal";
import { Coupon } from "../../../store/pos/type";

export default function OrderPreview() {
  const { coupons: orgCoupons } = usePosContext();
  const { orders } = useOrderContext();
  const { everyCoupons, applyCoupons } = useCouponContext();
  const { openModal, closeModal } = useCouponController();

  useEffect(() => {
    applyCoupons(orgCoupons);
  }, [orgCoupons]);

  return (
    <section className="flex flex-col w-1/3 border-l">
      <header className="flex justify-between p-2 text-xl font-bold">
        <h2 className="p-2">목록</h2>
        <Button
          hide={!orgCoupons?.length || !orders.length}
          content={
            <p className="inline-flex items-center justify-center p-1 text-base font-semibold">
              할인 쿠폰
            </p>
          }
          onClick={() => {
            const modalOption = everyCoupons.map((o) => ({
              ...o,
              desc:
                o.type === "amount"
                  ? getPriceDesc(o.price)
                  : getRateDesc(o.price),
            }));
            const submit = (option: ModalProps["option"]) => {
              applyCoupons(
                option.map((o) => ({
                  id: o.id,
                  checked: o.checked,
                  name: o.name as Coupon["name"],
                  type: o.type as Coupon["type"],
                  price: o.price,
                  categoryIds: o.categoryIds,
                })),
              );

              closeModal();
            };

            openModal(modalOption, submit);
          }}
        />
      </header>
      <OrderList />
      <PayButton />
    </section>
  );
}
