import { useState } from "react";
import { ProductOption } from "../pos/type";
import { Order, OrderId, PaymentMethod } from "./type";
import { mapToArray } from "../../helper/dataStructure";
import { generateOrderId } from "../../helper/order";
import { getPriceWithOption } from "../../helper/price";

export default function useOrder() {
  const [orderMap, setOrderMap] = useState<Map<OrderId, Order>>(new Map());
  const [isPaymentInProgress, setIsPaymentInProgress] = useState(false);

  function addOrder(
    o: Omit<Order, "id" | "quantity" | "priceWithOption" | "orderTimestamp">,
  ) {
    setOrderMap((prevState) => {
      const newState = new Map(prevState);

      const id = generateOrderId(o);
      const prevOrder = newState.get(id);

      if (prevOrder) {
        prevOrder.quantity++;
        newState.set(id, prevOrder);
      } else {
        newState.set(id, {
          ...o,
          id: id,
          orderTimestamp: new Date().getTime(),
          priceWithOption: getPriceWithOption(o.price, o.option),
          quantity: 1,
        });
      }

      return newState;
    });
  }

  function removeOrder(o: Order) {
    setOrderMap((prevState) => {
      const newState = new Map(prevState);

      const id = o.id;
      const prevOrder = newState.get(id);

      if (!prevOrder) return prevState;

      newState.delete(id);

      return newState;
    });
  }

  function increaseOrder(id: OrderId) {
    setOrderMap((prevState) => {
      const newState = new Map(prevState);
      const prevOrder = newState.get(id);

      if (!prevOrder) return prevState;

      prevOrder.quantity++;
      newState.set(id, prevOrder);

      return newState;
    });
  }

  function decreaseOrder(id: OrderId) {
    setOrderMap((prevState) => {
      const newState = new Map(prevState);
      const prevOrder = newState.get(id);

      if (!prevOrder || prevOrder.quantity === 1) return prevState; // 수량 1까지만 마이너스 가능

      prevOrder.quantity--;
      newState.set(id, prevOrder);

      return newState;
    });
  }

  function updateOrderOption(o: Order, newOption: ProductOption[]) {
    setOrderMap((prevState) => {
      const newState = new Map(prevState);
      const prevId = o.id;

      const id = generateOrderId({ ...o, option: newOption });
      const sameOrderWithNewOption = newState.get(id);

      if (prevState.has(id) && sameOrderWithNewOption) {
        sameOrderWithNewOption.quantity += o.quantity;
        newState.set(id, sameOrderWithNewOption);
      } else {
        newState.set(id, {
          ...o,
          id: id,
          priceWithOption: getPriceWithOption(o.price, newOption),
          option: newOption,
        });
      }

      newState.delete(prevId);
      return newState;
    });
  }

  function clearOrders() {
    setOrderMap(new Map());
  }

  function initiatePayment(paymentMethod: PaymentMethod) {
    setIsPaymentInProgress(true);
  }

  function completePayment() {
    setIsPaymentInProgress(false);
  }

  return {
    orders: mapToArray(orderMap),
    addOrder,
    removeOrder,
    increaseOrder,
    decreaseOrder,
    updateOrderOption,
    clearOrders,

    isPaymentInProgress,
    initiatePayment,
    completePayment,
  };
}
