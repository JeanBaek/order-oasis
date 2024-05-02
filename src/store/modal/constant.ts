import { ModalType } from "./type";

export const modalConfig: Record<
  ModalType,
  { title: string; submitDesc: string }
> = {
  OptionSelectModal: {
    title: "옵션 선택",
    submitDesc: "추가",
  },
  OptionChangeModal: {
    title: "옵션 변경",
    submitDesc: "변경",
  },
  CouponModal: {
    title: "할인 적용",
    submitDesc: "적용",
  },
  ReceiptModal: {
    title: "주문 내역",
    submitDesc: "확인",
  },
};
