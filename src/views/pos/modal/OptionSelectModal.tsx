import SelectModal from "../../../components/SelectModal";
import { useOptionSelectModalProps } from "../Providers";

export default function OptionSelectModal() {
  const getModalProps = useOptionSelectModalProps();

  return <SelectModal {...getModalProps()} />;
}
