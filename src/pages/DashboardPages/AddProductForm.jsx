import { useState } from 'react';

const AddProductForm = () => {
  const [product, setProduct] = useState({
    id: "product-001",
    productName: "Embroidered Lawn 3PC Suit",
    productDescription: "A beautifully crafted 3-piece embroidered lawn suit with chiffon dupatta and dyed cambric trousers. Perfect for summer events and casual wear.",
    price: 4999,
    discount: 15,
    categories: ["Women", "Unstitched", "Summer Collection"],
    productColor: ["#98FF98", "#FFFFFF", "#004225"],
    type: "3PC",
    images: [
      "https://example.com/images/product1-front.jpg",
      "https://example.com/images/product1-back.jpg",
      "https://example.com/images/product1-closeup.jpg"
    ],
    inventory: {
      SKU: "WL-3PC-MG-2025",
      inStock: true,
      quantityAvailable: 24,
      lowStockThreshold: 5
    }
  });

  const [newCategory, setNewCategory] = useState("");
  const [newColor, setNewColor] = useState("");
  const [newImage, setNewImage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleInventoryChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prev => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const addCategory = () => {
    if (newCategory && !product.categories.includes(newCategory)) {
      setProduct(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory]
      }));
      setNewCategory("");
    }
  };

  const removeCategory = (categoryToRemove) => {
    setProduct(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat !== categoryToRemove)
    }));
  };

  const addColor = () => {
    if (newColor && !product.productColor.includes(newColor)) {
      setProduct(prev => ({
        ...prev,
        productColor: [...prev.productColor, newColor]
      }));
      setNewColor("");
    }
  };

  const removeColor = (colorToRemove) => {
    setProduct(prev => ({
      ...prev,
      productColor: prev.productColor.filter(color => color !== colorToRemove)
    }));
  };

  const addImage = () => {
    if (newImage && !product.images.includes(newImage)) {
      setProduct(prev => ({
        ...prev,
        images: [...prev.images, newImage]
      }));
      setNewImage("");
    }
  };

  const removeImage = (imageToRemove) => {
    setProduct(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== imageToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product data:", product);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">Product Form</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              
              <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-700">Product ID</label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={product.id}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 p-3 outline-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={product.productName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 p-3 outline-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="productDescription"
                  name="productDescription"
                  rows={3}
                  value={product.productDescription}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 p-3 outline-none shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            
            {/* Pricing */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Pricing</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (PKR)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md p-3 outline-none border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount (%)</label>
                  <input
                    type="number"
                    id="discount"
                    name="discount"
                    value={product.discount}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="mt-1 block w-full rounded-md p-3 outline-none  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            
            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Categories</h3>
              
              <div className="flex flex-wrap gap-2">
                {product.categories.map((category, index) => (
                  <span key={index} className="inline-flex  items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {category}
                    <button
                      type="button"
                      onClick={() => removeCategory(category)}
                      className="ml-1.5 inline-flex text-indigo-400 hover:text-indigo-600 focus:outline-none"
                    >
                      <span className="sr-only">Remove category</span>
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Add new category"
                  className="flex-1 rounded-l-md p-3 outline-none border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={addCategory}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add
                </button>
              </div>
            </div>
            
            {/* Colors */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Colors</h3>
              
              <div className="flex flex-wrap gap-4">
                {product.productColor.map((color, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-8 h-8 rounded-full border border-gray-300"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                    <button
                      type="button"
                      onClick={() => removeColor(color)}
                      className="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  placeholder="Add new color (hex code)"
                  className="flex-1 rounded-l-md p-3 outline-none border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={addColor}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add
                </button>
              </div>
            </div>
            
            {/* Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
              <select
                id="type"
                name="type"
                value={product.type}
                onChange={handleChange}
                className="mt-1 block w-full p-4 outline-none border rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="3PC">3PC</option>
                <option value="2PC">2PC</option>
                <option value="1PC">1PC</option>
              </select>
            </div>
            
            {/* Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Images</h3>
              
              <div className="space-y-2">
                {product.images.map((image, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-1 truncate text-sm text-gray-500">{image}</div>
                    <button
                      type="button"
                      onClick={() => removeImage(image)}
                      className="ml-2 text-sm text-red-600 hover:text-red-900"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="Add new image URL"
                  className="flex-1 rounded-l-md p-3 outline-none border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={addImage}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add
                </button>
              </div>
            </div>
            
            {/* Inventory */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Inventory</h3>
              
              <div>
                <label htmlFor="SKU" className="block text-sm font-medium text-gray-700">SKU</label>
                <input
                  type="text"
                  id="SKU"
                  name="SKU"
                  value={product.inventory.SKU}
                  onChange={handleInventoryChange}
                  className="mt-1 p-3 outline-none block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quantityAvailable" className="block text-sm font-medium text-gray-700">Quantity Available</label>
                  <input
                    type="number"
                    id="quantityAvailable"
                    name="quantityAvailable"
                    value={product.inventory.quantityAvailable}
                    onChange={handleInventoryChange}
                    className="mt-1 block p-3 outline-none w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="lowStockThreshold" className="block text-sm font-medium text-gray-700">Low Stock Threshold</label>
                  <input
                    type="number"
                    id="lowStockThreshold"
                    name="lowStockThreshold"
                    value={product.inventory.lowStockThreshold}
                    onChange={handleInventoryChange}
                    className="mt-1 block p-3 outline-none w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inStock"
                  name="inStock"
                  checked={product.inventory.inStock}
                  onChange={handleInventoryChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="inStock" className="ml-2 block text-sm text-gray-900">In Stock</label>
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-6">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;