import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "./contexts/CartContext";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const CartPage = () => {
  const contextData = useContext(CartContext);
  const { cart, basketPrice, addqty, substractqty } = contextData;
  const TotalBasketPrice = basketPrice.reduce((a, b) => a + b, 0);
  const checkIfCartHaveItems = cart.length > 0;

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl p-3">Your Cart</h1>
        {checkIfCartHaveItems ? (
          cart.map((product) => {
            const { id, item, total_price, img, qty, price } = product;
            return (
              <>
                <div key={id} className="flex w-96 m-auto mt-2 bg-gray-100">
                  <img
                    src={img}
                    alt="Product"
                    className="w-48 h-48 rounded"
                  ></img>

                  <h1 className="text-xl font-medium ml-8 mt-3">
                    {item}, {total_price} $
                  </h1>

                  <div className="absolute ml-auto mr-auto left-48 right-7">
                    <p className="mt-32 text-xl">Quantity: {qty}</p>
                    <div className="absolute inline-block ml-16 top-28">
                      <ChevronUpIcon
                        className="w-9 h-9 cursor-pointer"
                        onClick={() => addqty(id)}
                      ></ChevronUpIcon>
                      <ChevronDownIcon
                        className="w-9 h-9 cursor-pointer"
                        onClick={() => substractqty(id, price)}
                      ></ChevronDownIcon>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <p className="text-xl p-5">Add some items to cart...</p>
        )}
        <Link to="/" className="text-2xl leading-10">
          Back to home page
        </Link>
      </div>
      <div className="absolute sm:right-1/3 ml-16 2xl:inset-y-20 2xl:right-1/4 2xl:left-1/6">
        <p className="inline-block w-36">Discounts</p>
        <p className="inline-block underline">Apply Discount</p>

        <button className="block w-full p-2 mt-5 rounded border-2 border-black font-semibold">
          Log in
        </button>
        <div className="w-full mt-8 bg-black h-px"></div>

        <p className="mt-3 font-semibold">Total: {TotalBasketPrice} $</p>
        <button className="block w-full p-2 mt-8 rounded border-2 border-black font-semibold">
          Checkout
        </button>
        <p className="mt-3">We accept</p>
        <div className="flex gap-2 mt-2">
          <img
            src="https://newsroom.mastercard.com/wp-content/uploads/2016/09/paypal-logo.png"
            className="w-14 h-5"
            alt="Accepted Payment"
          />
          <img
            src="https://www.pngfind.com/pngs/m/10-107721_58482363cef1014c0b5e49c1-credit-card-visa-new-logo-vector-hd.png"
            className="w-14 h-5"
            alt="Accepted Payment"
          />
          <img
            src="https://eresearch.com/wp-content/uploads/2019/09/mastercard-logo-small.jpg"
            className="w-14 h-7"
            alt="Accepted Payment"
          />
          <img
            src="https://www.clipartmax.com/png/middle/110-1104990_maestro-card-new-logo.png"
            className="w-10 h-7"
            alt="Accepted Payment"
          />
        </div>
      </div>
    </>
  );
};

export default CartPage;
