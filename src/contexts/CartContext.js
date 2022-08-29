import React, { useState, createContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartContext = createContext();

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

const CartContextProvider = (props) => {
  const [cart, setCart] = useState(cartFromLocalStorage);
  const [basketPrice, setBasketPrice] = useState([]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (cart.length > 0) {
      for (let i = 0; i < cart.length; i++) {
        const totalProductPrice = cart[i].total_price;
        basketPrice.push(totalProductPrice);
        setBasketPrice(basketPrice.slice(-cart.length));
      }
    } else {
      setBasketPrice([0]);
    }
  }, [cart]);

  const addToCart = (props) => {
    const checkIfItemIsInCart = cart.find(({ item }) => item === props.item);
    const notify = () =>
      toast.error("This item is already in your cart!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    if (checkIfItemIsInCart) {
      notify();
    } else {
      const item = {
        id: props.id,
        item: props.item,
        price: props.price,
        total_price: props.total,
        img: props.img,
        qty: props.qty,
      };

      setCart((cart) => {
        return [...cart, item];
      });
    }
  };

  const addQuantity = (props) => {
    const checkForItem = cart.find(({ id }) => id === props);
    const changeQuantityAndPrice = {
      ...checkForItem,
      qty: checkForItem.qty + 1,
      total_price: checkForItem.total_price + checkForItem.price,
    };
    setCart((prev) =>
      prev.map((el) => (el.id === props ? changeQuantityAndPrice : el))
    );
  };

  const substractQuantity = (props, price) => {
    const checkForItem = cart.find(({ id }) => id === props);
    const changeQuantityAndPrice = {
      ...checkForItem,
      qty: checkForItem.qty - 1,
      total_price: checkForItem.total_price - checkForItem.price,
    };
    if (checkForItem.qty > 1) {
      setCart((prev) =>
        prev.map((el) => (el.id === props ? changeQuantityAndPrice : el))
      );
    } else {
      const filteredItems = cart.filter((item) => item.id !== props);
      setCart(filteredItems);
    }
  };

  return (
    <>
      <CartContext.Provider
        value={{
          cart,
          basketPrice,
          add: addToCart,
          cartFromLocalStorage,
          addqty: addQuantity,
          substractqty: substractQuantity,
          notify: <ToastContainer />,
        }}
      >
        {props.children}
      </CartContext.Provider>
    </>
  );
};

export default CartContextProvider;
