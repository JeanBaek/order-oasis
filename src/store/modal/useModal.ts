import { useState } from "react";
import { Props as ModalProps } from "../../components/SelectModal";
import { ModalType } from "./type";
import { modalConfig } from "./constant";

type Props = {
  modalType: ModalType;
  disableOnUnchanged?: boolean;
};

export default function useModal(props: Props) {
  const { title, submitDesc } = modalConfig[props.modalType];

  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState<ModalProps["option"]>([]);
  const [submit, setSubmit] = useState<
    ((option?: ModalProps["option"]) => void) | undefined
  >(undefined);

  function openModal(
    option?: ModalProps["option"],
    submitHandler?: (option: ModalProps["option"]) => void,
  ) {
    setIsOpen(true);
    setOption(option ?? []);
    setSubmit(() => submitHandler);
  }

  function closeModal() {
    setIsOpen(false);
    setOption([]);
    setSubmit(undefined);
  }

  function getModalProps(): ModalProps {
    return {
      isOpen,
      title,
      option,
      submitDesc,
      disableOnUnchanged: props.disableOnUnchanged,
      submit: handleSubmit,
      close: closeModal,
    };
  }

  function handleSubmit(option?: ModalProps["option"]) {
    if (submit) submit(option);
  }

  return {
    getModalProps,
    modalController: { openModal, closeModal },
  };
}
