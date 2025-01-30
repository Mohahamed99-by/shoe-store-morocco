import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCart } from '../context/CartContext';
import emailjs from '@emailjs/browser';
import { FiX, FiAlertTriangle } from 'react-icons/fi';

const CheckoutModal = ({ isOpen, onClose }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const { cartItems, clearCart, getCartTotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState({ show: false, title: '', status: '', description: '' });

  const showToast = (title, description, status) => {
    setToast({ show: true, title, description, status });
    setTimeout(() => setToast({ show: false, title: '', description: '', status: '' }), 5000);
  };

  const formatOrderDetails = (formData) => {
    const total = getCartTotal();
    const shippingCost = total > 500 ? 0 : 50;
    const finalTotal = total + shippingCost;

    // Format order items
    let orderDetails = cartItems.map(item => 
      `${item.name}\nالمقاس: ${item.size} | اللون: ${item.color}\nالكمية: ${item.quantity} | السعر: ${item.price * item.quantity} ريال\n`
    ).join('\n');

    // Create the complete message
    const message = `
طلب جديد:

معلومات العميل:
الاسم: ${formData.name}
رقم الجوال: ${formData.phone}
العنوان: ${formData.address}
المدينة: ${formData.city}

المنتجات:
${orderDetails}

ملخص الطلب:
المجموع الفرعي: ${total} ريال
الشحن: ${shippingCost === 0 ? 'مجاني' : `${shippingCost} ريال`}
الإجمالي النهائي: ${finalTotal} ريال

طريقة الدفع: الدفع عند الاستلام`;

    return {
      name: formData.name,
      email: formData.phone,
      message: message
    };
  };

  const sendEmail = async (formData) => {
    const SERVICE_ID = 'service_pt8ugbq';
    const TEMPLATE_ID = 'template_t4q59s4';
    const USER_ID = 'B-qBSDLg9GU-JVgmN';

    try {
      const templateParams = formatOrderDetails(formData);
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  };

  const onSubmit = async (data) => {
    setIsProcessing(true);
    
    const emailSent = await sendEmail(data);
    
    if (emailSent) {
      clearCart();
      reset();
      onClose();
      showToast(
        'تم الطلب بنجاح',
        'تم استلام طلبك وسيتم التواصل معك قريباً',
        'success'
      );
    } else {
      showToast(
        'حدث خطأ',
        'لم نتمكن من إرسال طلبك، يرجى المحاولة مرة أخرى',
        'error'
      );
    }
    
    setIsProcessing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-xl w-full">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">معلومات التوصيل</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الاسم الكامل
                  </label>
                  <input
                    {...register('name', {
                      required: 'هذا الحقل مطلوب',
                      minLength: { value: 3, message: 'الاسم قصير جداً' }
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors
                      ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    رقم الجوال
                  </label>
                  <input
                    type="tel"
                    {...register('phone', {
                      required: 'هذا الحقل مطلوب',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'رقم جوال غير صالح'
                      }
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors
                      ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                {/* Address Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    العنوان التفصيلي
                  </label>
                  <input
                    {...register('address', {
                      required: 'هذا الحقل مطلوب',
                      minLength: { value: 10, message: 'يرجى كتابة عنوان تفصيلي' }
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors
                      ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>

                {/* City Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    المدينة
                  </label>
                  <input
                    {...register('city', {
                      required: 'هذا الحقل مطلوب'
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors
                      ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                  )}
                </div>

                {/* Alert */}
                <div className="flex items-center gap-2 p-4 bg-yellow-50 text-yellow-800 rounded-lg">
                  <FiAlertTriangle className="flex-shrink-0" />
                  <span>سيتم الدفع عند الاستلام</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 bg-teal-500 text-white rounded-lg font-bold
                    hover:bg-teal-600 focus:ring-4 focus:ring-teal-500/20 transition-all
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'جاري إرسال الطلب...' : 'تأكيد الطلب'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg transition-all transform duration-300
          ${toast.status === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}
        >
          <h4 className="font-bold">{toast.title}</h4>
          <p className="text-sm">{toast.description}</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutModal;
