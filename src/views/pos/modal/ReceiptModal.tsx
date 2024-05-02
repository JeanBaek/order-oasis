import { MouseEvent, useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import { cva } from "class-variance-authority";
import {
  useOrderContext,
  useCouponContext,
  useReceiptModalProps,
} from "../Providers";
import {
  getPriceDesc,
  getTotalDiscount,
  getTotalPayment,
  getTotalPrice,
} from "../../../helper/price";
import OrderList from "../orderPreview/OrderList";
import { PaymentMethod } from "../../../store/order/type";
import { PAYMENT_METHODS } from "../../../store/order/constant";

export default function ReceiptModal() {
  const props = useReceiptModalProps();
  const { isOpen, title, submitDesc, submit, close } = props();

  const { orders, initiatePayment } = useOrderContext();
  const { appliedCoupons } = useCouponContext();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null,
  );

  useEffect(() => {
    if (!isOpen) clearState();
  }, [isOpen]);

  const paymentMethodBtnStyle = cva(
    [
      "inline-flex items-center justify-center w-20 h-20",
      "rounded-lg cursor-pointer border shadow-md",
      "hover:bg-gray-200 active:bg-gray-300",
    ],
    { variants: { selected: { true: "ring ring-blue-500" } } },
  );

  function clearState() {
    setPaymentMethod(null);
  }

  function handlePaymentMethod(pm: PaymentMethod) {
    setPaymentMethod(pm);
  }

  function handleSubmit(event: MouseEvent) {
    event.preventDefault();

    if (paymentMethod) {
      initiatePayment(paymentMethod);
      setTimeout(() => submit(), 1300);
    }
  }

  return (
    <Modal
      dismissible
      show={isOpen}
      onClose={close}
      size="md"
      className="bg-gray-500 bg-opacity-40"
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body className="divide-y-[2px] divide-dashed divide-gray-300 p-0 min-h-[320px]">
        <OrderList hideButton={true} />
        <article className="flex flex-col gap-1 w-full my-8 px-4 py-8">
          <div className="flex w-full justify-between">
            <h6 className="w-3/6 font-bold">주문 금액</h6>
            <p className="w-4/12 font-extrabold text-right ">
              {getPriceDesc(getTotalPrice(orders))}
            </p>
          </div>
          <div className="flex w-full justify-between">
            <h6 className="w-3/6 font-bold">할인 금액</h6>
            <p className="w-4/12 font-extrabold text-right ">
              {getPriceDesc(getTotalDiscount(orders, appliedCoupons))}
            </p>
          </div>
          <div className="flex w-full justify-between text-xl mt-1">
            <h6 className="w-3/6 font-bold">총 결제금액</h6>
            <p className="w-4/12 font-extrabold text-right ">
              {getPriceDesc(getTotalPayment(orders, appliedCoupons))}
            </p>
          </div>
          <div className="flex w-full justify-between mt-4">
            <h6 className="font-bold text-lg">결제 방법</h6>
            <div className="grid grid-cols-3 gap-4 font-extrabold text-right">
              {PAYMENT_METHODS.map((pm, i) => (
                <button
                  key={`payment-button${i + 1}`}
                  className={paymentMethodBtnStyle({
                    selected: pm === paymentMethod,
                  })}
                  onClick={() => handlePaymentMethod(pm)}
                >
                  {pm}
                </button>
              ))}
            </div>
          </div>
        </article>
      </Modal.Body>
      <Modal.Footer className="p-0">
        <Button
          onClick={handleSubmit}
          fullSized={true}
          disabled={!paymentMethod}
          size="lg"
          className="p-2 text-xl font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring-0 rounded-t-none"
        >
          {submitDesc}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
