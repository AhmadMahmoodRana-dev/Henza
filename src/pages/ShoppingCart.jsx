import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Context } from "../Context/Context";
import { Link, useNavigate } from "react-router-dom";

export default function ShoppingCart() {
  const { openCart, setOpenCart } = useContext(Context);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cartData);
  }, [openCart]);

  const navigate = useNavigate();
  const onCheckOut = () => {
    setOpenCart(!openCart);
    navigate("/checkout");
  };

  const handleRemove = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, i) => i !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce((total, item) => {
    const priceStr =
      typeof item.price === "string" ? item.price.replace("$", "") : item.price;
    const price = parseFloat(priceStr) || 0;
    const quantity = item.quantity || 1;
    return total + price * quantity;
  }, 0);

  const onContinueShoping = () => {
    setOpenCart(!openCart);
    navigate("/");
  };

  return (
    <Dialog
      open={openCart}
      onClose={setOpenCart}
      style={{ zIndex: "100" }}
      className="relative"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Shopping cart
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpenCart(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {cartItems.map((product, index) => (
                          <li key={index} className="flex py-6">
                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                alt={product.imageAlt || product.name}
                                src={product.image}
                                className="size-full object-cover"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={product.href || "#"}>
                                      {product.name}
                                    </a>
                                  </h3>
                                  <p className="ml-4">{product.price}</p>
                                </div>
                                <p className="my-1 text-sm text-gray-900">
                                  ( {product.sku} )
                                </p>
                                <div
                                  className="mt-1 w-6 h-6"
                                  style={{ backgroundColor: product.color }}
                                  title={product.color}
                                />
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">
                                  Qty {product.quantity || 1}
                                </p>

                                {product?.size && (
                                  <p className="text-gray-500">
                                    Size {product.size || 1}
                                  </p>
                                )}
                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium text-red-400 hover:text-red-500"
                                    onClick={() => handleRemove(index)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>{subtotal.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <a
                      onClick={() => onCheckOut()}
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-[#075686] px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-[#075686]"
                    >
                      Checkout
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <button
                        onClick={() => onContinueShoping()}
                        type="button"
                        className="font-medium text-red-400 hover:text-red-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
