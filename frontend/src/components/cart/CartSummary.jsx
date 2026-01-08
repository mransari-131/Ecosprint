import React from 'react';
import { useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartSummary = ({ total }) => (
    <div className="bg-gray-100 p-6 rounded-lg">
      <div className="flex justify-between mb-4">
        <span>Subtotal</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span>Shipping</span>
        <span>₹79.00</span>
      </div>
      <div className="flex justify-between font-bold border-t pt-4">
        <span>Total</span>
        <span>₹{(total + 79).toFixed(2)}</span>
      </div>
      <button className="w-full bg-black text-white py-3 rounded-lg mt-4 hover:bg-gray-800">
        Checkout
      </button>
    </div>
  );

  export default CartSummary