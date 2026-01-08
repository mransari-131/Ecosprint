import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Package, Calendar, Clock, MapPin, Truck } from 'lucide-react';
import useOrder from '../../hooks/useOrder';
import { useSelector, useDispatch } from 'react-redux';

const OrderStatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Order Confirmed':
        return 'bg-green-600 text-white';
      case 'Order Processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-3 py-1.5 rounded-full text-xs sm:text-sm md:px-4 md:py-2 w-fit font-medium ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

const OrderItem = ({ item }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b border-gray-100 last:border-0">
    <div className="w-20 h-20 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center">
      <img 
        src={item.image || "/api/placeholder/64/64"} 
        alt={item.name} 
        className="w-16 h-16 sm:w-12 sm:h-12 object-cover rounded"
      />
    </div>
    <div className="flex-1 lg:space-y-2">
      <h4 className="text-sm sm:text-base font-medium text-gray-900">{item.name}</h4>
      <div className="flex flex-row sm:flex-row justify-start gap-2 text-xs sm:text-sm">
        <p className="text-gray-500">Quantity: {item.quantity}</p>
        <p className="text-gray-500">Size: {item.size}</p>
      </div>
      <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm">
        <div className="flex gap-2 items-center">
          <span className="font-medium text-gray-600">Unit Price:</span>
          <span className="font-medium text-emerald-600">₹{item.price}</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-medium text-gray-900">Total:</span>
          <span className="font-medium text-emerald-600">₹{item.price * item.quantity}</span>
        </div>
      </div>
    </div>
  </div>
);

const OrderSummary = ({ order }) => (
  <div className="bg-gray-50 rounded-lg p-4 mt-4">
    <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-3">Order Summary</h4>
    <div className="space-y-2 text-xs sm:text-sm">
      <div className="flex justify-between">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium">₹{(order.totalAmount - 79).toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Shipping</span>
        <span className="font-medium">₹79</span>
      </div>
      <div className="border-t border-gray-200 pt-2 mt-2">
        <div className="flex justify-between font-medium">
          <span className="text-gray-900">Total</span>
          <span className="text-emerald-600">₹{order.totalAmount?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  </div>
);

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div 
        className="p-4 sm:p-5 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
            <span className="text-xs sm:text-sm font-medium text-gray-900">Order #{order.orderCode}</span>
          </div>
          <OrderStatusBadge status={order.orderStatus} />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Order Date: {new Date(order?.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <span>Delivery Date: {new Date(order?.deliveryDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span>{isExpanded ? 'Show less' : 'Show more'}</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-gray-200">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              <h4 className="text-sm sm:text-base font-medium text-gray-900">Delivery Address</h4>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              {order.addressId?.flatHouseBuildingCompanyApartment}, {order.addressId?.areaStreetSectorVillage}, 
              {order.addressId?.townCity} {order.addressId?.state} {order.addressId?.pincode}
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              Landmark: {order.addressId?.landmark}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-3">Order Items</h4>
            <div className="space-y-2">
              {order.items?.map((item) => (
                <OrderItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          <OrderSummary order={order} />
        </div>
      )}
    </div>
  );
};

const MyOrders = () => {
  const { orders, loading, error } = useSelector(state => state.order);
  const { fetchOrders, createBuyNowOrder, createCartOrder, updateOrder } = useOrder();

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-sm sm:text-base text-red-600">{error}</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="text-center py-8">
        <Package className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
        <p className="text-sm sm:text-base text-gray-600">When you place orders, they will appear here</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto lg:p-4 lg:space-y-4">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Your Orders</h2>
      {orders.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </div>
  );
};

export default MyOrders;