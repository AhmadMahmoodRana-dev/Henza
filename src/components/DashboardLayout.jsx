import DashboardSidebar from "./Dashboard/DashboardSidebar";

const DashboardLayout = ({ children }) => {
    return (
      <div className="min-h-screen flex">
        {/* Sidebar */}
       <DashboardSidebar/>
  
        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-50 md:ml-[280px]">{children}</main>
      </div>
    );
  };
  
  export default DashboardLayout;
  