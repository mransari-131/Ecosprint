import React from 'react';
import { Package } from "lucide-react";

const OrderItem = ({ item }) => {
  // Return null if item is null/undefined
  if (!item) {
    return null;
  }

  // Handle array of items recursively
  if (Array.isArray(item)) {
    // Filter out any null/undefined items and map
    return (
      <>
        {item.filter(Boolean).map((subItem) => (
          <OrderItem 
            key={subItem?.productId || Math.random().toString()} 
            item={subItem} 
          />
        ))}
      </>
    );
  }

  // Safety check for required properties
  if (!item.productId || !item.name) {
    return null;
  }

  // Calculate total amount properly with safety checks
  const unitPrice = item.price ?? item.amount ?? 0;
  const totalAmount = unitPrice * (item.quantity || 1);

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 mb-4 overflow-hidden">
      <div className="p-3 sm:p-4 md:p-6">
        {/* Main Container */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6">
          {/* Image Section */}
          <div className="relative w-24 sm:w-28 md:w-32 aspect-square rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
            <img
              src={item.image || '/api/placeholder/200/200'}
              alt={item.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            {/* Quantity Badge */}
            <div className="absolute top-0 right-0 bg-emerald-500 text-white px-2 py-1 text-xs font-medium rounded-bl-lg">
              Qty: {item.quantity || 1}
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0 w-full">
            <div className="flex flex-col gap-2 sm:gap-3">
              {/* Product Details */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2 sm:gap-3">
                    {item.size && (
                      <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-emerald-50 text-emerald-700">
                        Size: {item.size}
                      </span>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Unit Price:</span>
                      <span className="text-emerald-600 font-semibold">
                        ₹{unitPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Total Price */}
                <div className="flex sm:flex-col items-center sm:items-end gap-2 mt-2 sm:mt-0">
                  <p className="text-xs sm:text-sm text-gray-500">Total Amount</p>
                  <p className="font-semibold text-base sm:text-lg text-gray-900">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PriceBreakdown = ({ subtotal = 0, shipping = 0, total = 0 }) => (
  <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 bg-gray-50 p-3 sm:p-4 md:p-6 rounded-lg">
    <div className="flex justify-between text-sm sm:text-base text-gray-600">
      <span>Subtotal</span>
      <span>₹{subtotal.toLocaleString("en-IN")}</span>
    </div>
    <div className="flex justify-between text-sm sm:text-base text-gray-600">
      <span>Shipping</span>
      <span>₹{shipping.toLocaleString("en-IN")}</span>
    </div>
    <div className="flex justify-between text-base sm:text-lg font-semibold text-gray-900 border-t pt-3 sm:pt-4">
      <span>Total</span>
      <span>₹{total.toLocaleString("en-IN")}</span>
    </div>
  </div>
);

const OrderSummary = ({ items, subtotal = 0, shipping = 0, total = 0 }) => {
  // Handle empty or null items
  if (!items || (Array.isArray(items) && items.length === 0)) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No items in order</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <h3 className="text-base sm:text-lg font-medium flex items-center gap-2 px-2 sm:px-0">
        <Package className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
        Order Summary
      </h3>
      <div className="space-y-3">
        <OrderItem item={items} />
      </div>
      <PriceBreakdown subtotal={subtotal} shipping={shipping} total={total} />
    </div>
  );
};

export default OrderSummary;