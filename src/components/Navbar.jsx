import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect, useContext } from "react";
import { FaUser, FaShoppingCart, FaSearch, FaTimes } from "react-icons/fa";
import { FaShopify } from "react-icons/fa";
import { Context } from "../Context/Context";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenMobileOpen, setIsMenMobileOpen] = useState(false);
  const [isSaleMobileOpen, setIsSaleMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { openCart, setOpenCart } = useContext(Context);

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
    setIsMenMobileOpen(false);
    setIsSaleMobileOpen(false);
  };

  const DropdownContent = ({ items }) => (
    <div className="fixed top-20 left-[30%] bg-white shadow-lg p-6 z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 xl:w-[700px] lg:w-[500px] md:w-[390px] rounded">
      <div className="grid grid-cols-4 gap-6">
        {items.map((section, index) => (
          <div key={index}>
            <h4 className="font-bold mb-2">{section.title}</h4>
            {section.links.map((link, linkIndex) => (
              <Link
                key={linkIndex}
                to={link.to}
                className="block mb-1 hover:text-blue-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  const womenItems = [
    {
      title: "SHOP BY CATEGORY",
      links: [
        { to: "/category/Everyday", label: "Everyday Wear" },
        { to: "/category/Luxury", label: "Luxury Wear" }
      ]
    },
    {
      title: "SHOP BY TYPE",
      links: [
        { to: "/category/Embroidered", label: "Embroidered" },
        { to: "/category/Printed", label: "Printed" }
      ]
    },
    {
      title: "SHOP BY PCS",
      links: [
        { to: "/category/2%20Piece", label: "2 Pc" },
        { to: "/category/3%20Piece", label: "3 Pc" }
      ]
    },
    {
      title: "SHOP BY FABRIC",
      links: [
        { to: "/category/Lawn", label: "Lawn" },
        { to: "/category/Cambric", label: "Cambric" },
        { to: "/category/Khaddar", label: "Khaddar" }
      ]
    }
  ];

  const towelsItems = [
    {
      title: "SHOP BY TYPE",
      links: [
        { to: "/category/Summer", label: "Summer Towels" },
        { to: "/category/Beach", label: "Beach Towels" }
      ]
    },
    {
      title: "SHOP BY SIZE",
      links: [
        { to: "/size/Large", label: "Large" },
        { to: "/size/Medium", label: "Medium" }
      ]
    },
    {
      title: "SHOP BY MATERIAL",
      links: [
        { to: "/material/Cotton", label: "Cotton" },
        { to: "/material/Microfiber", label: "Microfiber" }
      ]
    },
    {
      title: "SHOP BY DESIGN",
      links: [
        { to: "/design/Printed", label: "Printed" },
        { to: "/design/Plain", label: "Plain" }
      ]
    }
  ];

  const bedSheetsItems = [
    {
      title: "SHOP BY SIZE",
      links: [
        { to: "/size/King", label: "King Size" },
        { to: "/size/Queen", label: "Queen Size" }
      ]
    },
    {
      title: "SHOP BY MATERIAL",
      links: [
        { to: "/material/Cotton", label: "Cotton" },
        { to: "/material/Silk", label: "Silk" }
      ]
    },
    {
      title: "SHOP BY DESIGN",
      links: [
        { to: "/design/Printed", label: "Printed" },
        { to: "/design/Plain", label: "Plain" }
      ]
    },
    {
      title: "SHOP BY COLLECTION",
      links: [
        { to: "/collection/Summer", label: "Summer Collection" },
        { to: "/collection/Winter", label: "Winter Collection" }
      ]
    }
  ];

    const token = localStorage.getItem('authToken');

  return (
    <nav className="bg-white shadow-sm text-sm mt-6 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Zeeki Logo" className="mt-3 h-28" />
          </div>

          {/* Desktop Menu Items */}
          <div className="hidden md:flex space-x-6 font-semibold">
            <Link to={"/"} className="hover:text-blue-600">
              HOME
            </Link>
            <Link to={"/dashboard"} className="hover:text-blue-600">
              NEW ARRIVALS
            </Link>

            {/* Women Dropdown */}
            <div className="relative group pb-2">
              <button className="flex items-center hover:text-blue-600">
                WOMEN <ChevronDownIcon className="w-4 h-4 ml-1" />
              </button>
              <DropdownContent items={womenItems} />
            </div>

            {/* Towels Dropdown */}
            <div className="relative group pb-2">
              <button className="flex items-center hover:text-blue-600">
                TOWELS <ChevronDownIcon className="w-4 h-4 ml-1" />
              </button>
              <DropdownContent items={towelsItems} />
            </div>

            {/* Bed Sheets Dropdown */}
            <div className="relative group pb-2">
              <button className="flex items-center text-red-600">
                BED SHEETS <ChevronDownIcon className="w-4 h-4 ml-1" />
              </button>
              <DropdownContent items={bedSheetsItems} />
            </div>

            <Link to={"/customer-policy"} className="hover:text-blue-600">
              CUSTOMER POLICY
            </Link>
            <Link to={"/contactUS"} className="hover:text-blue-600">
              CONTACT US
            </Link>
            {
              token ? 
            <Link to={"/dashboard"} className="hover:text-blue-600">
              DASHBOARD
            </Link>
            :
            <Link to={"/login"} className="hover:text-blue-600">
              LOGIN
            </Link>
            }
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
          <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-md z-20">
            <div className="px-4 py-2">
              <Link to="/" className="block py-3 hover:text-blue-600" onClick={closeAllDropdowns}>
                HOME
              </Link>
              <Link to="/" className="block py-3 hover:text-blue-600" onClick={closeAllDropdowns}>
                NEW ARRIVALS
              </Link>

              {/* Women Mobile Dropdown */}
              <div className="border-b">
                <button
                  className="w-full flex justify-between items-center py-3 hover:text-blue-600"
                  onClick={() => setIsMenMobileOpen(!isMenMobileOpen)}
                >
                  WOMEN
                  <ChevronDownIcon
                    className={`w-4 h-4 ml-1 transition-transform ${
                      isMenMobileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isMenMobileOpen && (
                  <div className="pl-4 pb-2">
                    {womenItems.map((section, index) => (
                      <div key={index}>
                        <h4 className="font-semibold mt-2 mb-1">{section.title}</h4>
                        {section.links.map((link, linkIndex) => (
                          <Link
                            key={linkIndex}
                            to={link.to}
                            className="block py-2 hover:text-blue-600"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Towels Mobile Dropdown */}
              <div className="border-b">
                <button
                  className="w-full flex justify-between items-center py-3 hover:text-blue-600"
                  onClick={() => setIsSaleMobileOpen(!isSaleMobileOpen)}
                >
                  TOWELS
                  <ChevronDownIcon
                    className={`w-4 h-4 ml-1 transition-transform ${
                      isSaleMobileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isSaleMobileOpen && (
                  <div className="pl-4 pb-2">
                    {towelsItems.map((section, index) => (
                      <div key={index}>
                        <h4 className="font-semibold mt-2 mb-1">{section.title}</h4>
                        {section.links.map((link, linkIndex) => (
                          <Link
                            key={linkIndex}
                            to={link.to}
                            className="block py-2 hover:text-blue-600"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bed Sheets Mobile Dropdown */}
              <div className="border-b">
                <button
                  className="w-full flex justify-between items-center py-3 text-red-600"
                  onClick={() => setIsSaleMobileOpen(!isSaleMobileOpen)}
                >
                  BED SHEETS
                  <ChevronDownIcon
                    className={`w-4 h-4 ml-1 transition-transform ${
                      isSaleMobileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isSaleMobileOpen && (
                  <div className="pl-4 pb-2">
                    {bedSheetsItems.map((section, index) => (
                      <div key={index}>
                        <h4 className="font-semibold mt-2 mb-1">{section.title}</h4>
                        {section.links.map((link, linkIndex) => (
                          <Link
                            key={linkIndex}
                            to={link.to}
                            className="block py-2 hover:text-blue-600"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/customer-policy" className="block py-3 hover:text-blue-600" onClick={closeAllDropdowns}>
                CUSTOMER POLICY
              </Link>
              <Link to="/contactUS" className="block py-3 hover:text-blue-600" onClick={closeAllDropdowns}>
                CONTACT US
              </Link>
              {
              token ? 
            <Link to={"/dashboard"} className="block py-3 hover:text-blue-600">
              DASHBOARD
            </Link>
            :
            <Link to={"/login"} className="block py-3 hover:text-blue-600">
              LOGIN
            </Link>
            }
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;