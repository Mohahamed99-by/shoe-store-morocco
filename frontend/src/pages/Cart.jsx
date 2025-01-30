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
      <div className="min-h-[60vh] flex items-center">
        <div className="w-full max-w-md mx-auto px-4 py-8 text-center">
          <div className="bg-white rounded-2xl p-6 sm:p-8 space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">سلة التسوق فارغة</h1>
            <p className="text-gray-600">لم تقم بإضافة أي منتجات إلى السلة بعد</p>
            <RouterLink
              to="/products"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-black text-white rounded-xl
                hover:bg-gray-900 active:scale-[0.98] transition-all duration-200 font-medium"
            >
              <FiArrowLeft />
              <span>تصفح المنتجات</span>
            </RouterLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                سلة التسوق ({cartItems.length})
              </h1>
              <RouterLink
                to="/products"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black"
              >
                <FiArrowLeft size={16} />
                <span>متابعة التسوق</span>
              </RouterLink>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <div className="relative aspect-square w-full sm:w-[120px] rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 space-y-3 sm:space-y-4">
                        <div>
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h2 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h2>
                              <p className="text-sm text-gray-600">
                                {item.brand} • المقاس: {item.size} • اللون: {item.color}
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="inline-flex items-center rounded-lg bg-gray-50">
                            <button
                              onClick={() => handleQuantityChange(item, -1)}
                              disabled={item.quantity <= 1}
                              className="p-2.5 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <FiMinus size={16} />
                            </button>
                            <span className="w-12 text-center font-medium text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item, 1)}
                              className="p-2.5 text-gray-600 hover:text-gray-900"
                            >
                              <FiPlus size={16} />
                            </button>
                          </div>
                          <div className="font-bold text-lg text-gray-900">
                            {item.price * item.quantity} ريال
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-4">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 sm:p-6 space-y-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    ملخص الطلب
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">المجموع الفرعي:</span>
                      <span className="font-medium text-gray-900">{subtotal} ريال</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span className="text-gray-600">الشحن:</span>
                      <span className={shippingCost === 0 ? "text-teal-500 font-medium" : "text-gray-900 font-medium"}>
                        {shippingCost === 0 ? 'مجاني' : `${shippingCost} ريال`}
                      </span>
                    </div>
                    <div className="border-t border-gray-100 -mx-6" />
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">الإجمالي:</span>
                      <span className="text-xl font-bold text-gray-900">{total} ريال</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCheckoutModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-black text-white rounded-xl
                      hover:bg-gray-900 active:scale-[0.98] transition-all duration-200 font-medium"
                  >
                    <span>إتمام الطلب</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <FiTruck size={16} />
                    <span className="text-sm">الدفع عند الاستلام متاح</span>
                  </div>
                </div>
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
        <div className="fixed bottom-4 right-4 z-50">
          <div className={`px-6 py-4 rounded-xl shadow-lg transform transition-all duration-300
            ${toastMessage.status === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}
          >
            <h4 className="font-medium text-sm">{toastMessage.title}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
