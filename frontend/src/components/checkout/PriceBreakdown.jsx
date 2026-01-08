// PriceBreakdown.jsx
import React from 'react';

const PriceBreakdown = ({ subtotal, shipping, total }) => (
  <div className="mt-4 space-y-2">
    <div className="flex justify-between">
      <span className="text-gray-600">Subtotal</span>
      <span>₹{subtotal}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-gray-600">Shipping</span>
      <span>₹{shipping}</span>
    </div>
    <div className="flex justify-between font-semibold text-lg pt-2 border-t">
      <span>Total</span>
      <span>₹{total.toFixed(2)}</span>
    </div>
  </div>
);

export default PriceBreakdown;