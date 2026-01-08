import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';

const ProductUploadForm = ({ onSubmit, isOpen, onClose }) => {
  const categories = ['Floaters', 'Loafers', 'Oxford', 'Slip-ins', 'Boots', 'Running Shoes', 'Walking Shoes', 'Sandals', 'Flip Flops', 'Sports Shoes', 'Formal Shoes', 'Casual Shoes', 'Ethnic'];
  const genders = ['Men', 'Women', 'Kids', 'Unisex'];
  const materials = ['Leather', 'Canvas', 'Mesh', 'Suede', 'Synthetic', 'Rubber', 'Fabric', 'Cotton', 'Nylon'];
  const colors = ['Black', 'Brown', 'White', 'Blue', 'Red', 'Green', 'Yellow', 'Grey', 'Multi-color'];
  const occasions = ['Casual', 'Formal', 'Sports', 'Party', 'Beach', 'Wedding', 'Work', 'Outdoor'];
  const seasons = ['Summer', 'Winter', 'Monsoon', 'All Season'];
  const sizeTypes = ['UK', 'US', 'EU'];

  const [formData, setFormData] = useState({
    productName: '',
    productCode: '',
    description: '',
    category: '',
    gender: '',
    price: '',
    salePrice: '',
    stock: '',
    stockStatus: 'in-stock',
    sizeType: '',
    size: '',
    material: '',
    color: '',
    occasion: '',
    season: '',
    isNewArrival: false,
    isBestSeller: false,
    isOnSale: false,
    specialCollection: false
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const selectedImages = e.target.files;
    setImages([...images, ...Array.from(selectedImages)]);
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, images);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">New Product Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name</label>
              <input type="text" name="productName" value={formData.productName} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Product Code</label>
              <input type="text" name="productCode" value={formData.productCode} onChange={handleChange} className="w-full p-2 border rounded required" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded required"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded required">
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded required">
                <option value="">Select Gender</option>
                {genders.map((gender) => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded required" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sale Price</label>
              <input type="number" name="salePrice" value={formData.salePrice} onChange={handleChange} className="w-full p-2 border rounded required" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Stock</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full p-2 border rounded required" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Stock Status</label>
              <select name="stockStatus" value={formData.stockStatus} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="in-stock">In Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Size Type</label>
              <select name="sizeType" value={formData.sizeType} onChange={handleChange} className="w-full p-2 border rounded required">
                <option value="">Select Size Type</option>
                {sizeTypes.map((sizeType) => (
                  <option key={sizeType} value={sizeType}>{sizeType}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Size</label>
              <input type="number" name="size" value={formData.size} onChange={handleChange} className="w-full p-2 border rounded required" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Material</label>
              <select name="material" value={formData.material} onChange={handleChange} className="w-full p-2 border rounded required">
                <option value="">Select Material</option>
                {materials.map((material) => (
                  <option key={material} value={material}>{material}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Color</label>
              <select name="color" value={formData.color} onChange={handleChange} className="w-full p-2 border rounded required">
                <option value="">Select Color</option>
                {colors.map((color) => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Occasion</label>
              <select name="occasion" value={formData.occasion} onChange={handleChange} className="w-full p-2 border rounded required">
                <option value="">Select Occasion</option>
                {occasions.map((occasion) => (
                  <option key={occasion} value={occasion}>{occasion}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Season</label>
              <select name="season" value={formData.season} onChange={handleChange} className="w-full p-2 border rounded required">
                <option value="">Select Season</option>
                {seasons.map((season) => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
            </div>

            {/* New fields for boolean values */}
            <div>
              <label className="block text-sm font-medium mb-2">New Arrival</label>
              <select name="isNewArrival" value={formData.isNewArrival} onChange={handleChange} className="w-full p-2 border rounded">
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Best Seller</label>
              <select name="isBestSeller" value={formData.isBestSeller} onChange={handleChange} className="w-full p-2 border rounded">
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">On Sale</label>
              <select name="isOnSale" value={formData.isOnSale} onChange={handleChange} className="w-full p-2 border rounded">
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Special Collection</label>
              <select name="specialCollection" value={formData.specialCollection} onChange={handleChange} className="w-full p-2 border rounded">
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Product Images</label>
              <input type="file" multiple onChange={handleImageChange} className="w-full p-2 border rounded required" />
              <div className="mt-4">
                {images.map((image, index) => (
                  image instanceof File ? (
                    <div key={index} className="flex items-center justify-between">
                      <img src={URL.createObjectURL(image)} alt={`Product Image ${index + 1}`} className="w-20 h-20 object-cover" />
                      <button onClick={() => handleDeleteImage(index)} className="ml-2 text-red-500">Delete</button>
                    </div>
                  ) : null
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="px-6 py-2 bg-emerald-600 text-white rounded"> <Upload className="w-4 h-4 mr-2" />Upload Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductUploadForm;
