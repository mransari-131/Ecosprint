import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Truck, Shield, RefreshCw } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useProductDetails } from '../hooks/useProductDetails';
import ProductImageGallery from '../components/productdetails/ProductImageGallery';
import ProductRating from '../components/productdetails/ProductRating';
import ProductDetails from '../components/productdetails/ProductDetails';
import { useCart } from '../hooks/useCart';

const ProductDetailPage = () => {
  const { addItem } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProductDetails(id);
  const [selectedSize, setSelectedSize] = useState(null);
  const [status, setStatus] = useState('');

  if (loading) return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>
  );
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;
  if (!product) return null;

  const handleBuyNow = () => {
    if (!selectedSize) {
      setStatus('Please select a size!');
      return;
    }

    navigate('/checkout', {
      state: {
        productData: {
          productId: id,
          name: product.productName,
          image: product.images[0],
          size: product.sizeType+"-"+selectedSize,
          price: product.salePrice,
          quantity: 1,
          // Add other relevant product details
        }
      }
    });
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Please login to continue', {
        position: "top-right",
        autoClose: 3000,
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
        },
      });

      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }

    if (!selectedSize) {
      setStatus('Please select a size!');
      return;
    }

    addItem(id, selectedSize);
    toast.success('Item Added to Cart', {
      position: "top-right",
      autoClose: 5000,
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
      },
    });
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setStatus('');
  };

  return (
    <div className="container mx-auto px-4 py-8 w-screen">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="w-full">
          <ProductImageGallery images={product.images} />
        </div>

        <div className="w-full">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{product.productName}</h1>
                <p className="text-gray-600 mt-2">{product.description}</p>
              </div>
              <button className="text-gray-500 hover:text-red-500">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            <ProductRating averageRating={product.averageRating} totalReviews={product.totalReviews} />

            <div className="mt-4">
              {product.salePrice ? (
                <div>
                  <span className="text-2xl font-bold text-emerald-600">₹{product.salePrice.toFixed(2)}</span>
                  <span className="ml-4 line-through text-gray-500">₹{product.price.toFixed(2)}</span>
                  <span className="ml-4 bg-green-100 text-green-800 px-2 py-1 rounded">
                    {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold">₹{product.price.toFixed(2)}</span>
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Size ({product.sizeType})</h3>
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => {
                  const size = product.size + i;
                  return (
                    <button
                      key={size}
                      className={`px-4 py-2 border rounded-md ${selectedSize === size ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
            {status && <p className="mt-2 text-red-600 font-semibold text-sm">{status}</p>}

            <div className="mt-6 space-y-4">
              <button onClick={handleAddToCart} className="w-full py-3 rounded-md text-white font-semibold bg-emerald-600 hover:bg-emerald-700">
                Add to Cart
              </button>
              <button onClick={handleBuyNow} className="w-full py-3 rounded-md border border-emerald-600 text-emerald-600 font-bold hover:bg-emerald-50">
                Buy Now
              </button>
            </div>
            <ToastContainer />

            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2"><Truck className="w-6 h-6 text-blue-600" /><span>Free Shipping</span></div>
              <div className="flex items-center space-x-2"><Shield className="w-6 h-6 text-green-600" /><span>Secure Payment</span></div>
              <div className="flex items-center space-x-2"><RefreshCw className="w-6 h-6 text-orange-600" /><span>Easy Returns</span></div>
            </div>

            <ProductDetails product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
