import { PropsWithChildren } from "react";
import constate from "constate";
import usePos from "../../store/pos/usePos";
import useOrder from "../../store/order/useOrder";
import useCoupon from "../../store/pos/useCoupon";
import useModal from "../../store/modal/useModal";

export const [PosProvider, usePosContext] = constate(usePos);

export const [OrderProvider, useOrderContext] = constate(useOrder);

export const [CouponProvider, useCouponContext] = constate(useCoupon);

export const [
  OptionSelectModalProvider,
  useOptionSelectController,
  useOptionSelectModalProps,
] = constate(
  useModal,
  (value) => value.modalController,
  (value) => value.getModalProps,
);

export const [
  OptionChangeModalProvider,
  useOptionChangeController,
  useOptionChangeModalProps,
] = constate(
  useModal,
  (value) => value.modalController,
  (value) => value.getModalProps,
);

export const [CouponModalProvider, useCouponController, useCouponModalProps] =
  constate(
    useModal,
    (value) => value.modalController,
    (value) => value.getModalProps,
  );

export const [
  ReceiptModalProvider,
  useReceiptController,
  useReceiptModalProps,
] = constate(
  useModal,
  (value) => value.modalController,
  (value) => value.getModalProps,
);

export default function Providers({ children }: PropsWithChildren) {
  return (
    <PosProvider>
      <OrderProvider>
        <CouponProvider>
          <OptionSelectModalProvider modalType={"OptionSelectModal"}>
            <OptionChangeModalProvider
              modalType={"OptionChangeModal"}
              disableOnUnchanged
            >
              <CouponModalProvider modalType={"CouponModal"} disableOnUnchanged>
                <ReceiptModalProvider modalType={"ReceiptModal"}>
                  {children}
                </ReceiptModalProvider>
              </CouponModalProvider>
            </OptionChangeModalProvider>
          </OptionSelectModalProvider>
        </CouponProvider>
      </OrderProvider>
    </PosProvider>
  );
}
