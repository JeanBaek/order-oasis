import { Order } from "../store/order/type";
import { Coupon, Product } from "../store/pos/type";

export function getPriceDesc(price: number) {
  return `${price.toLocaleString("ko-KR")}원`;
}

export function getRateDesc(rate: number) {
  return `${rate}%`;
}

export function getTotalPrice(orders: Order[]) {
  return orders.reduce((totalPrice, order) => {
    return (totalPrice += order.priceWithOption * order.quantity);
  }, 0);
}

export function getPriceWithOption(
  price: Product["price"],
  option: Product["option"],
) {
  if (!option) return price;

  return option.reduce((priceWithOption, o) => {
    if (o.checked) return (priceWithOption += o.price);
    return price;
  }, price);
}

export function getDiscountPrice(orders: Order[], coupon: Coupon) {
  if (coupon.type === "amount") return getDiscountPriceByAmount(orders, coupon);
  if (coupon.type === "rate") return getDiscountPriceByRate(orders, coupon);

  return 0;
}

export function getDiscountPriceByAmount(orders: Order[], coupon: Coupon) {
  // 만약 카테고리가 지정되지 않았다면, 쿠폰 가격을 반환
  if (!coupon.categoryIds?.length) return coupon.price;

  // 주문 목록에서 해당 카테고리에 해당하는 제품이 있는지 확인
  const categoryExists = orders.some((order) =>
    coupon.categoryIds!.includes(order.categoryId),
  );

  // 만약 해당 카테고리에 해당하는 제품이 주문 목록에 있다면 쿠폰 가격을 반환, 그렇지 않다면 0을 반환
  return categoryExists ? coupon.price : 0;
}

export function getDiscountPriceByRate(orders: Order[], coupon: Coupon) {
  const totalPrice = getTotalPrice(orders);

  // 만약 카테고리가 지정되지 않았다면, 총 가격에 쿠폰 할인율을 적용하여 반환
  if (!coupon.categoryIds?.length) return totalPrice * (coupon.price / 100);

  // 해당 카테고리에 해당하는 주문 목록을 필터링하여 총 가격에 쿠폰 할인율을 적용하여 반환
  const totalDiscount = orders.reduce((acc, order) => {
    // 주문 목록에서 해당 카테고리에 해당하는 제품을 찾음
    if (coupon.categoryIds!.includes(order.categoryId)) {
      // 해당 제품의 가격에 쿠폰 할인율을 적용하여 할인 가격을 계산
      acc += order.priceWithOption * order.quantity * (coupon.price / 100);
    }
    return acc;
  }, 0);

  return totalDiscount;
}

export function getTotalDiscount(orders: Order[], coupons: Coupon[]) {
  // 주문 목록에 대해 각 쿠폰을 적용하여 할인을 계산
  return coupons.reduce((totalDiscount, coupon) => {
    return (totalDiscount += getDiscountPrice(orders, coupon));
  }, 0);
}

export function getTotalPayment(orders: Order[], coupons: Coupon[]) {
  // 결제금액은 최소 0원 (마이너스가 되면 안된다)
  return Math.max(0, getTotalPrice(orders) - getTotalDiscount(orders, coupons));
}
