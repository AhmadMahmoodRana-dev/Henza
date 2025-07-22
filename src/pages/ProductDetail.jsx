import React, { useContext, useEffect, useState, useRef } from "react";
import {FaMinus,FaPlus,FaHeart,FaFacebookF,FaTwitter,FaPinterest,FaInstagram,FaWhatsapp,FaLinkedinIn} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { Context } from "../Context/Context";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import DOMPurify from "dompurify";

const ProductDetail = () => {
  const { id } = useParams();
  const [singleData, setSingleData] = useState({});
  const [productImages, setProductsImages] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { setOpenCart } = useContext(Context);

  console.log("SINFLE DATA",singleData)
  
  // States for zoom functionality
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [zoomBackgroundPosition, setZoomBackgroundPosition] = useState("0% 0%");
  const imageRef = useRef(null);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://henza.zaffarsons.com/henza/get-product/${id}`
      );
      setSingleData(data);
      setProductsImages(data?.images || []);
      setCurrentImage(data?.images?.[0] || "");
      setColor(data?.productColor?.[0] || "");
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToCart = () => {
    const selectedProduct = {
      id: singleData.id,
      name: singleData.productName,
      price: singleData.price,
      color: color,
      quantity: quantity,
      image: currentImage,
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(selectedProduct);
    localStorage.setItem("cart", JSON.stringify(cart));
    setOpenCart(true);
  };

  const shareProduct = (platform) => {
    const productUrl = encodeURIComponent(window.location.href);
    const productName = encodeURIComponent(singleData?.productName || "Product");
    const text = encodeURIComponent("Check out this product I found!");

    const shareConfig = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${productUrl}`,
      whatsapp: `https://api.whatsapp.com/send?text=${text} ${productUrl}`,
    };

    if (shareConfig[platform]) {
      window.open(shareConfig[platform], "_blank", "noopener,noreferrer");
    }
  };

  // Handle mouse move for zoom effect
  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Constrain position to image boundaries
    const constrainedX = Math.max(0, Math.min(x, width));
    const constrainedY = Math.max(0, Math.min(y, height));
    
    // Calculate position percentage for zoom background
    const xPercent = (constrainedX / width) * 100;
    const yPercent = (constrainedY / height) * 100;
    
    setZoomPosition({ x: constrainedX - 30, y: constrainedY - 30 }); // Center the lens (60px diameter)
    setZoomBackgroundPosition(`${xPercent}% ${yPercent}%`);
  };


const getDiscountPercentage = (originalPrice, discountAmount) => {
  if (!originalPrice || originalPrice === 0) return 0;
  return (discountAmount / originalPrice) * 100;
};



const percentage = getDiscountPercentage(singleData?.price, singleData?.discount);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-12">
        {/* Left Side - Images */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-4 w-20">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(img)}
                className="aspect-[3/4] w-full rounded-lg border hover:border-gray-400 overflow-hidden"
              >
                <img
                  src={img}
                  alt={`Thumb ${index}`}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>

          {/* Main Image with Zoom */}
          <div className="relative">
            <div 
              className="w-[400px] h-[550px] border rounded-xl overflow-hidden shadow-sm relative cursor-zoom-in"
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onMouseMove={handleMouseMove}
              ref={imageRef}
            >
              <img
                src={currentImage}
                alt="Product"
                className="w-full h-full object-cover"
              />
              
              {/* Zoom Lens */}
              {showZoom && (
                <div 
                  className="absolute border-2 border-white rounded-full bg-white bg-opacity-20 pointer-events-none shadow-lg"
                  style={{
                    width: "60px",
                    height: "60px",
                    left: `${zoomPosition.x}px`,
                    top: `${zoomPosition.y}px`,
                    zIndex: 10,
                  }}
                />
              )}
              
              {/* Zoom Preview */}
              {showZoom && (
                <div 
                  className="absolute inset-0 w-full h-full z-0"
                  style={{
                    backgroundImage: `url(${currentImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: zoomBackgroundPosition,
                    backgroundSize: "200%",
                    backgroundColor: "white",
                    opacity: 1,
                  }}
                />
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Hover over image to zoom
            </p>
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="flex-1 space-y-6">
          <div>
           <h1 className="text-lg font-light text-gray-600 mb-2">
               {singleData?.collectionName}
             </h1>
             <h1 className="text-3xl font-bold text-gray-900 mb-2 uppercase">
               {singleData?.productName}
             </h1>
             <p className="text-2xl font-bold text-gray-900 mb-2 uppercase">
               ({singleData?.inventory?.SKU})
             </p>
             <div className="flex gap-4">
               <p className="text-xl line-through font-semibold text-black mb-4">
                 PKR {singleData?.price}
               </p>
               <p className="text-xl font-semibold text-rose-600 mb-4">
                 PKR {singleData?.price - singleData?.discount}
               </p>
               </div>
             <p className="text-sm text-gray-400*: mb-4 tracking-widest">
               Item : {singleData?.type}
             </p>
          </div>

          {/* Size */}
          <div>
            <h3 className="text-base font-medium text-gray-700 mb-2">Size</h3>
            <div className="flex gap-2">
              {singleData?.sizes?.map((size) => (
                <button
                  key={size}
                  className="w-12 h-12 border text-sm rounded-md hover:border-black"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <h3 className="text-base font-medium text-gray-700 mb-2">Color</h3>
            <div className="flex gap-3">
              {singleData?.productColor?.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    color === c
                      ? "border-rose-500 ring-2 ring-rose-200"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: c }}
                  title={c}
                />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center gap-2 border rounded-full px-4 py-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-gray-600"
              >
                <FaMinus />
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-gray-600"
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-1 text-lg text-white bg-black hover:bg-gray-800 rounded-lg transition-colors"
            >
              Add to Cart
            </button>
            <Link
              to="/checkout"
              className="flex-1 py-1 text-lg text-black border border-gray-400 rounded-lg text-center hover:bg-gray-100 transition-colors"
            >
              Buy Now
            </Link>
          </div>

          {/* Wishlist */}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="w-full py-2 text-sm rounded-lg border border-gray-300 hover:border-rose-400 flex justify-center items-center gap-2 transition-colors"
          >
            <FaHeart className={`h-4 w-4 ${isWishlisted ? "text-rose-500 fill-current" : ""}`} />
            {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>

          {/* Product Details */}
          {singleData?.productDescription && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Product Details
              </h2>
              <div
                className="text-gray-700 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(singleData.productDescription),
                }}
              />
            </div>
          )}

          {/* Share Section */}
          <div>
            <h3 className="text-base font-medium text-gray-700 mb-3">
              Share This Product
            </h3>
            <div className="flex gap-3">
              {[
                { icon: FaFacebookF, platform: "facebook", color: "bg-blue-600" },
                { icon: FaWhatsapp, platform: "whatsapp", color: "bg-green-500" },
              ].map((social, index) => (
                <button
                  key={index}
                  onClick={() => shareProduct(social.platform)}
                  className={`p-2 rounded-full text-white ${social.color} hover:opacity-90 transition-opacity`}
                >
                  <social.icon className="h-4 w-4" />
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