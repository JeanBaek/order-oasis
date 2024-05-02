import { PartiallyReplaced } from "../../type/partially";
import {
  CategoryDto,
  ProductDto,
  ProductOptionDto,
  CouponDto,
} from "../../service/dto";

export type Category = CategoryDto;

export type Product = PartiallyReplaced<
  ProductDto,
  "option",
  Array<ProductOption>
>;

export type ProductOption = Required<ProductOptionDto> & {
  checked: boolean;
};

export type Coupon = CouponDto & {
  checked: boolean;
};

export type CouponId = string;
