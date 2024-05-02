import SelectModal from "../../../components/SelectModal";
import { useOptionChangeModalProps } from "../Providers";

export default function OptionChangeModal() {
  const getModalProps = useOptionChangeModalProps();

  return <SelectModal {...getModalProps()} />;
}
