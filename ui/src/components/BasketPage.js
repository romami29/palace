import React, { useState } from "react";

const BasketPage = () => {
  const [basketItems, setBasketItems] = useState([
    // Example basket items, replace with actual data
    { id: 1, name: "Product 1", price: 20, quantity: 2 },
    { id: 2, name: "Product 2", price: 15, quantity: 1 },
  ]);

  const handleValidateCommand = () => {
    // Logic to validate the command
    alert("Command validated!");
  };

  const handlePayment = () => {
    // Logic to initiate payment
    alert("Payment initiated!");
  };

  const calculateTotal = () =>
    basketItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="page-section">
      <div className="main-content">
        <h2 className="section-title">Basket</h2>
        <div className="basket-items">
          {basketItems.map((item) => (
            <div key={item.id} className="basket-item">
              <h3>{item.name}</h3>
              <p>Price: {item.price}€</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
        <div className="basket-summary">
          <p>Total: {calculateTotal()}€</p>
          <button className="btn" onClick={handleValidateCommand}>
            Validate Command
          </button>
          <button className="btn" onClick={handlePayment}>
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
