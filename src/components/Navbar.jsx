import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useContext } from "react";
import { FaUser, FaSearch, FaTimes } from "react-icons/fa";
import { FaShopify } from "react-icons/fa";
import { Context } from "../Context/Context";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import { useMenu } from "../Context/MenuContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const { openCart, setOpenCart } = useContext(Context);
  const { menuTree, loading } = useMenu();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeAllDropdowns = () => {
    setIsMobileMenuOpen(false);
    setExpandedMenus({});
  };

  const toggleMenuExpansion = (id) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Desktop Dropdown Component
  const DesktopDropdown = ({ menu }) => (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-[#f3f3f3] shadow-lg p-6 z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 w-[700px] rounded">
      <div className="grid grid-cols-4 gap-6">
        {menu.children.map((child) => (
          <div key={child.id}>
            <Link
              to={`/menuPages/${child?.name}/${child?.id}`}
              className="font-light text-gray-800 tracking-wide mb-2 uppercase hover:text-[#fc2743]"
            >
              {child.name}
            </Link>
            {child.children.map((grandchild) => (
              <Link
                key={grandchild.id}
                to={grandchild.url || "#"}
                className="block mb-1 hover:text-[#fc2743]"
              >
                {grandchild.name}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  // Mobile Menu Component
  const MobileMenuTree = ({ nodes, level = 0 }) => (
    <ul className={`${level > 0 ? "pl-4" : ""}`}>
      {nodes.map((node) => (
        <li key={node.id} className="border-b">
          {node.children.length > 0 ? (
            <>
              <button
                className="w-full flex justify-between items-center  py-3 hover:text-[#fc2743]"
                onClick={() => toggleMenuExpansion(node.id)}
              >
                {node.name}
                <ChevronDownIcon
                  className={`w-4 h-4 ml-1 transition-transform ${
                    expandedMenus[node.id] ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedMenus[node.id] && (
                <MobileMenuTree nodes={node.children} level={level + 1} />
              )}
            </>
          ) : (
            <Link
              to={node.url || "#"}
              className="block py-3 hover:text-[#fc2743]"
              onClick={closeAllDropdowns}
            >
              {node.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  const token = localStorage.getItem("authToken");

  return (
    <nav className="bg-white shadow-sm text-sm mt-6  sticky top-8 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Zeeki Logo" className=" h-16" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 font-light text-gray-800 tracking-wide">
            <Link to={"/"} className="hover:text-[#fc2743]">
              HOME
            </Link>
            {!loading &&
              menuTree.map((menu) => (
                <div
                  key={menu.id}
                  className="relative group pb-2 flex justify-center"
                >
                  {menu.children.length > 0 ? (
                    <>
                      <button className="flex items-center hover:text-[#fc2743] uppercase">
                        {menu.name} <ChevronDownIcon className="w-4 h-4 ml-1" />
                      </button>
                      <DesktopDropdown menu={menu} />
                    </>
                  ) : (
                    <Link
                      to={menu.id || "#"}
                      className="hover:text-[#fc2743] uppercase"
                    >
                      {menu.name}
                    </Link>
                  )}
                </div>
              ))}

            {token ? (
              <Link to={"/dashboard"} className="hover:text-[#fc2743]">
                DASHBOARD
              </Link>
            ) : (
              <Link to={"/login"} className="hover:text-[#fc2743]">
                LOGIN
              </Link>
            )}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <FaSearch
              size={20}
              className="hidden md:block text-gray-600 cursor-pointer"
            />
            <FaUser
              size={20}
              className="hidden md:block text-gray-600 cursor-pointer"
            />
            <div className="relative">
              <FaShopify
                onClick={() => setOpenCart(!openCart)}
                color="#52872e"
                size={24}
                className="text-gray-600 cursor-pointer"
              />
              <span className="absolute -top-2 -right-2 bg-[#52872e] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                0
              </span>
            </div>
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-[#f3f3f3] shadow-md z-20">
            <div className="px-4 py-2">
              {!loading && <MobileMenuTree nodes={menuTree} />}

              {token ? (
                <Link
                  to={"/dashboard"}
                  className="block py-3 hover:text-[#fc2743]"
                  onClick={closeAllDropdowns}
                >
                  DASHBOARD
                </Link>
              ) : (
                <Link
                  to={"/login"}
                  className="block py-3 hover:text-[#fc2743]"
                  onClick={closeAllDropdowns}
                >
                  LOGIN
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
