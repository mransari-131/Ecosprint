import React, { useState } from "react";

const AddressForm = ({ onSave, onCancel, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    pincode: "",
    flatHouseBuildingCompanyApartment: "",
    areaStreetSectorVillage: "",
    landmark: "",
    townCity: "",
    state: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const InputField = ({ name, placeholder, required = true }) => (
    <div className="flex flex-col space-y-1">
      <label 
        htmlFor={name}
        className="text-sm font-medium text-gray-700"
      >
        {placeholder}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        placeholder={`Enter ${placeholder.toLowerCase()}`}
        value={formData[name]}
        onChange={handleChange}
        required={required}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-gray-900 placeholder:text-gray-400"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex  justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {initialData ? "Edit Address" : "Add New Address"}
        </h2>
        
        <form onSubmit={handleSubmit} className="">
          {/* Two columns grid for larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <InputField
                name="flatHouseBuildingCompanyApartment"
                placeholder="Flat/House/Building"
              />
              <InputField
                name="areaStreetSectorVillage"
                placeholder="Area/Street/Sector"
              />
              <InputField
                name="landmark"
                placeholder="Landmark"
                required={false}
              />
            </div>
            
            <div className="space-y-6">
              <InputField
                name="townCity"
                placeholder="Town/City"
              />
              <InputField
                name="state"
                placeholder="State"
              />
              <InputField
                name="pincode"
                placeholder="Pincode"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-4 sm:justify-end pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;