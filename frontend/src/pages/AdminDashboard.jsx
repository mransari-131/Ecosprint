import { useState, useEffect, useRef } from "react";
import { Menu, User, ShoppingBag, MapPin, LogOut, ChevronRight, StoreIcon, UploadCloud, ListCheck } from "lucide-react";
import AllProducts from "../components/adminDashboard/AllProducts";
import useProfile from "../hooks/useProfile";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AllOrders from "../components/adminDashboard/AllOrders";

const AdminDashboard =() => {

  const navigate = useNavigate();
  const { checkRole, profile } = useProfile();
  const [role, setRole] = useState(null);
  const [activeTab, setActiveTab] = useState("All Products");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRole = async () => {
      const userRole = await checkRole();
      setRole(userRole);
    };
    fetchRole();
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (role && role !== "Admin") {
      navigate("/");
    }
  }, [token, role, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    { title: "All Products", icon: StoreIcon },
    { title: "All Orders", icon: ListCheck },
  ];

  const handleLogout = () => {
    toast.success('You are successfully logged out!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: '#FAD767',
        color: '#3C423A',
        border: '2px solid white',
      },
      progressStyle: {
        background: 'white'
      }
    });

    setTimeout(() => {
      localStorage.removeItem("token");
    }, 2000);

    navigate('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case "All Products":
        return <AllProducts />;
      case "All Orders":
        return <AllOrders />;
      default:
        return <AllProducts />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-4 bg-emerald-600 text-white flex items-center justify-between w-full shadow-md relative z-20"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="flex items-center gap-2">
          <Menu className="w-5 h-5" />
          <span className="font-medium">Menu</span>
        </div>
        <span className="text-sm">{activeTab}</span>
      </button>
      <ToastContainer />

      {/* Sidebar */}
      <div
        ref={menuRef}
        className={`fixed md:relative md:w-72 bg-emerald-700 text-white border-r border-emerald-100 shadow-lg md:shadow-none transition-transform duration-300 transform 
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 w-64 h-full z-30 top-0 left-0`}
      >
        <div className="p-6 h-screen flex flex-col border-2 lg:h-">
          <div className="bg-emerald-600 rounded-lg p-4 mb-6 mt-8 md:mt-0 lg:mt-0">
            <h2 className="text-2xl mb-2 font-semibold">Admin Panel</h2>
            <p className="text-sm">Manage your account and content</p>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map(({ title, icon: Icon }) => (
              <button
                key={title}
                onClick={() => {
                  setActiveTab(title);
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${activeTab === title ? "bg-emerald-500" : "hover:bg-emerald-600"}`}
              >
                <Icon className="w-5 h-5" />
                {title}
                <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${activeTab === title ? "rotate-90" : ""}`} />
              </button>
            ))}
            <button
            onClick={handleLogout}
            className="mt-auto w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-600 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
          </nav>

          
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-200 p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
