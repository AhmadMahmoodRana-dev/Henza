import React, { useContext, useState } from "react";
import {
  FaMinus,
  FaPlus,
  FaHeart,
  FaFacebookF,
  FaTwitter,
  FaPinterest,
  FaInstagram,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaCheck,
  FaWhatsapp,
  FaLinkedinIn,
} from "react-icons/fa";
import image1 from "../assets/unstiched (1).png";
import image2 from "../assets/unstiched (2).png";
import image3 from "../assets/unstiched (3).png";
import image4 from "../assets/unstiched (4).png";
import { Link } from "react-router-dom";
import { Context } from "../Context/Context";
import Footer from "../components/Footer/Footer";

const ProductDetail = () => {
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("Rose Red");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImage, setCurrentImage] = useState(image1);
  const productImages = [image1, image2, image3, image4];
  const { setOpenCart } = useContext(Context);

  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = [
    { name: "Rose Red", code: "#E11D48" },
    { name: "Midnight Blue", code: "#1E3A8A" },
    { name: "Sage Green", code: "#15803D" },
  ];

  const shareProduct = (platform) => {
    const productUrl = encodeURIComponent(window.location.href);
    const productName = encodeURIComponent(
      "Floral Print Maxi Dress - Summer Collection"
    );
    const text = encodeURIComponent("Check out this beautiful dress I found!");

    const shareConfig = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${productUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${productUrl}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${productUrl}&description=${productName}`,
      whatsapp: `https://api.whatsapp.com/send?text=${text} ${productUrl}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${productUrl}&title=${productName}`,
      instagram: `https://www.instagram.com/?url=${productUrl}`, // Note: Instagram doesn't support direct sharing
    };

    if (shareConfig[platform]) {
      window.open(shareConfig[platform], "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-6">
          <div className="aspect-square overflow-hidden rounded-2xl shadow-lg border-2 border-gray-100">
            <img
              src={currentImage}
              alt="Floral Maxi Dress"
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
              Floral Print Maxi Dress
            </h1>
            <p className="text-2xl font-semibold text-rose-600 mb-6">$89.99</p>
          </div>

          {/* Description List */}
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Product Details
            </h2>

            <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
              <p className="text-base text-gray-800 font-medium">
                Stitched 3-Piece Suit
              </p>

              <ul className="list-disc list-inside space-y-1">
                <li>
                  <span className="font-medium">Shirt:</span> Printed Cambric
                  Shirt
                </li>
                <li>
                  <span className="font-medium">Dupatta:</span> Printed Chiffon
                  Dupatta
                </li>
                <li>
                  <span className="font-medium">Trouser:</span> Dyed Cambric
                  Trouser
                </li>
                <li>
                  <span className="font-medium">Work Technique:</span> Digital
                  Printed
                </li>
              </ul>

              <p className="mt-2">
                <span className="font-medium">Model Info:</span> Height 5'7" —
                Wearing size 8
              </p>

              <p className="mt-4 text-gray-600 italic">
                Please note: Colors may slightly vary due to lighting and screen
                settings.
              </p>
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Color: <span className="font-normal">{color}</span>
            </h3>
            <div className="flex gap-3">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                    color === c.name
                      ? "border-rose-500 ring-2 ring-rose-200"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: c.code }}
                  title={c.name}
                >
                  {color === c.name && (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          {/* <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Size: <span className="font-normal">{size}</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-6 py-3 rounded-lg border-2 font-medium transition-colors ${
                    size === s
                      ? "bg-rose-500 border-rose-500 text-white"
                      : "bg-white border-gray-200 hover:border-gray-300 text-gray-800"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <Link
              to="/size-guide"
              className="mt-2 inline-block text-rose-600 hover:text-rose-700 text-sm"
            >
              View size guide
            </Link>
          </div> */}

          {/* Quantity & Actions */}
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
                onClick={() => setOpenCart(true)}
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
          {/* Social Sharing */}
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Share This Product
            </h3>
            <div className="flex gap-4">
              {[
                {
                  icon: FaFacebookF,
                  platform: "facebook",
                  color: "bg-blue-600",
                },
                {
                  icon: FaWhatsapp,
                  platform: "whatsapp",
                  color: "bg-green-500",
                },
                {
                  icon: FaInstagram,
                  platform: "instagram",
                  color: "bg-pink-600",
                },
                { icon: FaTwitter, platform: "twitter", color: "bg-sky-500" },
                {
                  icon: FaPinterest,
                  platform: "pinterest",
                  color: "bg-red-600",
                },
                {
                  icon: FaLinkedinIn,
                  platform: "linkedin",
                  color: "bg-blue-800",
                },
              ].map((social, index) => (
                <button
                  key={index}
                  onClick={() => shareProduct(social.platform)}
                  className={`p-3 rounded-full text-white hover:opacity-90 transition-opacity ${social.color} tooltip`}
                  data-tip={social.platform}
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
