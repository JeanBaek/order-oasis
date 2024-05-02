import Menu from "./menu/Menu";
import OrderPreview from "./orderPreview/OrderPreview";
import OptionSelectModal from "./modal/OptionSelectModal";
import OptionChangeModal from "./modal/OptionChangeModal";
import CouponModal from "./modal/CouponModal";
import Providers from "./Providers";
import ReceiptModal from "./modal/ReceiptModal";
import Spinner from "./orderPreview/PaymentSpinner";

export default function Pos() {
  return (
    <main className="flex w-full h-full">
      <Providers>
        <Menu />
        <OrderPreview />
        <OptionSelectModal />
        <OptionChangeModal />
        <CouponModal />
        <ReceiptModal />
        <Spinner />
      </Providers>
    </main>
  );
}
