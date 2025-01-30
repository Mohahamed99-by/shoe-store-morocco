import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { FiTruck, FiTrash2, FiPlus, FiMinus, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import CheckoutModal from '../components/CheckoutModal';

const Cart = () => {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', status: '' });
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
  } = useCart();

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1) {
      updateQuantity(item.id, item.size, item.color, newQuantity);
    }
  };

  const showToastMessage = (title, status) => {
    setToastMessage({ title, status });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id, item.size, item.color);
    showToastMessage('تمت الإزالة من السلة', 'success');
  };

  const subtotal = getCartTotal();
  const shippingCost = subtotal > 500 ? 0 : 50;
  const total = subtotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-8">
          <h1 className="text-3xl font-bold">سلة التسوق فارغة</h1>
          <p className="text-gray-600">لم تقم بإضافة أي منتجات إلى السلة بعد</p>
          <RouterLink
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg
              hover:-translate-y-0.5 hover:shadow-md hover:bg-teal-600 transition-all duration-300"
          >
            <FiArrowLeft />
            <span>تصفح المنتجات</span>
          </RouterLink>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold mb-4">سلة التسوق ({cartItems.length})</h1>
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className="p-4 border border-teal-100 rounded-lg bg-white hover:shadow-sm transition-shadow duration-200"
            >
              <div className="grid grid-cols-1 sm:grid-cols-[120px,1fr] gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-[120px] w-[120px] object-cover rounded-md"
                />
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between">
                      <h2 className="text-xl font-bold">{item.name}</h2>
                      <button
                        onClick={() => handleRemoveItem(item)}
                        className="p-2 text-red-500 hover:bg-red-50 hover:scale-110 transition-all duration-200 rounded-full"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      {item.brand} • المقاس: {item.size} • اللون: {item.color}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item, -1)}
                        disabled={item.quantity <= 1}
                        className="p-1 border border-teal-500 text-teal-500 rounded-md hover:bg-teal-50 
                          disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiMinus size={16} />
                      </button>
                      <span className="font-bold min-w-[32px] text-center text-gray-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item, 1)}
                        className="p-1 border border-teal-500 text-teal-500 rounded-md hover:bg-teal-50"
                      >
                        <FiPlus size={16} />
                      </button>
                    </div>
                    <span className="font-bold text-lg text-teal-500">
                      {item.price * item.quantity} ريال
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-5 p-6 border border-teal-100 rounded-lg bg-white shadow-sm">
            <div className="space-y-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
                ملخص الطلب
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">المجموع الفرعي:</span>
                  <span className="text-gray-600 font-medium">{subtotal} ريال</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الشحن:</span>
                  <span className={shippingCost === 0 ? "text-teal-500 font-medium" : "text-gray-600 font-medium"}>
                    {shippingCost === 0 ? 'مجاني' : `${shippingCost} ريال`}
                  </span>
                </div>
                <hr className="border-t border-teal-100" />
                <div className="flex justify-between font-bold">
                  <span className="text-gray-600">الإجمالي:</span>
                  <span className="text-teal-500">{total} ريال</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full py-4 bg-teal-500 text-white rounded-lg font-bold
                  hover:bg-teal-600 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
              >
                إتمام الطلب
              </button>

              <div className="flex items-center justify-center gap-2 text-teal-500">
                <FiTruck />
                <span className="text-sm text-gray-600">الدفع عند الاستلام متاح</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg transition-all transform duration-300
          ${toastMessage.status === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}
        >
          <h4 className="font-bold">{toastMessage.title}</h4>
        </div>
      )}
    </div>
  );
};

export default Cart;
