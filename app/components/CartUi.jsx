"use client";
import React, { useContext, useEffect, useState } from "react";
import { BULL_FRAME, HORSES, Home_Vastu_Kit } from "@/lib/Constant/constant";
import { productcon } from "../page";

const CartUi = () => {
  const data = useContext(productcon);
  console.log(data);
  const [cartdata, setcartdata] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(Home_Vastu_Kit);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        let arr = JSON.parse(localStorage.getItem("cart")) || [];
        console.log(arr);
        setcartdata(arr);
      }
    } catch (error) {
      console.error("Error while getting cart data from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    console.log(cartdata);
    console.log("state updated");
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(cartdata));
      }
    } catch (error) {
      console.error("Error while setting cart data in localStorage:", error);
    }
  }, [cartdata]);

  const handleQuantityChange = (name, increment) => {
    setcartdata((data) => {
      return data.map((item) => {
        if (item.name === name) {
          return { ...item, num: item.num + increment };
        }
        return item;
      });
    });
  };

  const calculateTotal = () => {
    return cartdata.reduce((total, item) => total + item.price * item.num, 0);
  };

  const handleProductSelection = (product) => {
    setSelectedProduct(product);
  };

  const selectedProductData = cartdata.find(
    (item) => item.name === selectedProduct
  ) || { num: 0, price: 0 };

  const getProductImage = (product) => {
    switch (product) {
      case Home_Vastu_Kit:
        return "/kit.jpg";
      case BULL_FRAME:
        return "/bull.png";
      case HORSES:
        return "/horse.png";
      default:
        return "/kit.jpg";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl px-6 md:flex md:flex-col xl:px-0">
        <div className="rounded-lg bg-white p-6 shadow-md mb-6">
          <div className="flex flex-col items-center">
            <img
              src={getProductImage(selectedProduct)}
              alt="product-image"
              className="w-full rounded-lg sm:w-60 md:w-80"
            />
            <h2 className="text-lg font-bold text-gray-900 mt-4">
              {selectedProduct}
            </h2>
            <div className="mt-4 flex items-center space-x-4">
              <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-blue-500 hover:text-white"
                onClick={() => handleQuantityChange(selectedProduct, -1)}
              >
                -
              </button>
              <input
                className="w-12 text-center"
                type="number"
                value={selectedProductData.num}
                readOnly
              />
              <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-blue-500 hover:text-white"
                onClick={() => handleQuantityChange(selectedProduct, 1)}
              >
                +
              </button>
              <p className="text-sm">
                /- {selectedProductData.price * selectedProductData.num}
              </p>
            </div>
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">{calculateTotal()}</p>
            </div>

            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div>
                <p className="mb-1 text-lg font-bold">{calculateTotal()}</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
              Check out
            </button>
          </div>
        </div>
        <div className="container mx-auto py-10">
          <h1 className="text-center text-3xl font-bold mb-6">
            Our Other Product
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="rounded-lg bg-white p-6 shadow-md cursor-pointer"
            onClick={() => handleProductSelection(BULL_FRAME)}
          >
            <div className="flex flex-col items-center">
              <img
                src="/bull.png"
                alt="product-image"
                className="w-full rounded-lg sm:w-40"
              />
              <h2 className="text-lg font-bold text-gray-900 mt-4">
                {BULL_FRAME}
              </h2>
            </div>
          </div>

          <div
            className="rounded-lg bg-white p-6 shadow-md cursor-pointer"
            onClick={() => handleProductSelection(HORSES)}
          >
            <div className="flex flex-col items-center">
              <img
                src="/horse.png"
                alt="product-image"
                className="w-full rounded-lg sm:w-40"
              />
              <h2 className="text-lg font-bold text-gray-900 mt-4">{HORSES}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartUi;
