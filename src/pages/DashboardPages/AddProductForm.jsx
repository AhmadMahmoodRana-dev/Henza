import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { HexColorPicker } from "react-colorful";

const AddProductForm = ({ initialProduct = null }) => {
  const [currentColor, setCurrentColor] = useState("#aabbcc");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [collectionNameOptions, setCollectionNameOptions] = useState([]);
  const [menuNameOptions, setMenuNameOptions] = useState([]);
  const [selectedMenuIds, setSelectedMenuIds] = useState([]);
  const editorRef = useRef(null);
  const navigate = useNavigate();

  const generateHenzaID = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `Henza-${timestamp}-${random}`;
  };

  // State initialization
  const [formData, setFormData] = useState({
    id: generateHenzaID(),
    productName: "",
    productDescription: "",
    price: "",
    discount: "",
    categories: "default",
    menu_ids: "",
    productColor: "",
    type: "",
    collectionName: "",
    sizes: "",
    inventory: {
      active: true,
      SKU: "",
      inStock: true,
      quantityAvailable: "",
      lowStockThreshold: "",
    },
  });

  // Initialize form when initialProduct changes (edit mode)
  useEffect(() => {
    if (initialProduct) {
      // Convert productColor to string if it's an array
      const productColor = Array.isArray(initialProduct.productColor)
        ? initialProduct.productColor.join(",")
        : initialProduct.productColor || "";

      setFormData({
        id: initialProduct.id,
        productName: initialProduct.productName,
        productDescription: initialProduct.productDescription,
        price: initialProduct.price,
        discount: initialProduct.discount,
        categories: initialProduct.categories || "default",
        menu_ids: initialProduct.menu_ids,
        productColor: productColor, // Use converted value
        type: initialProduct.type,
        collectionName: initialProduct.collectionName,
        sizes: initialProduct.sizes,
        inventory: {
          SKU: initialProduct.inventory?.SKU || "",
          inStock: initialProduct.inventory?.inStock || true,
          active:initialProduct.active === "Y" || initialProduct.active === true,
          quantityAvailable: initialProduct.inventory?.quantityAvailable || "",
          lowStockThreshold: initialProduct.inventory?.lowStockThreshold || "",
        },
      });

      if (initialProduct.images && initialProduct.images.length > 0) {
        setExistingImages(initialProduct.images);
        setPreviewUrls(initialProduct.images);
      }

      if (initialProduct.menu_ids) {
        const ids = initialProduct.menu_ids
          .split(",")
          .filter((id) => id !== "");
        setSelectedMenuIds(ids);
      }
    }
  }, [initialProduct]);

  const handleEditorChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      productDescription: content,
    }));
  };

  const getCollectionName = async () => {
    try {
      const { data } = await axios.get(
        `https://henza.zaffarsons.com/henza/Collection`
      );
      const activeProducts = data.filter((product) => product?.ACTIVE === "Y");
      setCollectionNameOptions(activeProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const getMenuName = async () => {
    try {
      const { data } = await axios.get(
        `https://henza.zaffarsons.com/henza/get-menu-product`
      );
      setMenuNameOptions(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCollectionName();
    getMenuName();
  }, []);

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
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleMenuSelection = (menuId) => {
    const updatedIds = selectedMenuIds.includes(menuId)
      ? selectedMenuIds.filter((id) => id !== menuId)
      : [...selectedMenuIds, menuId];

    setSelectedMenuIds(updatedIds);
    setFormData((prev) => ({
      ...prev,
      menu_ids: updatedIds.join(","),
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);
  };

  const removeImage = (index, isExisting = false) => {
    if (isExisting) {
      const removedUrl = existingImages[index];
      setRemovedImages((prev) => [...prev, removedUrl]);

      const newExisting = [...existingImages];
      newExisting.splice(index, 1);
      setExistingImages(newExisting);
    } else {
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
    }

    const newUrls = [...previewUrls];
    newUrls.splice(index, 1);
    setPreviewUrls(newUrls);
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
      const files = Array.from(e.dataTransfer.files);
      setImages((prev) => [...prev, ...files]);

      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...urls]);
    }
  };

  // Add color to productColor
  const handleAddColor = () => {
    if (!currentColor) return;
    const cleanColor = currentColor.replace("#", "");

    setFormData((prev) => {
      const currentColors = prev.productColor
        ? prev.productColor.split(",").filter((c) => c)
        : [];

      if (!currentColors.includes(`#${cleanColor}`)) {
        return {
          ...prev,
          productColor: [...currentColors, `#${cleanColor}`].join(","),
        };
      }
      return prev;
    });
  };

  // Remove color from productColor
  const handleRemoveColor = (color) => {
    setFormData((prev) => ({
      ...prev,
      productColor: prev.productColor
        .split(",")
        .filter((c) => c !== color)
        .join(","),
    }));
  };

  // Validate form function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.productName.trim())
      newErrors.productName = "Product name is required";

    if (!formData.productDescription.trim())
      newErrors.productDescription = "Description is required";

    if (!formData.price) newErrors.price = "Price is required";

    if (!formData.collectionName)
      newErrors.collectionName = "Collection is required";

    if (previewUrls.length === 0)
      newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    if (formData?.discount > 100) {
      toast.error("Discount cannot be more than 100%");
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
    form.append("categories", formData.categories || "default");
    form.append("productColor", formData.productColor);
    form.append("type", formData.type);
    form.append("collectionName", formData.collectionName);
    form.append("menu_ids", formData.menu_ids);
    form.append("sizes", formData.sizes);
    form.append("active", formData.active == true ? "Y" : "N");

    form.append("SKU", formData.inventory.SKU);
    form.append("inStock", formData.inventory.inStock);
    form.append("quantityAvailable", formData.inventory.quantityAvailable);
    form.append("lowStockThreshold", formData.inventory.lowStockThreshold);

    // Handle images for edit mode
    if (initialProduct) {
      existingImages.forEach((img) => {
        form.append("existingImages", img);
      });

      removedImages.forEach((img) => {
        form.append("removedImages", img);
      });
    }

    // Append new images
    images.forEach((img) => {
      form.append("images", img);
    });

    try {
      if (initialProduct) {
        const res = await axios.put(
          `https://henza.zaffarsons.com/henza/update-product/${formData.id}`,
          form,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log(res);
        navigate("/");
      } else {
        const res = await axios.post(
          "https://henza.zaffarsons.com/henza/add-full-product",
          form,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log(form);
      }
      navigate("/");

      toast.success(
        initialProduct
          ? "Product updated successfully!"
          : "Product uploaded successfully!"
      );

      // Reset form only if not in edit mode
      if (!initialProduct) {
        setFormData({
          ...formData,
          id: generateHenzaID(),
          productName: "",
          productDescription: "",
          price: "",
          discount: "",
          categories: "",
          menu_ids: "",
          productColor: "",
          type: "",
          collectionName: "",
          sizes: "",
          inventory: {
            SKU: "",
            inStock: true,
            quantityAvailable: "",
            lowStockThreshold: "",
            active: "Y",
          },
        });
        setImages([]);
        setPreviewUrls([]);
        setSelectedMenuIds([]);
        setExistingImages([]);
        setRemovedImages([]);
        setErrors({});
      }
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      toast.error(
        `Operation failed: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  // Filter menu options
  const parentIds = new Set(
    menuNameOptions.map((item) => item.parentId).filter((id) => id !== null)
  );

  const filtered = menuNameOptions.filter((item) => {
    const isSubmenu = item.parentId !== null;
    const isTopLevelWithoutChildren =
      item.parentId === null && !parentIds.has(item.id);
    return isSubmenu || isTopLevelWithoutChildren;
  });

  const menuresult = filtered.map(({ id, name }) => ({ id, name }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {initialProduct ? "Edit Product" : "Product Upload Center"}
            </h1>
            <p className="text-blue-100 max-w-xl mx-auto">
              {initialProduct
                ? "Update product details and images"
                : "Add new products to your inventory with all necessary details"}
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
                      readOnly
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
                      className={`w-full px-4 py-2.5 border ${
                        errors.productName
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                    />
                    {errors.productName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.productName}
                      </p>
                    )}
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <div
                      className={
                        errors.productDescription
                          ? "border border-red-500 rounded"
                          : ""
                      }
                    >
                      <Editor
                        apiKey={import.meta.env.VITE_TINYMCEKEY}
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        value={formData.productDescription}
                        onEditorChange={handleEditorChange}
                        init={{
                          height: 300,
                          menubar: true,
                          plugins: [
                            "advlist autolink lists link charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime table paste code help wordcount",
                          ],
                          toolbar:
                            "undo redo | formatselect | " +
                            "bold italic backcolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                      />
                    </div>
                    {errors.productDescription && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.productDescription}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Collection *
                    </label>
                    <select
                      name="collectionName"
                      value={formData.collectionName}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2.5 border ${
                        errors.collectionName
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none`}
                    >
                      <option value="" disabled>
                        Select a collection
                      </option>
                      {collectionNameOptions?.map((collection) => {
                        return (
                          <option
                            key={collection.VALUE_SET_DESCRIPTION}
                            value={collection?.VALUE_SET_DESCRIPTION}
                          >
                            {collection?.VALUE_SET_DESCRIPTION}
                          </option>
                        );
                      })}
                    </select>
                    {errors.collectionName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.collectionName}
                      </p>
                    )}
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      name="categories"
                      value={formData.categories}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2.5 border ${
                        errors.categories ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Kids">Kids</option>
                    </select>
                    {errors.categories && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.categories}
                      </p>
                    )}
                  </div> */}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Menus
                    </label>
                    <div className="space-y-2 max-h-40 overflow-y-auto p-2 border rounded">
                      {menuresult?.map((menu) => {
                        return (
                          <div key={menu.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`menu-${menu.id}`}
                              checked={selectedMenuIds.includes(menu.id)}
                              onChange={() => handleMenuSelection(menu.id)}
                              className="mr-2"
                            />
                            <label
                              htmlFor={`menu-${menu.id}`}
                              className="text-sm"
                            >
                              {menu.name}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
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
                        className={`w-full px-4 py-2.5 border ${
                          errors.price ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                      />
                      {errors.price && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.price}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount
                      </label>
                      <input
                        name="discount"
                        type="number"
                        placeholder="0"
                        value={formData.discount}
                        onChange={handleChange}
                        min="0"
                        max={formData.price}
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
                      Available Colors
                    </label>

                    {/* Color display and management */}
                    <div className="mb-2">
                      <div className="flex flex-wrap gap-2">
                        {formData.productColor &&
                          String(formData.productColor)
                            .split(",")
                            .filter((c) => c)
                            .map((color, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-1 px-2 py-1 rounded-md text-xs"
                                style={{
                                  backgroundColor: `${color}20`,
                                  border: `1px solid ${color}`,
                                }}
                              >
                                <div
                                  className="w-4 h-4 rounded-full border border-gray-300"
                                  style={{ backgroundColor: color }}
                                ></div>
                                <span>{color}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveColor(color)}
                                  className="text-gray-500 hover:text-red-500"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                      </div>
                    </div>

                    {/* Color picker UI */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowColorPicker(!showColorPicker)}
                        className="flex items-center gap-2 mb-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Add Color
                      </button>

                      {showColorPicker && (
                        <div className="absolute z-10 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                          <HexColorPicker
                            color={currentColor}
                            onChange={setCurrentColor}
                            className="mb-3"
                          />

                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded border border-gray-300"
                              style={{ backgroundColor: currentColor }}
                            ></div>
                            <input
                              type="text"
                              value={currentColor}
                              onChange={(e) => setCurrentColor(e.target.value)}
                              className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                            <button
                              type="button"
                              onClick={handleAddColor}
                              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <p className="mt-1 text-xs text-gray-500">
                      Selected colors will appear above
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available Sizes
                    </label>
                    <input
                      name="sizes"
                      placeholder="e.g., S, M, L, XL"
                      value={formData.sizes}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Separate multiple sizes with commas
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

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
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
                        <div className="flex items-center">
                          <input
                            id="active"
                            name="active"
                            type="checkbox"
                            checked={formData.active}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor="active"
                            className="ml-2 block text-sm text-gray-700"
                          >
                            Active
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="mb-8 flex items-center gap-4 bg-[#ffe4e6] py-2 px-4 rounded-2xl">
                <div className="bg-[#c93638] rounded-full w-2 h-2" />
                <p className="text-sm text-[#c93638]">
                  Image size must be 600X850 pixels or smaller.
                </p>
              </div>

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
                    Upload multiple images (PNG, JPG up to 5MB each)
                  </p>
                </div>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
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
                    {previewUrls.map((url, index) => {
                      const isExisting = existingImages.includes(url);
                      return (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-32 h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index, isExisting)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            ×
                          </button>
                          {isExisting && (
                            <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-br-lg">
                              Existing
                            </div>
                          )}
                          <div className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            {index + 1}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {errors.images && (
                <p className="mt-2 text-sm text-red-500">{errors.images}</p>
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
                    {initialProduct ? "Updating..." : "Uploading..."}
                  </span>
                ) : initialProduct ? (
                  "Update Product"
                ) : (
                  "Upload Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
