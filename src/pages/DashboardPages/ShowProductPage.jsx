import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ShowProductPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("https://henza.zaffarsons.com/henza/get-all-products");
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getInventoryColor = (quantity) => {
    const count = parseInt(quantity);
    return isNaN(count) || count > 0 ? "text-gray-700" : "text-red-600";
  };

  const tabs = ["All"];
  const filteredProducts = products;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const toggleProductSelection = (index) => {
    if (selectedProducts.includes(index)) {
      setSelectedProducts(selectedProducts.filter((i) => i !== index));
    } else {
      setSelectedProducts([...selectedProducts, index]);
    }
  };

  const toggleAllSelection = () => {
    const allCurrentIndexes = currentProducts.map((_, i) => startIndex + i);
    if (
      allCurrentIndexes.every((i) => selectedProducts.includes(i)) &&
      selectedProducts.length !== 0
    ) {
      setSelectedProducts(
        selectedProducts.filter((i) => !allCurrentIndexes.includes(i))
      );
    } else {
      setSelectedProducts([...new Set([...selectedProducts, ...allCurrentIndexes])]);
    }
  };

  // Sample handler functions (implementation depends on your state management)
const handleEdit = (product) => {
  // Open edit modal or navigate to edit page
  console.log("Edit product:", product);
};

const handleDelete = (product) => {
  // Confirm and delete product
  if (confirm(`Delete ${product.productName}?`)) {
    console.log("Delete product:", product);
  }
};

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <div className="flex gap-3">
            <Link to={'/dashboard/add-product'} className="px-4 py-2 bg-blue-600 rounded-md text-white text-sm font-medium hover:bg-blue-700 flex items-center">
              Add Product
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium text-sm relative -mb-px ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => {
                setCurrentPage(1);
                setActiveTab(tab);
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="w-12 py-3 pl-4">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 rounded"
            checked={currentProducts.every((_, i) =>
              selectedProducts.includes(startIndex + i)
            )}
            onChange={toggleAllSelection}
          />
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Product
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Name
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Inventory
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          SKU
        </th>
        {/* New Actions column header */}
        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {currentProducts.map((item, index) => {
        const realIndex = startIndex + index;
        return (
          <tr
            key={realIndex}
            className={
              selectedProducts.includes(realIndex)
                ? "bg-blue-50 hover:bg-blue-100"
                : "hover:bg-gray-50"
            }
          >
            <td className="py-3 pl-4">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 rounded"
                checked={selectedProducts.includes(realIndex)}
                onChange={() => toggleProductSelection(realIndex)}
              />
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-gray-200 border rounded-md overflow-hidden">
                  <img
                    src={item?.images?.[0]}
                    alt="product"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-900">
              {item?.productName}
            </td>
            <td
              className={`px-6 py-4 text-sm ${getInventoryColor(
                item?.inventory?.quantityAvailable
              )}`}
            >
              {item?.inventory?.inStock
                ? `${item.inventory.quantityAvailable} in stock`
                : "Out of stock"}
            </td>
            <td className="px-6 py-4 text-sm text-gray-700">
              {item?.inventory?.SKU || <span className="text-gray-400">-</span>}
            </td>
            {/* New Actions column */}
            <td className="px-6 py-4 text-center text-sm font-medium">
              <div className="flex justify-center space-x-2">
                {/* Edit button */}
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:text-blue-900 focus:outline-none"
                  title="Edit product"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(item)}
                  className="text-red-600 hover:text-red-900 focus:outline-none"
                  title="Delete product"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 px-4">
          <div className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(startIndex + itemsPerPage, filteredProducts.length)}
            </span>{" "}
            of <span className="font-medium">{filteredProducts.length}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-50 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded text-sm ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white font-medium"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-50 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
