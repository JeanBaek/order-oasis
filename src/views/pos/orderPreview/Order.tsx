import { cva } from "class-variance-authority";
import { getPriceDesc } from "../../../helper/price";
import { useOptionChangeController, useOrderContext } from "../Providers";
import Button, { buttonStyle } from "../../../components/Button";
import { Order as OrderType } from "../../../store/order/type";
import { Props as ModalProps } from "../../../components/SelectModal";
import { Props as OrderListProps } from "./OrderList";

type Props = OrderType & OrderListProps;

export default function Order(props: Props) {
  const { name, quantity, price, priceWithOption, option } = props;
  const { removeOrder, increaseOrder, decreaseOrder, updateOrderOption } =
    useOrderContext();
  const { openModal, closeModal } = useOptionChangeController();

  const quantityBtnStyle = cva(
    "flex w-4/12 items-center text-blue-700 rounded-lg font-medium",
    {
      variants: {
        hideButton: { true: "justify-end", false: "justify-between border" },
      },
      defaultVariants: { hideButton: false },
    },
  );

  function handleOptionChange() {
    if (!option) return;

    const modalOption = option.map((o) => ({
      ...o,
      id: o.name,
      desc: getPriceDesc(o.price ?? 0),
    }));
    const submit = (option: ModalProps["option"]) => {
      updateOrderOption(
        props,
        option.map((o) => ({
          name: o.name,
          price: o.price,
          checked: o.checked,
        })),
      );

      closeModal();
    };

    openModal(modalOption, submit);
  }

  return (
    <li className="flex flex-col w-full px-4 py-2">
      <div className="flex w-full justify-end">
        <Button
          hide={props.hideButton}
          content={
            <img
              src="/assets/icons/close.svg"
              alt="Close Icon"
              className="w-[20px] h-[20px] m-1"
            />
          }
          onClick={() => removeOrder(props)}
        />
      </div>
      <div className="flex w-full">
        <h6 className="w-3/6 font-bold">{name}</h6>
        <span className="w-1/6 text-center text-blue-700"></span>
        <em className="w-1/3 text-right text-gray-400">
          {getPriceDesc(price)}
        </em>
      </div>
      <OptionList option={option?.filter((o) => o.checked)} />
      <div className="flex w-full items-center mt-1">
        <span className="flex w-4/12">
          <Button
            hide={props.hideButton || !option?.length}
            content={
              <p className="inline-flex items-center justify-center px-3 py-1 text-sm">
                옵션 변경
              </p>
            }
            onClick={() => {
              handleOptionChange();
            }}
          />
        </span>
        <span className={quantityBtnStyle({ hideButton: props.hideButton })}>
          <button
            className={buttonStyle({ border: false, hide: props.hideButton })}
            onClick={() => decreaseOrder(props.id)}
            disabled={quantity <= 1}
          >
            <img
              src="/assets/icons/minus.svg"
              alt="Minus Icon"
              className="w-[20px] h-[20px] m-1"
            />
          </button>
          {props.hideButton ? "x " : ""}
          {quantity}
          <button
            className={buttonStyle({ border: false, hide: props.hideButton })}
            onClick={() => increaseOrder(props.id)}
          >
            <img
              src="/assets/icons/plus.svg"
              alt="Plus Icon"
              className="w-[20px] h-[20px] m-1"
            />
          </button>
        </span>
        <p className="w-4/12 font-bold text-right">
          {getPriceDesc(priceWithOption * quantity)}
        </p>
      </div>
    </li>
  );
}

function OptionList({ option }: { option: Props["option"] }) {
  if (!option) return null;

  return (
    <ul>
      {option.map((o, i) => (
        <li key={i} className="relative option-marker text-gray-400 pl-5">
          <em className="float-right">{getPriceDesc(o.price ?? 0)}</em>
          <div>{o.name}</div>
        </li>
      ))}
    </ul>
  );
}
