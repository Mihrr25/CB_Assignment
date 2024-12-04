import React, { useState, useEffect } from 'react';
import './App.css';



const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://www.myntra.com/gateway/v2/product/31602544/related", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        });
        const data = await res.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="App">
      <h1>Product List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.defaultImage.secureSrc.replace(
                  '($height)',
                  '300'
                ).replace('($qualityPercentage)', '80').replace('($width)', '300')}
                alt={product.name}
                className="product-image"
              />
              <h2 className="product-name">{product.name}</h2>
              <p className="product-brand">{product.brand.name}</p>
              <p className="product-price">
                <span className="price-mrp">₹{product.price.mrp}</span>{' '}
                <span className="price-discounted">₹{product.price.discounted}</span>{' '}
                <span className="discount-label">{product.price.discount.label}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
