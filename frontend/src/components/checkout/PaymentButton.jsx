import React from "react";
import { CreditCard } from "lucide-react";
import Razorpay from "razorpay";
import axiosInstance from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";

const PaymentButton = ({
  productData,
  address,
  disabled,
  customerDetails,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_ID;
  const token = localStorage.getItem("token"); 

  const handlePayment = async () => {
      
    
    try {
      if (!address || !productData) {
        console.error("Missing address or productData");
        return;
      }

      const addressId = address?.addressId;
      console.log(productData);

      const requestBody = Array.isArray(productData)
        ? { addressId, items: productData.map(({ productId, quantity, size }) => ({ productId, quantity, size })) }
        : { addressId, productId: productData?.productId, quantity: productData?.quantity, size: productData?.size };

      console.log("Request Body:", requestBody);

      const response = await axiosInstance.post(
        `/orders/buy-now`,
        requestBody,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Order & Payment Response:", response.data);
      const { order, razorpayOrder } = response.data;

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "EcoSprint",
        description: "Payment for your order",
        order_id: razorpayOrder.id,
        handler: async (response) => {
          try {
            await axiosInstance.post(`/orders/payment/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            onPaymentSuccess?.(response);
          } catch (err) {
            console.error("Payment verification failed:", err);
            onPaymentError?.(err);
          }
        },
        prefill: {
          name: customerDetails?.name || "",
          email: customerDetails?.email || "",
          contact: customerDetails?.phone || "",
        },
        notes: {
          address: `${address?.flatHouseBuildingCompanyApartment || ""}, ${address?.areaStreetSectorVillage || ""}, ${address?.townCity || ""}, ${address?.state || ""}, Pincode: ${address?.pincode || ""}, Landmark: ${address?.landmark || ""}`,
        },
        theme: {
          color: "#047857",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      onPaymentError?.(err);
    }
  };

  // Calculate total safely
  const totalPrice = productData
    ? (Array.isArray(productData) 
        ? productData.reduce((total, item) => total + (item?.price || 0) * (item?.quantity || 1), 79)
        : ((productData?.price || 0) * (productData?.quantity || 1) + 79)
      ).toFixed(2)
    : "0.00";

  return (
    <button
      onClick={handlePayment}
      disabled={disabled || !productData}
      className="w-full py-3 px-4 bg-emerald-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <CreditCard className="w-5 h-5" />
      Proceed to Pay ₹{totalPrice}
    </button>
  );
};

export default PaymentButton;
