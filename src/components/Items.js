import React, { useEffect, useState } from "react";
import "../App.css";
const Items = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const getData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=100");
    const json = await data.json();
    setProducts(json.products);
  };
  useEffect(() => {
    getData();
  }, []);

  const pageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= 10 && selectedPage !== page)
      setPage(selectedPage);
  };

  return (
    <div>
      {products.length > 0 && (
        <div>
          <div className="products">
            {products.slice(page * 10 - 10, page * 10).map((product) => {
              return (
                <div className="products__single" key={product.id}>
                  <img src={product.thumbnail} alt={product.tile} />
                  <span>{product.title}</span>
                </div>
              );
            })}
          </div>
          <div className="page__number__all">
            <span
              className="page__number"
              onClick={() => pageHandler(page - 1)}
            >
              ◀️
            </span>
            {[...Array(products.length / 10)].map((product, i) => (
              <span
                className={
                  page === i + 1
                    ? "page__number page__selected"
                    : "page__number"
                }
                key={i}
                onClick={() => pageHandler(i + 1)}
              >
                {i + 1}
              </span>
            ))}
            <span
              className="page__number"
              onClick={() => pageHandler(page + 1)}
            >
              ▶️
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Items;
