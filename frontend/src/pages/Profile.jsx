import { useState, useEffect, useRef } from "react";
import { Menu, User, ShoppingBag, MapPin, LogOut, ChevronRight } from "lucide-react";
import ProfileSettings from "../components/profile/ProfileSettings";
import MyOrders from "../components/profile/MyOrders";
import Addresses from "../components/profile/Addresses";
import useProfile from "../hooks/useProfile";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  
  const navigate = useNavigate();
  const user = useProfile;
  const [activeTab, setActiveTab] = useState("Profile Settings");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

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
    { title: "Profile Settings", icon: User },
    { title: "Your Orders", icon: ShoppingBag },
    { title: "Saved Addresses", icon: MapPin },
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
      case "Profile Settings":
        return <ProfileSettings user={user} />;
      case "Your Orders":
        return <MyOrders/>;
      case "Saved Addresses":
        return <Addresses user={user} />;
      default:
        return <ProfileSettings user={user} />;
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
        className={`fixed md:relative md:w-72 bg-white border-r border-emerald-100 shadow-lg md:shadow-none transition-transform duration-300 transform 
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 w-64 h-full z-30 top-0 left-0`}
      >
        <div className="p-6 h-full flex flex-col ">
          <div className="bg-emerald-50 rounded-lg p-4 mb-6 mt-8 md:mt-0 lg:mt-0">
            <h2 className="text-xl font-semibold text-emerald-800">Welcome Back!</h2>
            <p className="text-sm text-emerald-600">Manage your account</p>
          </div>

          <nav className="flex-1">
            <div className="space-y-1">
              {menuItems.map(({ title, icon: Icon }) => (
                <button
                  key={title}
                  onClick={() => {
                    setActiveTab(title);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    ${activeTab === title 
                      ? "bg-emerald-50 text-emerald-700" 
                      : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  {title}
                  <ChevronRight className={`w-4 h-4 ml-auto transition-transform
                    ${activeTab === title ? "rotate-90" : ""}`}
                  />
                </button>
              ))}
              
              <NavLink
                to="/cart"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
              >
                <ShoppingBag className="w-5 h-5" />
                Your Cart
              </NavLink>
            </div>
          </nav>

          <button
            onClick={handleLogout}
            className="mt-auto flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm lg:p-6 md:p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;