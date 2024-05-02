import { useState, useEffect } from "react";
import { Category, Product, Coupon } from "./type";
import usePosData from "../../service/usePosData";
import {
  categoryTranslation,
  couponTranslation,
  productTranslation,
} from "./translation";

export default function usePos() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const { getCategories, getProducts, getCoupons } = usePosData();

  useEffect(() => {
    updateCategories();
    updateProducts();
    updateCoupons();
  }, []);

  function updateCategories() {
    getCategories().then(({ data }) => {
      const newData = categoryTranslation(data.data);
      setCategories(newData);

      if (newData.length) updateSelectedCategory(newData[0]);
    });
  }

  function updateProducts() {
    getProducts().then(({ data }) => {
      const newData = productTranslation(data.data);
      setProducts(newData);
    });
  }

  function updateCoupons() {
    getCoupons().then(({ data }) => {
      const newData = couponTranslation(data.data);
      setCoupons(newData);
    });
  }

  function updateSelectedCategory(newData: Category) {
    setSelectedCategory(newData);
  }

  return {
    categories,
    products,
    coupons,
    selectedCategory,

    updateSelectedCategory,
  };
}
