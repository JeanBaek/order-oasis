import { useEffect, useState } from "react";
import { getPriceDesc } from "../../../helper/price";
import {
  usePosContext,
  useOrderContext,
  useOptionSelectController,
} from "../Providers";
import Product from "./Product";
import { Category, Product as ProductType } from "../../../store/pos/type";
import { Props as ModalProps } from "../../../components/SelectModal";
import { PartiallyRequired } from "../../../type/partially";

export default function ProductList() {
  const { products, selectedCategory } = usePosContext();
  const { addOrder } = useOrderContext();
  const { openModal, closeModal } = useOptionSelectController();

  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    setFilteredProducts(filterBy(products, selectedCategory));
  }, [products, selectedCategory]);

  useEffect(() => {
    adjustItemSize();
    window.addEventListener("resize", adjustItemSize);

    return () => {
      window.removeEventListener("resize", adjustItemSize);
    };
  }, [filteredProducts]);

  function filterBy(
    products: ProductType[],
    selectedCategory: Category | null,
  ): ProductType[] {
    if (!selectedCategory) return products;

    return products.filter((p) => p.categoryId === selectedCategory.id);
  }

  function adjustItemSize() {
    const items = document.getElementsByClassName("product-item");

    Array.from(items).forEach((item) => {
      (item as HTMLElement).style.height = `${item.clientWidth}px`;
    });
  }

  function clickHandler(p: ProductType) {
    if (p.option) {
      handleOptionSelect(p as PartiallyRequired<ProductType, "option">);
      return;
    }

    const newOrder = {
      categoryId: p.categoryId,
      name: p.name,
      price: p.price,
      priceWithOption: p.price,
      option: p.option,
    };

    addOrder(newOrder);
  }

  function handleOptionSelect(p: PartiallyRequired<ProductType, "option">) {
    const modalOption = p.option.map((o) => ({
      ...o,
      id: o.name,
      desc: getPriceDesc(o.price),
    }));
    const submit = (option: ModalProps["option"]) => {
      const newOrder = {
        categoryId: p.categoryId,
        name: p.name,
        price: p.price,
        option: option.map((o) => ({
          name: o.name,
          price: o.price,
          checked: o.checked,
        })),
      };

      addOrder(newOrder);
      closeModal();
    };

    openModal(modalOption, submit);
  }

  return (
    <div className="bg-gray-100 flex flex-col gap-4 p-4 flex-1 h-full">
      <p>총 {filteredProducts.length}개</p>
      <div className="grid grid-cols-5 gap-4">
        {filteredProducts.map((p, i) => (
          <div
            key={i}
            className="aspect-w-1 aspect-h-1 w-full h-full product-item"
          >
            <Product
              name={p.name}
              price={p.price}
              hasOption={!!p.option?.length}
              clickHandler={() => clickHandler(p)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
