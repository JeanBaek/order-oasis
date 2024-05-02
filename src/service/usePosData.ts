import axios, { AxiosResponse } from "axios";
import { CategoryDto, CouponDto, ProductDto } from "./dto";

const apiBaseURL = "";
const apiEndpoints = {
  categories: "/categories",
  products: "/products",
  coupons: "/coupons",
};

const http = axios.create({
  baseURL: apiBaseURL,
  headers: { "Content-Type": "application/json" },
});

export default function usePosData() {
  async function getCategories() {
    return await http.get<AxiosResponse<CategoryDto[]>>(
      apiEndpoints.categories,
    );
  }

  async function getProducts() {
    return await http.get<AxiosResponse<ProductDto[]>>(apiEndpoints.products);
  }

  async function getCoupons() {
    return await http.get<AxiosResponse<CouponDto[]>>(apiEndpoints.coupons);
  }

  return {
    getCategories,
    getProducts,
    getCoupons,
  };
}
