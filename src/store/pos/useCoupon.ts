import { useState } from "react";
import { Coupon, CouponId } from "./type";
import { arrayToMap, mapToArray } from "../../helper/dataStructure";

export default function useCoupon() {
  const [couponMap, setCouponMap] = useState<Map<CouponId, Coupon>>(new Map());

  function applyCoupons(coupons: Coupon[]) {
    setCouponMap(arrayToMap(coupons, (item) => item.id));
  }

  function removeCoupon(coupon: Coupon) {
    setCouponMap((prevState) => {
      const newState = new Map(prevState);
      const id = coupon.id;
      const prevCoupon = newState.get(id);

      if (!prevCoupon) return prevState;

      prevCoupon.checked = false;
      newState.set(id, prevCoupon);

      return newState;
    });
  }

  function clearCoupons(coupons: Coupon[]) {
    applyCoupons(coupons);
  }

  return {
    everyCoupons: mapToArray(couponMap),
    appliedCoupons: mapToArray(couponMap).filter(({ checked }) => checked),
    applyCoupons,
    removeCoupon,
    clearCoupons,
  };
}
