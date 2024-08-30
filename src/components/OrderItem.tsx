import { FC } from 'react';

interface OrderItemProps {
  name: string;
  quantity: number;
  price: number;
  icon: string;
  onRemove: () => void;
}

const OrderItem: FC<OrderItemProps> = ({ name, quantity, price, icon, onRemove }) => {
  const totalPrice = (quantity * price).toFixed(2);

  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-300 dark:border-gray-700">
      <div className="flex items-center">
        <div className="text-3xl mr-4">{icon}</div>
        <div>
          <p className="text-lg font-semibold dark:text-white">{name}</p>
          {quantity > 1 ? (
            <div className="flex items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {quantity} x ${price}
              </p>
              <p className="text-sm text-gray-900 dark:text-gray-100 ml-2">
                ${totalPrice}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-900 dark:text-gray-100">${totalPrice}</p>
          )}
        </div>
      </div>
      <button
        className="ml-4 text-red-600 dark:text-red-400"
        onClick={onRemove}
      >
        Remove
      </button>
    </div>
  );
};

export default OrderItem;
