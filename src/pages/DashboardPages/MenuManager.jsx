import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";

const MenuManager = () => {
  const [menus, setMenus] = useState([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [parentId, setParentId] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [editId, setEditId] = useState(null);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);

  // Load menus
  const loadMenus = () => {
    setLoading(true);
    axios
      .get("https://henza.zaffarsons.com/henza/get-menus")
      .then((res) => {
        setMenus(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMenus();
  }, []);

const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("url", url);
  formData.append("parentId", parentId ? parseInt(parentId) : "");
  formData.append("sortOrder", parseInt(sortOrder));
  if (imageFile) {
    formData.append("menuImage", imageFile); // 👈 use 'menuImage' as key
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

  if (editId) {
    axios
      .put(`https://henza.zaffarsons.com/henza/update-menu/${editId}`, formData, config)
      .then(() => {
        alert("Menu updated");
        resetForm();
        loadMenus();
      })
      .catch((err) => console.error(err));
  } else {
    axios
      .post("https://henza.zaffarsons.com/henza/add-menus", formData, config)
      .then(() => {
        alert("Menu added");
        resetForm();
        loadMenus();
      })
      .catch((err) => console.error(err));
  }
};


  // Handle edit
  const handleEdit = (menu) => {
    setEditId(menu.id);
    setName(menu.name);
    setUrl(menu.url);
    setParentId(menu.parentId || "");
    setSortOrder(menu.sortOrder);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this menu?")) {
      axios
        .delete(`https://henza.zaffarsons.com/henza/delete-menu/${id}`)
        .then(() => {
          alert("Menu deleted");
          loadMenus();
        })
        .catch((err) => console.error(err));
    }
  };

  // Reset form fields
 const resetForm = () => {
  setEditId(null);
  setName("");
  setUrl("");
  setParentId("");
  setSortOrder(0);
  setImageFile(null);
};


  // Build hierarchical menu structure
  const buildTree = (items) => {
    const map = {};
    const roots = [];
    items.forEach((item) => {
      map[item.id] = { ...item, children: [] };
    });
    items.forEach((item) => {
      if (item.parentId) {
        map[item.parentId]?.children?.push(map[item.id]);
      } else {
        roots.push(map[item.id]);
      }
    });
    return roots;
  };

  // Toggle menu expansion
  const toggleMenuExpansion = (id) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Render menu hierarchy
  const renderMenuTree = (nodes, level = 0) => {
    return (
      <ul className={`${level > 0 ? "pl-6 mt-2" : ""}`}>
        {nodes.map((node) => (
          <li key={node.id} className="mb-2">
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
              <div className="flex items-center">
                <span className="font-medium">{node.name}</span>
                <span className="text-gray-500 text-sm ml-3">{node.url}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(node)}
                  className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded hover:bg-blue-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(node.id)}
                  className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded hover:bg-red-50"
                >
                  Delete
                </button>
                {node.children.length > 0 && (
                  <button
                    onClick={() => toggleMenuExpansion(node.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <ChevronDownIcon
                      className={`w-4 h-4 transition-transform ${
                        expandedMenus[node.id] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
              </div>
            </div>
            {expandedMenus[node.id] &&
              node.children.length > 0 &&
              renderMenuTree(node.children, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  const menuTree = buildTree(menus);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Menu Manager</h1>
          <p className="text-blue-100">
            Create and manage your navigation menus
          </p>
        </div>

        {/* Form Section */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {editId ? "Edit Menu" : "Add New Menu"}
            </h2>
            {editId && (
              <button
                onClick={resetForm}
                className="flex items-center text-gray-500 hover:text-gray-700 text-sm"
              >
                <XMarkIcon className="w-4 h-4 mr-1" />
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Menu Name *
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="e.g. Home, Products, About"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL
                </label>
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="e.g. /products, /about"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parent Menu
                </label>
                <select
                  value={parentId}
                  onChange={(e) => setParentId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">None (Top Level Menu)</option>
                  {menus.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort Order
                </label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Menu Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
              >
                {editId ? "Update Menu" : "Add Menu"}
              </button>
            </div>
          </form>
        </div>

        {/* Menu Display Section */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Menu Structure
            </h2>
            <button
              onClick={loadMenus}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : menus.length === 0 ? (
            <div className="text-center py-10">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No menus
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new menu item.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-5 bg-gray-50 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="col-span-2">Menu Name</div>
                <div>URL</div>
                <div>Parent</div>
                <div>Actions</div>
              </div>
              <div className="divide-y divide-gray-200">
                {renderMenuTree(menuTree)}
              </div>
            </div>
          )}
        </div>

        {/* Preview Section */}
        <div className="p-6 bg-gray-50 border-t">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Menu Preview
          </h2>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex space-x-6 font-medium text-gray-700">
              {menuTree.slice(0, 3).map((menu) => (
                <div key={menu.id} className="relative group pb-2">
                  <button className="flex items-center hover:text-blue-600">
                    {menu.name}
                    {menu.children.length > 0 && (
                      <ChevronDownIcon className="w-4 h-4 ml-1" />
                    )}
                  </button>
                  {menu.children.length > 0 && (
                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-10">
                      {menu.children.map((child) => (
                        <a
                          key={child.id}
                          href={child.url || "#"}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {menuTree.length > 3 && (
                <div className="relative group pb-2">
                  <button className="flex items-center hover:text-blue-600">
                    More <ChevronDownIcon className="w-4 h-4 ml-1" />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-10">
                    {menuTree.slice(3).map((menu) => (
                      <a
                        key={menu.id}
                        href={menu.url || "#"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {menu.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            This preview shows how your menu will appear on the website. Hover
            over items to see dropdowns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MenuManager;
