import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiHeart, FiShoppingCart, FiCheck, FiTruck, FiRefreshCcw, FiShield, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', description: '', type: '' });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://shoe-store-morocco.onrender.com/products/${id}`);
        const productData = response.data;
        
        setProduct({
          ...productData,
          images: productData.images || [productData.image],
          features: productData.features || [],
          description: productData.description || `${productData.name} - ${productData.brand}`,
          ratingBreakdown: productData.ratingBreakdown || {
            5: Math.floor(productData.reviews * 0.5),
            4: Math.floor(productData.reviews * 0.3),
            3: Math.floor(productData.reviews * 0.1),
            2: Math.floor(productData.reviews * 0.07),
            1: Math.floor(productData.reviews * 0.03)
          }
        });
        setError(null);
      } catch (err) {
        setError('Failed to fetch product details');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const showToastMessage = (title, description, type) => {
    setToastMessage({ title, description, type });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      showToastMessage('تنبيه', 'الرجاء اختيار المقاس واللون', 'warning');
      return;
    }

    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity
    });
    
    showToastMessage('تمت الإضافة', 'تمت إضافة المنتج إلى سلة التسوق', 'success');
  };

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
    showToastMessage(
      isWishlist ? 'تمت الإزالة' : 'تمت الإضافة',
      isWishlist ? 'تم إزالة المنتج من المفضلة' : 'تمت إضافة المنتج إلى المفضلة',
      'success'
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error || !product) {
    return null;
  }

  const totalReviews = Object.values(product.ratingBreakdown).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8 lg:py-12">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Product Images */}
            <div className="p-4 sm:p-6 lg:p-8 border-b lg:border-b-0 lg:border-l border-gray-100">
              <div className="relative mb-4 sm:mb-6">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={product.images[selectedImage]}
                    alt={`${product.name} - صورة ${selectedImage + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={toggleWishlist}
                  className={`absolute top-4 right-4 p-2.5 rounded-full ${
                    isWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
                  } hover:scale-110 active:scale-95 transition-transform duration-200 shadow-lg`}
                >
                  <FiHeart className={isWishlist ? 'fill-current' : ''} size={20} />
                </button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-3 sm:gap-4">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200
                      ${selectedImage === index ? 'border-teal-500 ring-2 ring-teal-500/20' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="aspect-square">
                      <img
                        src={image}
                        alt={`${product.name} - صورة ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4 sm:p-6 lg:p-8 space-y-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 text-sm bg-teal-50 text-teal-600 rounded-full font-medium">
                    {product.brand}
                  </span>
                  <span className="px-3 py-1 text-sm bg-green-50 text-green-600 rounded-full font-medium">
                    متوفر
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 text-gray-900">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center text-yellow-400">
                    <FiStar className="fill-current" size={18} />
                    <span className="font-bold text-gray-900 mx-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.reviews} تقييم)
                  </span>
                </div>
                <div className="flex items-baseline gap-3">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {product.price} ريال
                  </div>
                  {product.oldPrice && (
                    <div className="text-lg text-gray-500 line-through">
                      {product.oldPrice} ريال
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-100 -mx-4 sm:-mx-6 lg:-mx-8" />

              {/* Selections */}
              <div className="space-y-5">
                <div>
                  <label className="block font-medium text-gray-900 mb-3">المقاس</label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2.5 rounded-lg transition-all duration-200 font-medium
                          ${selectedSize === size
                            ? 'bg-black text-white hover:bg-gray-900'
                            : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-900 mb-3">اللون</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`py-2.5 rounded-lg transition-all duration-200 font-medium
                          ${selectedColor === color
                            ? 'bg-black text-white hover:bg-gray-900'
                            : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                          }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-900 mb-3">الكمية</label>
                  <div className="inline-flex items-center rounded-lg bg-gray-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="p-3 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-12 text-center font-medium text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= 10}
                      className="p-3 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-xl
                  hover:bg-gray-900 active:scale-[0.99] transition-all duration-200 font-medium"
              >
                <FiShoppingCart size={20} />
                <span>إضافة إلى السلة</span>
              </button>

              {/* Features */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 bg-gray-50 rounded-xl text-center">
                  <div className="text-teal-500 flex justify-center mb-2">
                    <FiTruck size={22} />
                  </div>
                  <h3 className="font-medium text-sm text-gray-900 mb-1">شحن مجاني</h3>
                  <p className="text-xs text-gray-500">
                    للطلبات فوق 200 ريال
                  </p>
                </div>
                <div className="p-3 sm:p-4 bg-gray-50 rounded-xl text-center">
                  <div className="text-teal-500 flex justify-center mb-2">
                    <FiRefreshCcw size={22} />
                  </div>
                  <h3 className="font-medium text-sm text-gray-900 mb-1">إرجاع مجاني</h3>
                  <p className="text-xs text-gray-500">
                    خلال 30 يوم
                  </p>
                </div>
                <div className="p-3 sm:p-4 bg-gray-50 rounded-xl text-center">
                  <div className="text-teal-500 flex justify-center mb-2">
                    <FiShield size={22} />
                  </div>
                  <h3 className="font-medium text-sm text-gray-900 mb-1">ضمان الجودة</h3>
                  <p className="text-xs text-gray-500">
                    منتجات أصلية 100%
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-t border-gray-100 -mx-4 sm:-mx-6 lg:-mx-8 pt-6">
                <div className="flex border-b border-gray-200 -mb-px">
                  {['الوصف', 'المميزات', 'التقييمات'].map((tab, index) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(index)}
                      className={`px-4 py-2.5 font-medium text-sm transition-colors duration-200
                        ${activeTab === index
                          ? 'border-b-2 border-black text-black'
                          : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="pt-4">
                  {activeTab === 0 && (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  )}

                  {activeTab === 1 && (
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <FiCheck className="text-teal-500 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 2 && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                          <div className="text-3xl font-bold text-gray-900">
                            {product.rating}
                          </div>
                          <div className="text-sm text-gray-500">
                            من 5 ({totalReviews} تقييم)
                          </div>
                        </div>
                        <div className="w-full sm:w-[300px] space-y-2">
                          {Object.entries(product.ratingBreakdown)
                            .reverse()
                            .map(([rating, count]) => (
                              <div key={rating} className="flex items-center gap-3">
                                <span className="w-3 text-sm text-gray-600">{rating}</span>
                                <div className="flex-1 bg-gray-100 rounded-full h-2">
                                  <div
                                    className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${(count / totalReviews) * 100}%` }}
                                  />
                                </div>
                                <span className="w-8 text-sm text-gray-500">{count}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className={`px-6 py-4 rounded-xl shadow-lg transform transition-all duration-300
            ${toastMessage.type === 'success' ? 'bg-green-500' : 'bg-yellow-500'} text-white`}
          >
            <h4 className="font-medium text-sm mb-1">{toastMessage.title}</h4>
            <p className="text-xs opacity-90">{toastMessage.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
