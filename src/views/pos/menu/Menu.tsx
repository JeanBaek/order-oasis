import { usePosContext } from "../Providers";
import CategoryTabs from "./CategoryTabs";
import ProductList from "./ProductList";

export default function Menu() {
  const { categories } = usePosContext();

  return (
    <section className="flex flex-col w-2/3">
      <header className="p-2 text-xl font-bold">
        <h2 className="p-2">상품</h2>
      </header>
      <CategoryTabs categories={categories} />
      <ProductList />
    </section>
  );
}
