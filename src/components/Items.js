import React, { useEffect, useState } from "react";
import "../App.css";
const Items = () => {
  const [products, setProducts] = useState([]);

  const getData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=100");
    const json = await data.json();
    setProducts(json.products);
  };
  useEffect(() => {
    getData();
  }, []);

  const pageHandler = () => {};

  return (
    <div>
      {products.length > 0 && (
        <div>
          <div className="products">
            {products.map((product) => {
              return (
                <div className="products__single" key={product.id}>
                  <img src={product.thumbnail} alt={product.tile} />
                  <span>{product.title}</span>
                </div>
              );
            })}
          </div>
          <div className="page__number__all">
            <span className="page__number">◀️</span>
            {[...Array(products.length / 10)].map((product, i) => (
              <span
                className="page__number"
                key={i}
                onClick={() => pageHandler()}
              >
                {i + 1}
              </span>
            ))}
            <span className="page__number">▶️</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Items;
