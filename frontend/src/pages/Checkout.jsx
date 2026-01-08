import React, { useState, useEffect } from "react";
import OrderSummary from "../components/checkout/OrderSummary";
import PaymentButton from "../components/checkout/PaymentButton";
import AddressSelection from "../components/checkout/AddressSelection";
import { useNavigate, useLocation } from "react-router-dom";

import {useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { ArrowLeft, MapPin } from "lucide-react";
import useAddresses from "../hooks/useAddresses";
import useProfile from "../hooks/useProfile";
import useCart from "../hooks/useCart";
import { ToastContainer, toast } from "react-toastify";

const Checkout = () => {
  const profile = useSelector((state) => state.profile);
  const { fetchProfile } = useProfile();
  const { fetchCart } = useCart();

  useEffect(() => {
    fetchProfile();
    fetchCart();
  }, []);

  const { addresses, fetchAddress } = useAddresses();

  useEffect(() => {
    fetchAddress();
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const { productData } = location.state || { productData: null };

  const [selectedAddress, setSelectedAddress] = useState(null);

  React.useEffect(() => {
    if (!productData && !location.state?.cartCheckout) {
      navigate("/");
    }
  }, [productData, navigate]);

  const subtotal = Array.isArray(productData)
    ? productData.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : productData
    ? productData.price * productData.quantity
    : 0;

  const shipping = 79;
  const total = subtotal + shipping;

  const handlePaymentClick = () => {
    if (!selectedAddress) {
      toast.warn("Please select an address before proceeding to payment!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: "#FAD767",
          color: "#3C423A",
          border: "2px solid white",
        },
        progressStyle: {
          background: "white",
        },
      });
      return;
    }
  };

  const handlePaymentSuccess = (response) => {
    toast.success("Payment successful!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: "#FAD767",
        color: "#3C423A",
        border: "2px solid white",
      },
      progressStyle: {
        background: "white",
      },
    });
    setTimeout(() => {
      navigate("/profile", {
        state: {
          orderDetails: response,
          paymentId: response.razorpay_payment_id,
        },
      });
    }, 1500);
  };

  const handlePaymentError = (error) => {
    toast.error("Payment failed. Please try after some time...", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: "#FAD767",
        color: "#3C423A",
        border: "2px solid white",
      },
      progressStyle: {
        background: "white",
      },
    });
    setTimeout(() => {
      navigate("/checkout");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-semibold text-emerald-800">Checkout</h1>
          </div>
        </div>
      </header>
      <ToastContainer />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <OrderSummary items={[productData]} subtotal={subtotal} shipping={shipping} total={total} />
          </div>

          {/* Right Column */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-emerald-600" />
              Delivery Address
            </h3>

            <AddressSelection addresses={addresses} selectedAddress={selectedAddress} onAddressSelect={setSelectedAddress} />

            <div className="mt-6">
              <PaymentButton
                productData={productData}
                address={selectedAddress}
                customerDetails={profile}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
                disabled={!selectedAddress} // Disable button if no address is selected
                onClick={handlePaymentClick} // Show toast message if button is clicked without an address
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
