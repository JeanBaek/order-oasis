import { CategoryDto, ProductDto, CouponDto } from "../../service/dto";
import { Category, Product, Coupon } from "./type";

export function categoryTranslation(data: CategoryDto[]): Category[] {
  return data;
}

export function productTranslation(data: ProductDto[]): Product[] {
  return data.map((d) => ({
    ...d,
    option: d.option?.map((o) => ({
      name: o.name,
      price: o.price ?? 0,
      checked: false,
    })),
  }));
}

export function couponTranslation(data: CouponDto[]): Coupon[] {
  return data.map((d) => ({
    ...d,
    name: d.type === "rate" ? `${d.name} (${d.price}%)` : d.name,
    checked: false,
  }));
}
