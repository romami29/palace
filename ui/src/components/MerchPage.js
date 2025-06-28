import React, { useState, useEffect } from "react";

const MerchPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const baseUrl = process.env.REACT_APP_API_URL || "";
        const response = await fetch(`${baseUrl}/api/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="page-section">
      <div className="main-content">
        <h2 className="section-title">Boutique</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-card-content">
                <img
                  src={`img/${product.image}`}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">{product.price}€</p>
                </div>
                <button className="btn">Acheter</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MerchPage;
