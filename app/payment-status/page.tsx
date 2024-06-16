"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import checkStatus from "@/utils/checkStatus";
import { useCart } from "@/context/cartContext";
import { updateOrderStatus } from "@/lib/actions/order.action";
import Loading from "./loading";

interface StatusData {
  state: string;
  transactionId: string;
  amount: number;
}

interface StatusResponse {
  success: boolean;
  code: string;
  message: string;
  data: StatusData;
}

const PaymentStatus: React.FC = () => {
  const searchParams = useSearchParams();
  const merchantTransactionId = searchParams.get("merchantTransactionId");
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { clearCart } = useCart();

  useEffect(() => {
    if (!merchantTransactionId) return;

    const getStatus = async () => {
      try {
        const response = await checkStatus(merchantTransactionId);
        const data = JSON.parse(response);
        setStatus(data);

        if (data.success) {
          await updateOrderStatus(merchantTransactionId, "Completed");
          await clearCart();
        }
      } catch (error) {
        await updateOrderStatus(merchantTransactionId, "Failed");
        setError("Failed to check payment status.");
      } finally {
        setLoading(false);
      }
    };

    getStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [merchantTransactionId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Payment Status
            </h1>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                status?.success
                  ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                  : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
              }`}
            >
              {status?.success ? "Successful" : "Failed"}
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-gray-500 dark:text-gray-400">Amount:</p>
              <p className="text-gray-900 font-medium dark:text-gray-100">
                ₹{status?.data?.amount ? status.data.amount / 100 : "NaN"}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-500 dark:text-gray-400">
                Transaction ID:
              </p>
              <p className="text-gray-900 font-medium dark:text-gray-100">
                {status?.data?.transactionId}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Message:</p>
              <p className="text-gray-900 font-medium dark:text-gray-100">
                {status?.message}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 px-8 py-4 rounded-b-lg dark:bg-gray-800">
          <a
            href="/"
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:focus:ring-gray-400"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
