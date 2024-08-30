import { FC } from "react";
import { OrderItemType } from "../types";

interface PrintableOrderProps {
  order: OrderItemType[];
  totalPrice: number;
}

const PrintableOrder: FC<PrintableOrderProps> = ({ order, totalPrice }) => {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ margin: "0", color: "#333" }}>Order Receipt</h1>
        <p style={{ margin: "5px 0", color: "#777" }}>
          Thank you for your order!
        </p>
      </header>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                borderBottom: "2px solid #ddd",
                padding: "12px",
                textAlign: "left",
                color: "#555",
                fontWeight: "bold",
              }}
            >
              Item
            </th>
            <th
              style={{
                borderBottom: "2px solid #ddd",
                padding: "12px",
                textAlign: "right",
                color: "#555",
                fontWeight: "bold",
              }}
            >
              Quantity
            </th>
            <th
              style={{
                borderBottom: "2px solid #ddd",
                padding: "12px",
                textAlign: "right",
                color: "#555",
                fontWeight: "bold",
              }}
            >
              Price
            </th>
            <th
              style={{
                borderBottom: "2px solid #ddd",
                padding: "12px",
                textAlign: "right",
                color: "#555",
                fontWeight: "bold",
              }}
            >
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {order.map(({ item, quantity }) => (
            <tr key={item.id}>
              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #eee",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ marginRight: "8px" }}>{item.emoji}</span>
                {item.name}
              </td>
              <td
                style={{
                  padding: "12px",
                  textAlign: "right",
                  borderBottom: "1px solid #eee",
                }}
              >
                {quantity}
              </td>
              <td
                style={{
                  padding: "12px",
                  textAlign: "right",
                  borderBottom: "1px solid #eee",
                }}
              >
                ${item.price.toFixed(2)}
              </td>
              <td
                style={{
                  padding: "12px",
                  textAlign: "right",
                  borderBottom: "1px solid #eee",
                }}
              >
                ${(item.price * quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td
              colSpan={3}
              style={{
                textAlign: "right",
                padding: "12px",
                fontWeight: "bold",
                color: "#333",
                borderTop: "2px solid #ddd",
              }}
            >
              Total Price:
            </td>
            <td
              style={{
                padding: "12px",
                textAlign: "right",
                fontWeight: "bold",
                color: "#333",
                borderTop: "2px solid #ddd",
              }}
            >
              ${totalPrice.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PrintableOrder;
