import { Spinner } from "flowbite-react";
import { useOrderContext } from "../Providers";

export default function PaymentSpinner() {
  const { isPaymentInProgress } = useOrderContext();

  if (!isPaymentInProgress) return null;

  return (
    <main className="flex flex-col justify-center items-center gap-4 fixed w-screen h-screen top-0 left-0 z-[1000] bg-gray-50 opacity-80">
      <Spinner color="info" size="xl" aria-label="is payment in progress" />
      <p className="text-gray-700 text-lg">결제 진행중...</p>
    </main>
  );
}
