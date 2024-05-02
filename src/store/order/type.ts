import { Product, ProductOption } from "../pos/type";
import { PAYMENT_METHODS } from "./constant";

export type Order = {
  categoryId: Product["categoryId"];
  id: OrderId;
  orderTimestamp: number;
  name: string;
  quantity: number;
  price: number;
  priceWithOption: number;
  option?: Array<ProductOption>;
};

// OrderId 형식 = {Order name} + {option JSON string} (generateOrderId 함수 참고)
export type OrderId = string;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];
