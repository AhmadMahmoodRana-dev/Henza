// import React, { useContext, useEffect, useState, useRef } from "react";
// import {
//   FaMinus,
//   FaPlus,
//   FaHeart,
//   FaFacebookF,
//   FaTwitter,
//   FaPinterest,
//   FaInstagram,
//   FaWhatsapp,
//   FaLinkedinIn,
// } from "react-icons/fa";
// import { Link, useParams } from "react-router-dom";
// import { Context } from "../Context/Context";
// import Footer from "../components/Footer/Footer";
// import axios from "axios";
// import DOMPurify from "dompurify";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [singleData, setSingleData] = useState({});
//   const [productImages, setProductsImages] = useState([]);
//   const [currentImage, setCurrentImage] = useState("");
//   const [color, setColor] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const { setOpenCart } = useContext(Context);
  
//   // Lens zoom states
//   const [isZoomActive, setIsZoomActive] = useState(false);
//   const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
//   const [zoomedPosition, setZoomedPosition] = useState({ x: 0, y: 0 });
//   const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  
//   const imageContainerRef = useRef(null);
//   const lensRef = useRef(null);
//   const zoomedRef = useRef(null);

//   const fetchData = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://henza.zaffarsons.com/henza/get-product/${id}`
//       );
//       setSingleData(data);
//       setProductsImages(data?.images || []);
//       setCurrentImage(data?.images?.[0] || "");
//       setColor(data?.productColor?.[0] || "");
//     } catch (error) {
//       console.error("Failed to fetch product:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Update container size on resize and initial load
//   useEffect(() => {
//     const updateContainerSize = () => {
//       if (imageContainerRef.current) {
//         const { width, height } = imageContainerRef.current.getBoundingClientRect();
//         setContainerSize({ width, height });
//       }
//     };
    
//     updateContainerSize();
//     window.addEventListener('resize', updateContainerSize);
    
//     return () => {
//       window.removeEventListener('resize', updateContainerSize);
//     };
//   }, [currentImage]);

//   const handleMouseMove = (e) => {
//     if (!imageContainerRef.current || !lensRef.current || !zoomedRef.current) return;
    
//     const containerRect = imageContainerRef.current.getBoundingClientRect();
//     const lensRect = lensRef.current.getBoundingClientRect();
    
//     // Calculate cursor position relative to the container
//     const x = e.clientX - containerRect.left;
//     const y = e.clientY - containerRect.top;
    
//     // Calculate lens position (centered on cursor)
//     const lensX = Math.max(0, Math.min(x - lensRect.width / 2, containerRect.width - lensRect.width));
//     const lensY = Math.max(0, Math.min(y - lensRect.height / 2, containerRect.height - lensRect.height));
    
//     setLensPosition({ x: lensX, y: lensY });
    
//     // Calculate background position for zoomed view
//     const zoomedX = -(x * 2 - lensRect.width / 2);
//     const zoomedY = -(y * 2 - lensRect.height / 2);
    
//     setZoomedPosition({ x: zoomedX, y: zoomedY });
//   };

//   const shareProduct = (platform) => {
//     const productUrl = encodeURIComponent(window.location.href);
//     const productName = encodeURIComponent(
//       singleData?.productName || "Product"
//     );
//     const text = encodeURIComponent("Check out this product I found!");

//     const shareConfig = {
//       facebook: `https://www.facebook.com/sharer/sharer.php?u=${productUrl}`,
//       twitter: `https://twitter.com/intent/tweet?text=${text}&url=${productUrl}`,
//       pinterest: `https://pinterest.com/pin/create/button/?url=${productUrl}&description=${productName}`,
//       whatsapp: `https://api.whatsapp.com/send?text=${text} ${productUrl}`,
//       linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${productUrl}&title=${productName}`,
//       instagram: `https://www.instagram.com/?url=${productUrl}`,
//     };

//     if (shareConfig[platform]) {
//       window.open(shareConfig[platform], "_blank", "noopener,noreferrer");
//     }
//   };

//   const handleAddToCart = () => {
//     const selectedProduct = {
//       id: singleData.id,
//       name: singleData.productName,
//       price: singleData.price,
//       color: color,
//       quantity: quantity,
//       image: currentImage,
//     };

//     // Example logic: storing in localStorage
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     cart.push(selectedProduct);
//     localStorage.setItem("cart", JSON.stringify(cart));

//     setOpenCart(true);
//   };

//   return (
//     <>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
//         {/* Product Images */}
//         <div className="space-y-6">
//           {/* Main Image with Lens Zoom */}
//           <div 
//             className="relative w-full overflow-hidden rounded-2xl shadow-lg border-2 border-gray-100"
//             style={{ aspectRatio: "600 / 850" }}
//             ref={imageContainerRef}
//             onMouseEnter={() => setIsZoomActive(true)}
//             onMouseLeave={() => setIsZoomActive(false)}
//             onMouseMove={handleMouseMove}
//           >
//             <img
//               src={currentImage}
//               alt="Product"
//               className="w-full h-full object-cover"
//             />
            
//             {/* Lens overlay */}
//             {isZoomActive && currentImage && (
//               <div 
//                 ref={lensRef}
//                 className="absolute border-2 border-white rounded-full shadow-lg cursor-none pointer-events-none"
//                 style={{
//                   width: '150px',
//                   height: '150px',
//                   left: `${lensPosition.x}px`,
//                   top: `${lensPosition.y}px`,
//                   zIndex: 10,
//                   backgroundImage: `url(${currentImage})`,
//                   backgroundSize: `${containerSize.width * 2}px ${containerSize.height * 2}px`,
//                   backgroundPosition: `-${lensPosition.x * 2}px -${lensPosition.y * 2}px`,
//                   backgroundRepeat: 'no-repeat',
//                 }}
//               />
//             )}
//           </div>

//           {/* Zoomed Preview Container */}
//           {isZoomActive && currentImage && (
//             <div 
//               className="absolute hidden md:block w-[400px] h-[400px] border-2 border-gray-200 rounded-lg shadow-xl overflow-hidden bg-white z-20"
//               style={{
//                 left: `${imageContainerRef.current?.getBoundingClientRect().right + 20}px`,
//                 top: `${imageContainerRef.current?.getBoundingClientRect().top}px`,
//               }}
//               ref={zoomedRef}
//             >
//               <div 
//                 className="w-full h-full"
//                 style={{
//                   backgroundImage: `url(${currentImage})`,
//                   backgroundSize: `${containerSize.width * 2}px ${containerSize.height * 2}px`,
//                   backgroundPosition: `${zoomedPosition.x}px ${zoomedPosition.y}px`,
//                   backgroundRepeat: 'no-repeat',
//                 }}
//               />
//             </div>
//           )}

//           {/* Thumbnails */}
//           <div className="flex gap-3 pb-4 overflow-x-auto scrollbar-hide">
//             {productImages.map((img, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentImage(img)}
//                 className="shrink-0 focus:outline-none"
//                 style={{ aspectRatio: "600 / 850", width: "80px" }}
//               >
//                 <img
//                   src={img}
//                   alt={`Thumb ${index}`}
//                   className={`w-full h-full object-cover rounded-lg border-2 transition-all ${
//                     currentImage === img
//                       ? "border-rose-500"
//                       : "border-gray-200 hover:border-gray-300"
//                   }`}
//                 />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="space-y-8">
//           <div>
//             <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
//               {singleData?.productName}
//             </h1>
//             <p className="text-2xl font-semibold text-rose-600 mb-6">
//               PKR {singleData?.price}
//             </p>
//           </div>
          
//           {/* Product Description */}
//           {singleData?.productDescription && (
//             <div className="pb-16">
//               <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">
//                 Product Details
//               </h2>
//               <div
//                 className="description-content text-gray-700 text-base leading-relaxed"
//                 dangerouslySetInnerHTML={{
//                   __html: DOMPurify.sanitize(singleData.productDescription),
//                 }}
//               />
//             </div>
//           )}

//           {/* Color Selection */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">
//               Color: <span className="font-normal">{color}</span>
//             </h3>
//             <div className="flex gap-3">
//               {singleData?.productColor?.map((c) => (
//                 <button
//                   key={c}
//                   onClick={() => setColor(c)}
//                   className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
//                     color === c
//                       ? "border-rose-500 ring-2 ring-rose-200"
//                       : "border-gray-200 hover:border-gray-400"
//                   }`}
//                   style={{ backgroundColor: c }}
//                   title={c}
//                 >
//                   {color === c && (
//                     <div className="w-3 h-3 bg-white rounded-full" />
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Quantity & Add to Cart */}
//           <div className="space-y-6">
//             <div className="flex items-center gap-6">
//               <span className="text-lg font-semibold text-gray-800">
//                 Quantity:
//               </span>
//               <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-full">
//                 <button
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                   className="rounded-full h-8 w-8 hover:bg-gray-100 flex items-center justify-center"
//                 >
//                   <FaMinus className="h-4 w-4 text-gray-600" />
//                 </button>
//                 <span className="text-xl font-medium w-8 text-center">
//                   {quantity}
//                 </span>
//                 <button
//                   onClick={() => setQuantity(quantity + 1)}
//                   className="rounded-full h-8 w-8 hover:bg-gray-100 flex items-center justify-center"
//                 >
//                   <FaPlus className="h-4 w-4 text-gray-600" />
//                 </button>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <button
//                 onClick={handleAddToCart}
//                 className="flex-1 py-4 text-lg rounded-xl text-white bg-rose-500 hover:bg-rose-600 transition-colors flex items-center justify-center gap-2"
//               >
//                 Add to Cart
//               </button>
//               <Link
//                 to="/checkout"
//                 className="flex-1 py-4 text-lg rounded-xl text-rose-600 bg-white border-2 border-rose-500 hover:bg-rose-50 transition-colors text-center"
//               >
//                 Buy Now
//               </Link>
//             </div>

//             <button
//               className="w-full py-3 rounded-xl border-2 border-gray-200 hover:border-rose-500 hover:text-rose-600 transition-colors flex items-center justify-center gap-2"
//               onClick={() => setIsWishlisted(!isWishlisted)}
//             >
//               <FaHeart
//                 className={`h-5 w-5 ${
//                   isWishlisted ? "text-rose-500 fill-current" : ""
//                 }`}
//               />
//               {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
//             </button>
//           </div>

//           {/* Social Sharing */}
//           <div className="pt-6 border-t border-gray-100">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">
//               Share This Product
//             </h3>
//             <div className="flex gap-4">
//               {[
//                 {
//                   icon: FaFacebookF,
//                   platform: "facebook",
//                   color: "bg-blue-600",
//                 },
//                 {
//                   icon: FaWhatsapp,
//                   platform: "whatsapp",
//                   color: "bg-green-500",
//                 },
//                 {
//                   icon: FaInstagram,
//                   platform: "instagram",
//                   color: "bg-pink-600",
//                 },
//                 { icon: FaTwitter, platform: "twitter", color: "bg-sky-500" },
//                 {
//                   icon: FaPinterest,
//                   platform: "pinterest",
//                   color: "bg-red-600",
//                 },
//                 {
//                   icon: FaLinkedinIn,
//                   platform: "linkedin",
//                   color: "bg-blue-800",
//                 },
//               ].map((social, index) => (
//                 <button
//                   key={index}
//                   onClick={() => shareProduct(social.platform)}
//                   className={`p-3 rounded-full text-white hover:opacity-90 transition-opacity ${social.color}`}
//                 >
//                   <social.icon className="h-5 w-5" />
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default ProductDetail;


import React, { useContext, useEffect, useState, useRef } from "react";
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

          {/* Main Image */}
          <div className="w-[400px] h-[550px] border rounded-xl overflow-hidden shadow-sm">
            <img
              src={currentImage}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {singleData?.productName}
            </h1>
            <p className="text-2xl font-semibold text-rose-600 mb-4">
              PKR {singleData?.price}
            </p>
          </div>

          {/* Size */}
          <div>
            <h3 className="text-base font-medium text-gray-700 mb-2">Size</h3>
            <div className="flex gap-2">
              {[8, 10, 12, 14, 16].map((size) => (
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
              className="flex-1 py-3 text-lg text-white bg-black hover:bg-gray-800 rounded-lg"
            >
              Add to Cart
            </button>
            <Link
              to="/checkout"
              className="flex-1 py-3 text-lg text-black border border-gray-400 rounded-lg text-center hover:bg-gray-100"
            >
              Buy Now
            </Link>
          </div>

          {/* Wishlist */}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="w-full py-3 text-sm rounded-lg border border-gray-300 hover:border-rose-400 flex justify-center items-center gap-2"
          >
            <FaHeart className={`h-4 w-4 ${isWishlisted ? "text-rose-500" : ""}`} />
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
                { icon: FaInstagram, platform: "instagram", color: "bg-pink-500" },
                { icon: FaTwitter, platform: "twitter", color: "bg-sky-500" },
                { icon: FaPinterest, platform: "pinterest", color: "bg-red-600" },
                { icon: FaLinkedinIn, platform: "linkedin", color: "bg-blue-800" },
              ].map((social, index) => (
                <button
                  key={index}
                  onClick={() => shareProduct(social.platform)}
                  className={`p-2 rounded-full text-white ${social.color}`}
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