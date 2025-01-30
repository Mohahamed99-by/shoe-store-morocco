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
    <div className="min-h-screen py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Product Images */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="relative mb-6">
              <img
                src={product.images[selectedImage]}
                alt={`${product.name} - صورة ${selectedImage + 1}`}
                className="w-full h-[300px] md:h-[500px] object-cover rounded-lg"
              />
              <button
                onClick={toggleWishlist}
                className={`absolute top-4 right-4 p-2 rounded-full ${
                  isWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
                } hover:scale-110 transition-transform duration-200 shadow-lg`}
              >
                <FiHeart className={isWishlist ? 'fill-current' : ''} size={20} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`cursor-pointer rounded-md overflow-hidden border-2 transition-all duration-200 hover:opacity-80
                    ${selectedImage === index ? 'border-teal-500' : 'border-gray-200'}`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - صورة ${index + 1}`}
                    className="w-full h-[100px] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Product Info */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
            <div>
              <div className="flex gap-2 mb-2">
                <span className="px-2 py-1 text-sm bg-teal-100 text-teal-800 rounded-full">
                  {product.brand}
                </span>
                <span className="px-2 py-1 text-sm bg-purple-100 text-purple-800 rounded-full">
                  متوفر
                </span>
              </div>
              <h1 className="text-2xl font-bold mb-2 text-gray-800">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-purple-500">
                  <FiStar className="fill-current" />
                  <span className="font-bold ml-1">{product.rating}</span>
                </div>
                <span className="text-gray-600">
                  ({product.reviews} تقييم)
                </span>
              </div>
              <div className="text-2xl font-bold text-teal-600">
                {product.price} ريال
              </div>
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            {/* Selections */}
            <div className="space-y-4">
              <div>
                <label className="block font-bold mb-2">المقاس</label>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded-md transition-colors duration-200
                        ${selectedSize === size
                          ? 'bg-teal-500 text-white hover:bg-teal-600'
                          : 'border border-teal-500 text-teal-500 hover:bg-teal-50'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold mb-2">اللون</label>
                <div className="grid grid-cols-3 gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`py-2 rounded-md transition-colors duration-200
                        ${selectedColor === color
                          ? 'bg-teal-500 text-white hover:bg-teal-600'
                          : 'border border-teal-500 text-teal-500 hover:bg-teal-50'
                        }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold mb-2">الكمية</label>
                <div className="flex items-center max-w-[200px]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="px-4 py-2 border border-teal-500 text-teal-500 rounded-md hover:bg-teal-50 disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="px-4 font-bold text-gray-700">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= 10}
                    className="px-4 py-2 border border-teal-500 text-teal-500 rounded-md hover:bg-teal-50 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-teal-500 text-white py-4 rounded-lg
                hover:bg-teal-600 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            >
              <FiShoppingCart size={20} />
              <span>إضافة إلى السلة</span>
            </button>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-md text-center hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                <div className="text-teal-500 flex justify-center mb-2">
                  <FiTruck size={24} />
                </div>
                <h3 className="font-bold text-sm mb-1">شحن مجاني</h3>
                <p className="text-sm text-gray-600">
                  للطلبات فوق 200 ريال
                </p>
              </div>
              <div className="p-4 bg-white rounded-md text-center hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                <div className="text-purple-500 flex justify-center mb-2">
                  <FiRefreshCcw size={24} />
                </div>
                <h3 className="font-bold text-sm mb-1">إرجاع مجاني</h3>
                <p className="text-sm text-gray-600">
                  خلال 30 يوم
                </p>
              </div>
              <div className="p-4 bg-white rounded-md text-center hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                <div className="text-teal-500 flex justify-center mb-2">
                  <FiShield size={24} />
                </div>
                <h3 className="font-bold text-sm mb-1">ضمان الجودة</h3>
                <p className="text-sm text-gray-600">
                  منتجات أصلية 100%
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex border-b border-gray-200">
                {['الوصف', 'المميزات', 'التقييمات'].map((tab, index) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(index)}
                    className={`px-4 py-2 -mb-px font-medium transition-colors duration-200
                      ${activeTab === index
                        ? 'border-b-2 border-teal-500 text-teal-600'
                        : 'text-gray-600 hover:text-teal-500'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="pt-4">
                {activeTab === 0 && (
                  <p className="text-gray-600">
                    {product.description}
                  </p>
                )}

                {activeTab === 1 && (
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <FiCheck className="text-teal-500 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 2 && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-3xl font-bold text-gray-800">
                          {product.rating}
                        </div>
                        <div className="text-gray-600">
                          من 5 ({totalReviews} تقييم)
                        </div>
                      </div>
                      <div className="flex-1 max-w-[400px] space-y-2">
                        {Object.entries(product.ratingBreakdown)
                          .reverse()
                          .map(([rating, count]) => (
                            <div key={rating} className="flex items-center gap-4">
                              <span className="w-4">{rating}</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-teal-500 h-2 rounded-full"
                                  style={{ width: `${(count / totalReviews) * 100}%` }}
                                />
                              </div>
                              <span className="w-10">{count}</span>
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

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg transition-all transform duration-300
          ${toastMessage.type === 'success' ? 'bg-green-500' : 'bg-yellow-500'} text-white`}
        >
          <h4 className="font-bold">{toastMessage.title}</h4>
          <p className="text-sm">{toastMessage.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
