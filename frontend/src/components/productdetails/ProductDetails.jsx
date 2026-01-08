import React from 'react';

const ProductDetails = ({ product }) => {
  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-xl font-semibold mb-4">Product Details</h3>
      <table className="w-full">
        <tbody>
          <tr className="border-b">
            <td className="py-2 text-gray-600">Category</td>
            <td className="py-2 font-medium">{product.category}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 text-gray-600">Material</td>
            <td className="py-2 font-medium">{product.material}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 text-gray-600">Color</td>
            <td className="py-2 font-medium">{product.color}</td>
          </tr>
          <tr>
            <td className="py-2 text-gray-600">Occasion</td>
            <td className="py-2 font-medium">{product.occasion}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetails;