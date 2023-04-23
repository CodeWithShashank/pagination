import React, { useEffect, useState } from "react";
import "../App.css";
const Items = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const getData = async () => {
    const data = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const json = await data.json();
    setProducts(json.products);
    setTotalPages(json.total / 10);
  };
  useEffect(() => {
    getData();
  }, [page]);

  const pageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

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
            <span
              className="page__number"
              onClick={() => pageHandler(page - 1)}
            >
              ◀️
            </span>
            {[...Array(totalPages)].map((product, i) => (
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
