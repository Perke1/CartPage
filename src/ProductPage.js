import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "./contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";
import PulseLoader from "react-spinners/PulseLoader";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const contextData = useContext(CartContext);
  const { cart, add, notify } = contextData;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("https://dummyjson.com/products?limit=10");
      const json = await data.json();
      const parsed_json = json.products;
      setProducts(parsed_json);
      setLoading(false);
    };

    fetchData().catch(console.error);
  }, []);

  const navigate = useNavigate();

  const routeChange = () => {
    const path = "/cart";
    navigate(path);
  };

  return (
    <>
      {loading ? (
        <div className="absolute left-0 right-0 top-1/2 ml-auto mr-auto text-center ">
          <PulseLoader color="black" size={100} />
        </div>
      ) : (
        <>
          <ShoppingBagIcon
            className="fixed top-2 right-2 cursor-pointer w-10 h-8"
            onClick={routeChange}
          ></ShoppingBagIcon>
          {notify}
          <div
            className="grid grid-cols-3 gap-7 p-5 w-5/6 sm:w-2/3 m-auto
        "
          >
            {products &&
              products.map((product) => {
                const { id, title, price, thumbnail } = product;

                return (
                  <>
                    <div
                      key={id}
                      className="border-solid border-white
                    rounded-lg bg-gray-100 text-center leading-7"
                    >
                      <img
                        src={thumbnail}
                        alt="Product"
                        className="h-40 w-full"
                      ></img>
                      <p className="font-semibold">{title}</p>
                      <p className="font-semibold">{price} $</p>
                      <button
                        onClick={() =>
                          add({
                            ...cart,
                            id: uuidv4(),
                            item: title,
                            price: price,
                            total: price,
                            img: thumbnail,
                            qty: 1,
                          })
                        }
                      >
                        Add to cart
                      </button>
                    </div>
                  </>
                );
              })}
          </div>
        </>
      )}
    </>
  );
};

export default ProductPage;
