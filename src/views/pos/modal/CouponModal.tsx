import SelectModal from "../../../components/SelectModal";
import { useCouponModalProps } from "../Providers";

export default function CouponModal() {
  const getModalProps = useCouponModalProps();

  return <SelectModal {...getModalProps()} />;
}
