import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AddCategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: "", type: "" });
  const [description, setDescription] = useState("");
  const [active, setActive] = useState("Y");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchCollection = async () => {
        try {
          const response = await axios.get(
            `https://henza.zaffarsons.com/henza/Collection/${id}`
          );
          const collection = response.data;
          setDescription(collection.VALUE_SET_DESCRIPTION);
          setActive(collection.ACTIVE);
          
          // FIX: Use the correct image path from the API response
          setCurrentImage(collection.image); 
        } catch (error) {
          setMessage({ 
            text: "Failed to load collection: " + error.message, 
            type: "error" 
          });
        }
      };
      fetchCollection();
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setCurrentImage(""); // Clear current image when new image is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!description) {
      setMessage({ text: "Description is required", type: "error" });
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("active", active);
    if (image) formData.append("image", image);

    try {
      let response;
      if (id) {
        response = await axios.put(
          `https://henza.zaffarsons.com/henza/update-collection/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        if (!image) {
          setMessage({ text: "Image is required", type: "error" });
          setIsSubmitting(false);
          return;
        }
        
        response = await axios.post(
          "https://henza.zaffarsons.com/henza/add-Collection",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (response.status === 200 || response.status === 201) {
        setMessage({
          text: `Collection ${id ? "updated" : "added"} successfully!`,
          type: "success",
        });
        setTimeout(() => navigate("/dashboard/Collection"), 1500);
      } else {
        setMessage({
          text: response.data?.message || `Error ${id ? "updating" : "adding"} collection`,
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: "Error: " + (error.response?.data?.error || error.message),
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {id ? "Edit Collection" : "Add New Collection"}
      </h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
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

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description *
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Status</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="Y"
                checked={active === "Y"}
                onChange={() => setActive("Y")}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Active</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="N"
                checked={active === "N"}
                onChange={() => setActive("N")}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Inactive</span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="image">
            {id ? "Update Image" : "Image *"}
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required={!id}
          />
          
          {(preview || currentImage) && (
            <div className="mt-4">
              <img 
                src={preview || currentImage} 
                alt="Preview" 
                className="h-48 w-full object-contain border rounded" 
              />
              {!preview && currentImage && (
                <p className="text-sm text-gray-500 mt-2">Current image</p>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/collections")}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isSubmitting 
              ? (id ? "Updating..." : "Adding...") 
              : (id ? "Update Collection" : "Add Collection")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryPage;