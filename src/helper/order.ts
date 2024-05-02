import { Order } from "../store/order/type";
import { PartiallyOptional } from "../type/partially";

export function generateOrderId(
  order: PartiallyOptional<
    Order,
    "id" | "quantity" | "priceWithOption" | "orderTimestamp"
  >,
) {
  return order.name + JSON.stringify(order.option);
}

export function getTotalOrderQuantity(orders: Order[]) {
  return orders.reduce((quantity, order) => {
    quantity += order.quantity;
    return quantity;
  }, 0);
}
