import { FC } from 'react';

interface MenuItemProps {
  name: string;
  ingredients: string[];
  price: number;
  emoji: string;
  onAdd: () => void;
}

const MenuItem: FC<MenuItemProps> = ({
  name,
  ingredients,
  price,
  emoji,
  onAdd,
}) => (
  <div className="flex justify-between items-center border-b border-gray-200 py-4 px-6 dark:border-gray-700">
    <div className="flex items-center">
      <div className="text-5xl mr-4">{emoji}</div>
      <div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {ingredients.join(", ")}
        </p>
        <p className="text-lg text-gray-900 dark:text-gray-100">${price}</p>
      </div>
    </div>
    <button
      className="bg-blue-500 text-white p-2 rounded-2xl hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
      onClick={onAdd}
    >
      Add
    </button>
  </div>
);

export default MenuItem;
