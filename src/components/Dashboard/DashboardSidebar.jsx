import { useState, useEffect, useContext } from "react";
import {FiHome,FiEdit2,FiFileText,FiBarChart2,FiUser,FiSettings,FiLogOut,FiMenu,FiX} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import { Context } from "../../Context/Context";
const DashboardSidebar = () => {
  const [selectedTab, setSelectedTab] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const {logout} = useContext(Context)

  const menuItems = [
    {
      id: "",
      label: "HomeScreen",
      icon: <FiSettings />,
      link: "/",
    },
    {
      id: "/dashboard",
      label: "Dashboard",
      icon: <FiHome />,
      link: "/dashboard",
    },
    {
      id: "/dashboard/Themes",
      label: "Themes",
      icon: <FiBarChart2 />,
      link: "/dashboard/Themes",
    },
    {
      id: "/dashboard/Product",
      label: "Product",
      icon: <FiEdit2 />,
      link: "/dashboard/Product",
    },
    {
      id: "/dashboard/Collection",
      label: "Collection",
      icon: <FiFileText />,
      link: "/dashboard/Collection",
    },
    {
      id: "Menu",
      label: "Menu",
      icon: <FiUser />,
      link: "/dashboard/Menu",
    },
  ];

  // Update selected tab based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const currentTab =
      [...menuItems].reverse().find((item) => currentPath.startsWith(item.link))
        ?.id || "dashboard";
    setSelectedTab(currentTab);
  }, [location]);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location]);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
        >
          {isMobileSidebarOpen ? "" : <FiMenu size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-[280px]  p-4 transition-transform duration-300 md:max-h-screen ease-in-out bg-[#fff]    ]
          md:translate-x-0 border-r border-gray-200 ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } 
           z-30`}
        style={{
          fontSize: 16,
        }}
      >
        {/* Logo Section */}
        <div className="mb-8 p-2 bg-white flex justify-between items-center relative">
          <img src={Logo} width={100} className="absolute top-0  left-6" />
          <button
            className="md:hidden p-1"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2 mt-28 bg-white">
          {menuItems.map((item) => (
            <Link
              to={item.link}
              key={item.id}
              onClick={() => setSelectedTab(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                selectedTab === item.id
                  ? "bg-[#c93638] text-pink-700"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
              style={{
                backgroundColor:
                  selectedTab === item.id ? "#ffe4e6" : "transparent",
                color: selectedTab === item.id ? "#c93638" : "#155580",
              }}
            >
              <span className="text-lg mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white"
          style={{ borderColor: "#ddd" }}
        >
          <button
            className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-200"
            style={{
              color: "#444",
              backgroundColor: "#ededed",
            }}
            onClick={() => logout()}
          >
            <FiLogOut />
            <span className="ml-3">Log Out</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default DashboardSidebar;