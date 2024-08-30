import { FC } from "react";
import { FaTimes } from "react-icons/fa";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPay: () => void;
}

const PaymentModal: FC<PaymentModalProps> = ({ isOpen, onClose, onPay }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-500 dark:text-gray-400"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
          Enter Payment Details
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onPay();
          }}
        >
          <input
            type="text"
            className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            placeholder="Enter your name"
            required
          />
          <input
            type="text"
            className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            placeholder="Enter card number"
            required
          />
          <input
            type="text"
            className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            placeholder="Enter CVV"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded dark:bg-green-600 dark:text-gray-200"
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
