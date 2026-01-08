import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { logo } from '../utils/icons';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/productSlice';
import { toast, ToastContainer } from 'react-toastify';
import useProfile from '../hooks/useProfile';

const Header = () => {
  const token = localStorage.getItem("token");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {checkRole} =useProfile();
  const [role, setRole]=useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeCollection, setActiveCollection] = useState(false);
  const profileDropdownRef = useRef(null);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const profileButtonRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!location.pathname.includes('/products')) {
      setActiveCategory(null);
      setActiveCollection(false);
    }
  }, [location]);

  useEffect(() => {
    const fetchRole = async () => {
      const userRole = await checkRole();
      setRole(userRole);
    };
    fetchRole();
  }, []);

  const categories = [
    { id: 1, name: "New Arrivals", value: 'isNewArrival'},
    { id: 2, name: "Best Seller", value: 'isBestSeller'},
    { id: 3, name: "Special Collection", value: 'specialCollection'},
    { id: 4, name: "Top Discounts", value: 'isOnSale'}
  ];

  const handleProductClick = () => {
    const initialFilters = {
      gender: [],
      category: [],
      brand: [],
      material: [],
      color: [],
      occasion: [],
      season: [],
      searchQuery: '',
      priceRange: [0, 10000],
      isNewArrival: '',
      isBestSeller: '',
      isOnSale: '',
      specialCollection: ''
    };

    setActiveCategory(null);
    setActiveCollection(true);
    setIsMenuOpen(false);

    navigate('/products', { 
      state: { 
        initialFilters: initialFilters
      }
    });
  };
  
  const handleCollectionClick = (collectionValue) => {
    const initialFilters = {
      gender: [],
      category: [],
      brand: [],
      material: [],
      color: [],
      occasion: [],
      season: [],
      searchQuery: '',
      priceRange: [0, 10000],
      isNewArrival: '',
      isBestSeller: '',
      isOnSale: '',
      specialCollection: ''
    };

    initialFilters[collectionValue] = 'true';
    setActiveCategory(collectionValue);
    setActiveCollection(false);
    setIsMenuOpen(false);

    navigate('/products', { 
      state: { 
        initialFilters: initialFilters
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && 
          !profileDropdownRef.current.contains(event.target) && 
          !profileButtonRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }

      if (window.innerWidth < 768) {
        if (menuRef.current && 
            !menuRef.current.contains(event.target) && 
            !menuButtonRef.current.contains(event.target)) {
          setIsMenuOpen(false);
        }
      }
    };

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setIsProfileDropdownOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      dispatch(setFilters({ searchQuery: searchQuery.trim() }));
      navigate('/products', { 
        state: { 
          initialFilters: {
            gender: [],
            category: [],
            brand: [],
            material: [],
            color: [],
            occasion: [],
            season: [],
            searchQuery: searchQuery.trim(),
            priceRange: [0, 10000],
            isBestSeller: '',
            isOnSale: '',
            specialCollection: '',
            isNewArrival: '',
          }
        }
      });
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

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
      setIsProfileDropdownOpen(false);
    }, 2000);

    navigate('/login');
  };

  const getCategoryClasses = (categoryValue) => `
    relative text-gray-700 hover:text-emerald-600 transition-colors duration-200
    after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-emerald-500
    after:left-0 after:bottom-[-4px] after:transition-all after:duration-300
    hover:after:w-full cursor-pointer
    ${activeCategory === categoryValue ? 'text-emerald-700 font-semibold after:w-full' : ''}
  `;

  const getAllCollectionsClasses = () => `
    relative text-gray-700 hover:text-emerald-600 transition-colors duration-200
    after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-emerald-500
    after:left-0 after:bottom-[-4px] after:transition-all after:duration-300
    hover:after:w-full cursor-pointer
    ${activeCollection && !activeCategory ? 'text-emerald-700 font-semibold after:w-full' : ''}
  `;

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-3 py-2 sm:py-4">
        <div className="flex items-center justify-between w-full">
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              ref={menuButtonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 rounded-lg hover:bg-emerald-50 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <img 
                src={logo} 
                alt="Logo" 
                className="h-8 w-auto min-w-0 mr-1 transition-transform duration-300 group-hover:scale-105"
              />
              <h1 className="text-lg sm:text-xl font-bold text-emerald-950 tracking-tight group-hover:text-emerald-700 transition-colors duration-200 truncate">
                ECOSPRINT
              </h1>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center justify-center flex-grow mx-4 lg:mx-8 max-w-xl">
            <div className="flex items-center w-full border-2 border-gray-200 hover:border-emerald-300 focus-within:border-emerald-500 rounded-full px-3 py-1.5 transition-all duration-200">
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                type="text" 
                placeholder="Search products..." 
                className="w-full outline-none text-sm bg-transparent"
              />
              <button 
                onClick={handleSearchClick}
                className="text-gray-500 hover:text-emerald-600 transition-colors duration-200 flex-shrink-0"
                aria-label="Search"
              >
                <IoSearch className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1 md:gap-2 lg:gap-3">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-1 rounded-lg hover:bg-emerald-50 transition-colors duration-200"
              aria-label="Toggle search"
            >
              <IoSearch size={20} />
            </button>

            <Link 
              to="/cart" 
              className="p-1 rounded-lg hover:bg-emerald-50 transition-colors duration-200"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />
            </Link>

            <div className="relative" ref={profileDropdownRef}>
              <button 
                ref={profileButtonRef}
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="p-1 rounded-lg hover:bg-emerald-50 transition-colors duration-200"
                aria-label="Profile menu"
              >
                <CgProfile size={20} />
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
  <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50">
    {!token ? (
      <>
        <NavLink 
          to="/register"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-200"
          onClick={() => setIsProfileDropdownOpen(false)}
        >
          Register
        </NavLink>
        <NavLink 
          to="/login"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-200"
          onClick={() => setIsProfileDropdownOpen(false)}
        >
          Login
        </NavLink>
      </>
    ) : role==='Admin' ? (
      <>
        <NavLink 
          to="/profile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-200"
          onClick={() => setIsProfileDropdownOpen(false)}
        >
          My Account
        </NavLink>
        <NavLink 
          to="/admin-dashboard"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-200"
          onClick={() => setIsProfileDropdownOpen(false)}
        >
          Admin Dashboard
        </NavLink>
        <button
          onClick={handleLogout}
          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-200"
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <NavLink 
          to="/profile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-200"
          onClick={() => setIsProfileDropdownOpen(false)}
        >
          My Account
        </NavLink>
        
        <button
          onClick={handleLogout}
          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-200"
        >
          Logout
        </button>
      </>
    )}
  </div>
)}

            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden px-2 pt-2">
            <div className="flex items-center border-2 border-gray-200 focus-within:border-emerald-500 rounded-full px-3 py-1.5 transition-all duration-200">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search products..." 
                className="w-full outline-none text-sm bg-transparent"
              />
              <button 
                onClick={handleSearchClick}
                className="text-gray-500 hover:text-emerald-600 transition-colors duration-200"
                aria-label="Search"
              >
                <IoSearch className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <div 
          ref={menuRef} 
          className={`${
            isMenuOpen ? 'max-h-64' : 'max-h-0'
          } md:max-h-none overflow-hidden transition-all duration-300 ease-in-out md:overflow-visible`}
        >
          <div className="mt-2 md:mt-4 flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-8">
            <button 
              className={getAllCollectionsClasses()}
              onClick={() => {
                setActiveCategory(null);
                setActiveCollection(true);
                setIsMenuOpen(false);
                handleProductClick();
              }}
            >
              All Collections
            </button>
            {categories.map((category) => (
              <button 
                key={category.id}
                className={getCategoryClasses(category.value)}
                onClick={() => {
                  setActiveCollection(false);
                  handleCollectionClick(category.value);
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
};

export default Header;