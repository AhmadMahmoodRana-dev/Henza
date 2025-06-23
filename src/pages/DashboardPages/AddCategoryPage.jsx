import axios from "axios";
import { useState } from "react";

const AddCategoryPage = () => {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setMessage({ text: "All fields are required", type: "error" });
      return;
    }

    try {
      const response = await axios.post(
        "https://henza.zaffarsons.com/henza/add-Collection",
        {
          description: name,
        }
      );

     console.log(response,"CATEGORY RESPONSE")

      if (response.status == "201") {
        setMessage({ text: "Category added successfully!", type: "success" });
        setName("");
      } else {
        setMessage({
          text: result.message || "Error adding carousel",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({ text: "Network error: " + error.message, type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="min-w-auto max-w-md md:min-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Category
        </h2>

        {message.text && (
          <div
            className={`mb-4 p-3 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Category Name"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryPage;
