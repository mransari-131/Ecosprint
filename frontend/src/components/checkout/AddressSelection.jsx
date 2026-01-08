// AddressSelection.jsx
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SavedAddress = ({ address, isSelected, onSelect }) => (
  <div
    className={`border rounded-lg cursor-pointer transition-all ${
      isSelected
        ? "border-emerald-600 bg-emerald-50 shadow-md"
        : "border-gray-300 hover:border-emerald-400 hover:bg-emerald-50"
    }`}
    onClick={() => onSelect(address)
    }
  >
    <div className="bg-transparent rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center w-full">
      <div>
        <p className="font-semibold">
          {address.flatHouseBuildingCompanyApartment},{" "}
          {address.areaStreetSectorVillage}
        </p>
        <p>
          {address.townCity}, {address.state}
        </p>
        <p>Pincode: {address.pincode}</p>
        {address.landmark && <p>Landmark: {address.landmark}</p>}
      </div>
    </div>
  </div>
);

const AddressSelection = ({ addresses, selectedAddress, onAddressSelect }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/profile");
  };
  console.log(selectedAddress);

  return (
    <div className="space-y-3">
      {addresses.map((address) => (
        <SavedAddress
          key={address.addressId}
          address={address}
          isSelected={selectedAddress?.addressId === address.addressId}
          onSelect={onAddressSelect}
        />
      ))}
      <button
        onClick={handleNavigate}
        className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
      >
        <Plus className="w-4 h-4" />
        Add New Address
      </button>
    </div>
  );
};

export default AddressSelection;
