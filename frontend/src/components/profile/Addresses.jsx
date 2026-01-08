import { useEffect, useState } from "react";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import useAddresses from "../../hooks/useAddresses";

const Addresses = () => {
  const { addresses, fetchAddress, addAddress, updateAddress, deleteAddress, loading } = useAddresses();
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchAddress();
  }, []);

  const handleAddNew = () => {
    setEditData(null);
    setShowForm(true);
  };
  

  const handleSave = async (data) => {
    if (editData) {
      await updateAddress(editData.addressId, data.pincode, data.flatHouseBuildingCompanyApartment, data.areaStreetSectorVillage, data.landmark, data.townCity, data.state);
    } else {
      await addAddress(data.pincode, data.flatHouseBuildingCompanyApartment, data.areaStreetSectorVillage, data.landmark, data.townCity, data.state);
    }
    setShowForm(false);
    fetchAddress();
  };

  const handleEdit = (address) => {
    setEditData(address);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await deleteAddress(id);
    fetchAddress();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Saved Addresses</h1>
      <hr></hr>
      <br></br>

      {showForm ? (
        <AddressForm onSave={handleSave} onCancel={() => setShowForm(false)} initialData={editData} />
      ) : (
        <div>
          <button onClick={handleAddNew} className="mb-4 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">+ Add New Address</button>
          
          {loading ? (
            <p>Loading addresses...</p>
          ) : addresses.length > 0 ? (
            <div className="grid gap-4">
              {addresses.map((address) => (
                <AddressCard key={address.addressId} address={address} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          ) : (
            <p>No saved addresses.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Addresses;
