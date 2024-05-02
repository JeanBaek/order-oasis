import { cva } from "class-variance-authority";
import { usePosContext } from "../Providers";

type Props = {
  categories: Array<{
    id: string;
    name: string;
  }>;
};

export default function CategoryTabs({ categories }: Props) {
  const { selectedCategory, updateSelectedCategory } = usePosContext();

  const tabStyle = cva("inline-block px-5 py-4 border-b-2 cursor-pointer", {
    variants: {
      active: {
        true: "active text-blue-600 border-blue-600",
        false:
          "border-transparent hover:text-gray-600 hover:border-gray-300 active:text-black",
      },
    },
  });

  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
      <ul className="flex flex-wrap -mb-px">
        {categories.map((c, i) => (
          <li
            key={i}
            className={tabStyle({ active: c.id === selectedCategory?.id })}
            onClick={() => {
              updateSelectedCategory(c);
            }}
          >
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
