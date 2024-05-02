import {
  useCouponContext,
  useOrderContext,
  usePosContext,
  useReceiptController,
} from "../Providers";
import { getPriceDesc, getTotalPayment } from "../../../helper/price";
import { getTotalOrderQuantity } from "../../../helper/order";

export default function PayButton() {
  const { coupons: orgCoupons } = usePosContext();
  const { orders, clearOrders, completePayment } = useOrderContext();
  const { appliedCoupons, clearCoupons } = useCouponContext();
  const { openModal, closeModal } = useReceiptController();

  function clickHandler() {
    const submit = () => {
      clearOrders();
      clearCoupons(orgCoupons);
      completePayment();
      closeModal();
    };

    openModal([], submit);
  }

  return (
    <button
      className="inline-flex justify-center items-center w-full p-4 text-xl font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 disabled:pointer-events-none"
      onClick={clickHandler}
      disabled={!orders.length}
    >
      {getTotalOrderQuantity(orders)}개 결제&nbsp;
      {getPriceDesc(getTotalPayment(orders, appliedCoupons))}
    </button>
  );
}
