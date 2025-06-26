import React, { useContext, useEffect, useState } from "react";
import {
  FaMinus,
  FaPlus,
  FaHeart,
  FaFacebookF,
  FaTwitter,
  FaPinterest,
  FaInstagram,
  FaWhatsapp,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { Context } from "../Context/Context";
import Footer from "../components/Footer/Footer";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [singleData, setSingleData] = useState({});
  const [productImages, setProductsImages] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { setOpenCart } = useContext(Context); // your cart context (assumed)

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `http://henza.zaffarsons.com/henza/get-product/${id}`
      );
      setSingleData(data);
      setProductsImages(data?.images || []);
      setCurrentImage(data?.images?.[0] || "");
      setColor(data?.productColor?.[0] || ""); // set default color if available
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const shareProduct = (platform) => {
    const productUrl = encodeURIComponent(window.location.href);
    const productName = encodeURIComponent(singleData?.productName || "Product");
    const text = encodeURIComponent("Check out this product I found!");

    const shareConfig = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${productUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${productUrl}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${productUrl}&description=${productName}`,
      whatsapp: `https://api.whatsapp.com/send?text=${text} ${productUrl}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${productUrl}&title=${productName}`,
      instagram: `https://www.instagram.com/?url=${productUrl}`,
    };

    if (shareConfig[platform]) {
      window.open(shareConfig[platform], "_blank", "noopener,noreferrer");
    }
  };

  const handleAddToCart = () => {
    const selectedProduct = {
      id: singleData.id,
      name: singleData.productName,
      price: singleData.price,
      color: color,
      quantity: quantity,
      image: currentImage,
    };

    // Example logic: storing in localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(selectedProduct);
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("Product added to cart:", selectedProduct);

    setOpenCart(true); // if you're using a cart sidebar/modal
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-6">
          <div className="aspect-square overflow-hidden rounded-2xl shadow-lg border-2 border-gray-100">
            <img
              src={currentImage}
              alt="Product"
              className="w-full h-full object-cover transform transition duration-500 hover:scale-105"
            />
          </div>
          <div className="flex gap-3 pb-4 overflow-x-auto scrollbar-hide">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(img)}
                className="shrink-0 focus:outline-none"
              >
                <img
                  src={img}
                  alt={`Thumb ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg border-2 transition-all ${
                    currentImage === img
                      ? "border-rose-500"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {singleData?.productName}
            </h1>
            <p className="text-2xl font-semibold text-rose-600 mb-6">
              PKR {singleData?.price}
            </p>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Color: <span className="font-normal">{color}</span>
            </h3>
            <div className="flex gap-3">
              {singleData?.productColor?.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                    color === c
                      ? "border-rose-500 ring-2 ring-rose-200"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: c }}
                  title={c}
                >
                  {color === c && (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <span className="text-lg font-semibold text-gray-800">
                Quantity:
              </span>
              <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-full h-8 w-8 hover:bg-gray-100 flex items-center justify-center"
                >
                  <FaMinus className="h-4 w-4 text-gray-600" />
                </button>
                <span className="text-xl font-medium w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-full h-8 w-8 hover:bg-gray-100 flex items-center justify-center"
                >
                  <FaPlus className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 text-lg rounded-xl text-white bg-rose-500 hover:bg-rose-600 transition-colors flex items-center justify-center gap-2"
              >
                Add to Cart
              </button>
              <Link
                to="/checkout"
                className="flex-1 py-4 text-lg rounded-xl text-rose-600 bg-white border-2 border-rose-500 hover:bg-rose-50 transition-colors text-center"
              >
                Buy Now
              </Link>
            </div>

            <button
              className="w-full py-3 rounded-xl border-2 border-gray-200 hover:border-rose-500 hover:text-rose-600 transition-colors flex items-center justify-center gap-2"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <FaHeart
                className={`h-5 w-5 ${
                  isWishlisted ? "text-rose-500 fill-current" : ""
                }`}
              />
              {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          {/* Social Sharing */}
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Share This Product
            </h3>
            <div className="flex gap-4">
              {[
                { icon: FaFacebookF, platform: "facebook", color: "bg-blue-600" },
                { icon: FaWhatsapp, platform: "whatsapp", color: "bg-green-500" },
                { icon: FaInstagram, platform: "instagram", color: "bg-pink-600" },
                { icon: FaTwitter, platform: "twitter", color: "bg-sky-500" },
                { icon: FaPinterest, platform: "pinterest", color: "bg-red-600" },
                { icon: FaLinkedinIn, platform: "linkedin", color: "bg-blue-800" },
              ].map((social, index) => (
                <button
                  key={index}
                  onClick={() => shareProduct(social.platform)}
                  className={`p-3 rounded-full text-white hover:opacity-90 transition-opacity ${social.color}`}
                >
                  <social.icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetail;
