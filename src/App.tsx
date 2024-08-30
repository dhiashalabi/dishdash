import { FC, useEffect, useState } from "react";
import { menuArray } from "./data";
import MenuItem from "./components/MenuItem";
import OrderItem from "./components/OrderItem";
import PaymentModal from "./components/PaymentModal";
import PrintableOrder from "./components/PrintableOrder";
import { FaMoon, FaSun } from "react-icons/fa";
import { MenuItemType, OrderItemType } from "./types";

const App: FC = () => {
  const [order, setOrder] = useState<OrderItemType[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState("auto");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "auto";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (theme: string) => {
    document.documentElement.classList.remove("light", "dark");
    if (theme === "auto") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.add("light");
      }
    } else {
      document.documentElement.classList.add(theme);
    }
    localStorage.setItem("theme", theme);
  };

  const updateTotalPrice = (newOrder: OrderItemType[]) => {
    const total = newOrder.reduce(
      (acc, { item, quantity }) => acc + item.price * quantity,
      0
    );
    setTotalPrice(total);
  };

  const addItemToOrder = (item: MenuItemType) => {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find(
        (orderItem) => orderItem.item.id === item.id
      );
      if (existingItem) {
        const updatedOrder = prevOrder.map((orderItem) =>
          orderItem.item.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
        updateTotalPrice(updatedOrder);
        return updatedOrder;
      } else {
        const newOrder = [...prevOrder, { item, quantity: 1 }];
        updateTotalPrice(newOrder);
        return newOrder;
      }
    });
  };

  const removeItemFromOrder = (itemId: number) => {
    setOrder((prevOrder) => {
      const itemToRemove = prevOrder.find(
        (orderItem) => orderItem.item.id === itemId
      );
      if (itemToRemove) {
        const updatedOrder = prevOrder
          .map((orderItem) =>
            orderItem.item.id === itemId
              ? { ...orderItem, quantity: Math.max(orderItem.quantity - 1, 0) }
              : orderItem
          )
          .filter((orderItem) => orderItem.quantity > 0);
        updateTotalPrice(updatedOrder);
        return updatedOrder;
      }
      return prevOrder;
    });
  };

  const handlePayment = () => {
    setIsModalOpen(false);
    alert("Thank you for your payment!");
    printOrder();
    setOrder([]);
    setTotalPrice(0);
  };

  const printOrder = () => {
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow?.document.write("<html><head><title>Print Order</title>");
    printWindow?.document.write("</head><body >");
    printWindow?.document.write("<h1>Order Receipt</h1>");
    printWindow?.document.write(
      document.getElementById("printable-order")?.innerHTML || ""
    );
    printWindow?.document.write("</body></html>");
    printWindow?.document.close();
    printWindow?.focus();
    printWindow?.print();
  };

  const handleModalOpen = () => {
    if (order.length > 0) {
      setIsModalOpen(true);
    } else {
      alert("Please add items to your order before proceeding.");
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-cover bg-center h-48 flex items-center justify-center text-center text-gray-900 dark:text-white">
        <div className="bg-opacity-50 bg-gray-200 dark:bg-gray-800 p-4 rounded-lg flex flex-col items-center md:items-start md:flex-row">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
            <img
              src={new URL("./assets/dishdash.jpeg", import.meta.url).href}
              alt="DishDash"
              className="w-16 h-16 object-cover rounded-full"
            />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold">DishDash</h1>
            <p className="text-lg md:text-xl">
              The best burgers and pizzas in town
            </p>
          </div>
        </div>

        <button
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <FaSun size={24} /> : <FaMoon size={24} />}
        </button>
      </header>
      <main className="flex-grow my-8">
        <div className="flex flex-col md:flex-row my-8">
          <div className="md:w-3/4 overflow-y-auto h-[calc(100vh-12rem)] p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuArray.map((item) => (
                <MenuItem
                  key={item.id}
                  name={item.name}
                  ingredients={item.ingredients}
                  price={item.price}
                  emoji={item.emoji}
                  onAdd={() => addItemToOrder(item)}
                />
              ))}
            </div>
          </div>
          <section className="md:w-1/4 my-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Your Order</h2>
            <div className="border-t border-gray-300 dark:border-gray-600 mb-4">
              {order.map((orderItem) => (
                <OrderItem
                  key={orderItem.item.id}
                  name={orderItem.item.name}
                  quantity={orderItem.quantity}
                  price={orderItem.item.price}
                  icon={orderItem.item.emoji}
                  onRemove={() => removeItemFromOrder(orderItem.item.id)}
                />
              ))}
            </div>
            <div className="flex justify-between font-semibold mb-4">
              <p>Total Price:</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
          </section>
        </div>
      </main>
      <footer className="bg-white dark:bg-gray-800 p-4 fixed bottom-0 left-0 right-0 shadow-lg">
        <button
          className="bg-green-500 text-white p-4 rounded-full w-full"
          onClick={handleModalOpen}
        >
          Complete Order
        </button>
      </footer>
      {order.length > 0 && (
        <div id="printable-order" style={{ display: "none" }}>
          <PrintableOrder order={order} totalPrice={totalPrice} />
        </div>
      )}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPay={handlePayment}
      />
    </div>
  );
};

export default App;
