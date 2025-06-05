// import axios from "axios";
// import { useState } from "react";
// import BASEURL from "../../constant/BaseUrl";

// const AddProductForm = () => {
//   const [product, setProduct] = useState({
//     id: "",
//     productName: "",
//     productDescription: "",
//     price: 0,
//     discount: 0,
//     categories: [],
//     productColor: [],
//     type: "",
//     images: [],
//     inventory: {
//       SKU: "",
//       inStock: true,
//       quantityAvailable: 0,
//       lowStockThreshold: 0,
//     },
//   });

//   const [newCategory, setNewCategory] = useState("");
//   const [newColor, setNewColor] = useState("");
//   const [newImage, setNewImage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleInventoryChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setProduct((prev) => ({
//       ...prev,
//       inventory: {
//         ...prev.inventory,
//         [name]: type === "checkbox" ? checked : value,
//       },
//     }));
//   };

//   const addCategory = () => {
//     if (newCategory && !product.categories.includes(newCategory)) {
//       setProduct((prev) => ({
//         ...prev,
//         categories: [...prev.categories, newCategory],
//       }));
//       setNewCategory("");
//     }
//   };

//   const removeCategory = (categoryToRemove) => {
//     setProduct((prev) => ({
//       ...prev,
//       categories: prev.categories.filter((cat) => cat !== categoryToRemove),
//     }));
//   };

//   const addColor = () => {
//     if (newColor && !product.productColor.includes(newColor)) {
//       setProduct((prev) => ({
//         ...prev,
//         productColor: [...prev.productColor, newColor],
//       }));
//       setNewColor("");
//     }
//   };

//   const removeColor = (colorToRemove) => {
//     setProduct((prev) => ({
//       ...prev,
//       productColor: prev.productColor.filter(
//         (color) => color !== colorToRemove
//       ),
//     }));
//   };

//   const addImage = () => {
//     if (newImage && !product.images.includes(newImage)) {
//       setProduct((prev) => ({
//         ...prev,
//         images: [...prev.images, newImage],
//       }));
//       setNewImage("");
//     }
//   };

//   const removeImage = (imageToRemove) => {
//     setProduct((prev) => ({
//       ...prev,
//       images: prev.images.filter((img) => img !== imageToRemove),
//     }));
//   };

// const handleSubmit = async (e) => {
//     e.preventDefault();

//     const form = new FormData();

//     // Append text fields
//     form.append("id", product.id);
//     form.append("productName", product.productName);
//     form.append("productDescription", product.productDescription);
//     form.append("price", product.price);
//     form.append("discount", product.discount);
//     form.append("categories", product.categories.join(","));
//     form.append("productColor", product.productColor.join(","));
//     form.append("type", product.type);

//     form.append("SKU", product.inventory.SKU);
//     form.append("inStock", product.inventory.inStock);
//     form.append("quantityAvailable", product.inventory.quantityAvailable);
//     form.append("lowStockThreshold", product.inventory.lowStockThreshold);

//     console.log("Form Data:", product);
//     // Append image files
//     product.images.forEach((img) => form.append("images", img));

//     try {
//       const res = await axios.post(
//         `${BASEURL}henza/add-full-product`,
//         product,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       alert("Product uploaded successfully!");
//       console.log(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="w-full">
//         <div className="bg-white shadow rounded-lg overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h2 className="text-2xl font-semibold text-gray-800">
//               Product Form
//             </h2>
//           </div>

//           <form onSubmit={handleSubmit} className="px-6 py-4 space-y-6">
//             {/* Basic Information */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium text-gray-900">
//                 Basic Information
//               </h3>

//               <div>
//                 <label
//                   htmlFor="id"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Product ID
//                 </label>
//                 <input
//                   type="text"
//                   id="id"
//                   name="id"
//                   value={product.id}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-md border-gray-300 p-3 outline-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="productName"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Product Name
//                 </label>
//                 <input
//                   type="text"
//                   id="productName"
//                   name="productName"
//                   value={product.productName}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-md border-gray-300 p-3 outline-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="productDescription"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Description
//                 </label>
//                 <textarea
//                   id="productDescription"
//                   name="productDescription"
//                   rows={3}
//                   value={product.productDescription}
//                   onChange={handleChange}
//                   className="mt-1 block w-full rounded-md border-gray-300 p-3 outline-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             {/* Pricing */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium text-gray-900">Pricing</h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label
//                     htmlFor="price"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Price (PKR)
//                   </label>
//                   <input
//                     type="number"
//                     id="price"
//                     name="price"
//                     value={product.price}
//                     onChange={handleChange}
//                     className="mt-1 block w-full rounded-md p-3 outline-none border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="discount"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Discount (%)
//                   </label>
//                   <input
//                     type="number"
//                     id="discount"
//                     name="discount"
//                     value={product.discount}
//                     onChange={handleChange}
//                     min="0"
//                     max="100"
//                     className="mt-1 block w-full rounded-md p-3 outline-none  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Categories */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium text-gray-900">Categories</h3>

//               <div className="flex flex-wrap gap-2">
//                 {product.categories.map((category, index) => (
//                   <span
//                     key={index}
//                     className="inline-flex  items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
//                   >
//                     {category}
//                     <button
//                       type="button"
//                       onClick={() => removeCategory(category)}
//                       className="ml-1.5 inline-flex text-indigo-400 hover:text-indigo-600 focus:outline-none"
//                     >
//                       <span className="sr-only">Remove category</span>
//                       &times;
//                     </button>
//                   </span>
//                 ))}
//               </div>

//               <div className="flex">
//                 <input
//                   type="text"
//                   value={newCategory}
//                   onChange={(e) => setNewCategory(e.target.value)}
//                   placeholder="Add new category"
//                   className="flex-1 rounded-l-md p-3 outline-none border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 />
//                 <button
//                   type="button"
//                   onClick={addCategory}
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>

//             {/* Colors */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium text-gray-900">Colors</h3>

//               <div className="flex flex-wrap gap-4">
//                 {product.productColor.map((color, index) => (
//                   <div key={index} className="flex items-center">
//                     <div
//                       className="w-8 h-8 rounded-full border border-gray-300"
//                       style={{ backgroundColor: color }}
//                       title={color}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeColor(color)}
//                       className="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none"
//                     >
//                       &times;
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex">
//                 <input
//                   type="text"
//                   value={newColor}
//                   onChange={(e) => setNewColor(e.target.value)}
//                   placeholder="Add new color (hex code)"
//                   className="flex-1 rounded-l-md p-3 outline-none border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 />
//                 <button
//                   type="button"
//                   onClick={addColor}
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>

//             {/* Type */}
//             <div>
//               <label
//                 htmlFor="type"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Type
//               </label>
//               <select
//                 id="type"
//                 name="type"
//                 value={product.type}
//                 onChange={handleChange}
//                 className="mt-1 block w-full p-4 outline-none border rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//               >
//                 <option value="3PC">3PC</option>
//                 <option value="2PC">2PC</option>
//                 <option value="1PC">1PC</option>
//               </select>
//             </div>

//             {/* Images */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium text-gray-900">Images</h3>

//               <div className="space-x-5 flex ">
//                 {product.images.map((image, index) => (
//                   <div key={index} className="flex items-center gap-3">
//                     <img
//                       src={image}
//                       alt={`Product ${index}`}
//                       className="w-16 h-16 object-cover rounded border"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(image)}
//                       className="text-sm text-red-600 hover:text-red-900"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex items-center gap-4">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={(e) => {
//                     const files = Array.from(e.target.files);
//                     const newImageUrls = files.map((file) =>
//                       URL.createObjectURL(file)
//                     );
//                     setProduct((prev) => ({
//                       ...prev,
//                       images: [...prev.images, ...newImageUrls],
//                     }));
//                   }}
//                   className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//                 />
//               </div>
//             </div>

//             {/* Inventory */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium text-gray-900">Inventory</h3>

//               <div>
//                 <label
//                   htmlFor="SKU"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   SKU
//                 </label>
//                 <input
//                   type="text"
//                   id="SKU"
//                   name="SKU"
//                   value={product.inventory.SKU}
//                   onChange={handleInventoryChange}
//                   className="mt-1 p-3 outline-none block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label
//                     htmlFor="quantityAvailable"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Quantity Available
//                   </label>
//                   <input
//                     type="number"
//                     id="quantityAvailable"
//                     name="quantityAvailable"
//                     value={product.inventory.quantityAvailable}
//                     onChange={handleInventoryChange}
//                     className="mt-1 block p-3 outline-none w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="lowStockThreshold"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Low Stock Threshold
//                   </label>
//                   <input
//                     type="number"
//                     id="lowStockThreshold"
//                     name="lowStockThreshold"
//                     value={product.inventory.lowStockThreshold}
//                     onChange={handleInventoryChange}
//                     className="mt-1 block p-3 outline-none w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="inStock"
//                   name="inStock"
//                   checked={product.inventory.inStock}
//                   onChange={handleInventoryChange}
//                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                 />
//                 <label
//                   htmlFor="inStock"
//                   className="ml-2 block text-sm text-gray-900"
//                 >
//                   In Stock
//                 </label>
//               </div>
//             </div>

//             {/* Form Actions */}
//             <div className="flex justify-end space-x-3 pt-6">
//               <button
//                 type="button"
//                 className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Save Product
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProductForm;

import React, { useState } from "react";
import axios from "axios";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    productName: "",
    productDescription: "",
    price: "",
    discount: "",
    categories: "",
    productColor: "",
    type: "",
    inventory: {
      SKU: "",
      inStock: true,
      quantityAvailable: "",
      lowStockThreshold: "",
    },
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("inventory.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        inventory: {
          ...prev.inventory,
          [key]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setImages(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files).slice(0, 3);
      setImages(files);

      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate image count
    if (images.length !== 3) {
      alert("Please select exactly 3 images");
      return;
    }

    setLoading(true);
    const form = new FormData();

    // Text fields
    form.append("id", formData.id);
    form.append("productName", formData.productName);
    form.append("productDescription", formData.productDescription);
    form.append("price", formData.price);
    form.append("discount", formData.discount);
    form.append("categories", formData.categories);
    form.append("productColor", formData.productColor);
    form.append("type", formData.type);

    form.append("SKU", formData.inventory.SKU);
    form.append("inStock", formData.inventory.inStock);
    form.append("quantityAvailable", formData.inventory.quantityAvailable);
    form.append("lowStockThreshold", formData.inventory.lowStockThreshold);

    // CORRECTED IMAGE UPLOAD
    images.forEach((img) => {
      form.append("images", img); // Fixed field name
    });

    try {
      const res = await axios.post(
        "https://henza.zaffarsons.com/henza/add-full-product",
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Product uploaded successfully!");

      // Reset form
      setFormData({ ...formData });
      setImages([]);
      setPreviewUrls([]);
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      alert(`Upload failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Product Upload Center
            </h1>
            <p className="text-blue-100 max-w-xl mx-auto">
              Add new products to your inventory with all necessary details.
              Ensure you provide accurate information for better customer
              experience.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center py-4 bg-blue-50 border-b">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">1</span>
              </div>
              <div className="w-24 h-1 bg-blue-600"></div>
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">2</span>
              </div>
              <div className="w-24 h-1 bg-blue-300"></div>
              <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center">
                <span className="text-blue-600 font-bold">3</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                  Product Information
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product ID *
                    </label>
                    <input
                      name="id"
                      placeholder="PRD-001"
                      value={formData.id}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name *
                    </label>
                    <input
                      name="productName"
                      placeholder="Enter product name"
                      value={formData.productName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      name="productDescription"
                      placeholder="Detailed product description"
                      value={formData.productDescription}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price ($) *
                      </label>
                      <input
                        name="price"
                        type="number"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount (%)
                      </label>
                      <input
                        name="discount"
                        type="number"
                        placeholder="0"
                        value={formData.discount}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                  Product Details
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categories
                    </label>
                    <input
                      name="categories"
                      placeholder="e.g., Furniture, Decor"
                      value={formData.categories}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Separate multiple categories with commas
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available Colors
                    </label>
                    <input
                      name="productColor"
                      placeholder="e.g., Red, Blue, Green"
                      value={formData.productColor}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Separate multiple colors with commas
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Type
                    </label>
                    <input
                      name="type"
                      placeholder="e.g., 3PC, Set, Individual"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Inventory Information
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          SKU Code
                        </label>
                        <input
                          name="inventory.SKU"
                          placeholder="SKU-001"
                          value={formData.inventory.SKU}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Quantity Available
                          </label>
                          <input
                            name="inventory.quantityAvailable"
                            type="number"
                            placeholder="0"
                            value={formData.inventory.quantityAvailable}
                            onChange={handleChange}
                            min="0"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Low Stock Threshold
                          </label>
                          <input
                            name="inventory.lowStockThreshold"
                            type="number"
                            placeholder="10"
                            value={formData.inventory.lowStockThreshold}
                            onChange={handleChange}
                            min="0"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          />
                        </div>
                      </div>

                      <div className="flex items-center pt-2">
                        <input
                          id="inStock"
                          name="inventory.inStock"
                          type="checkbox"
                          checked={formData.inventory.inStock}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="inStock"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          In Stock
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Product Images
              </h2>

              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                  isDragging
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileInput").click()}
              >
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  <p className="mt-4 text-lg font-medium text-gray-700">
                    Drag & drop images here
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    or click to browse files
                  </p>
                  <p className="mt-2 text-xs text-gray-400">
                    Upload exactly 3 images (PNG, JPG up to 5MB each)
                  </p>
                </div>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  required
                  className="hidden"
                />
              </div>

              {/* Image Previews */}
              {previewUrls.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">
                    Selected Images
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-32 h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                        />
                        <div className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="mt-12 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 rounded-lg font-medium text-white shadow-md transition-all ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 hover:shadow-lg"
                }`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  "Upload Product"
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2023 Product Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
