import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { FiHeart, FiSearch, FiCalendar, FiUser, FiShoppingBag } from 'react-icons/fi';
import axios from 'axios';

const API_URL = 'https://shoe-store-morocco.onrender.com';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedType, setSelectedType] = useState('all');
  const [wishlist, setWishlist] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', status: '' });

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
        showToastMessage('Error', 'error');
      }
    };

    fetchProducts();
  }, []);

  // Update category when URL parameter changes
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const showToastMessage = (title, status) => {
    setToastMessage({ title, status });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getCategoryLabel = (category) => {
    const categories = {
      'men': 'رجال',
      'women': 'نساء',
      'kids': 'أطفال',
      'all': 'الكل'
    };
    return categories[category] || category;
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' ? true : product.category === selectedCategory;
    const typeMatch = selectedType === 'all' ? true : product.type === selectedType;
    return categoryMatch && typeMatch;
  });

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const isInWishlist = prev.includes(productId);
      const newWishlist = isInWishlist
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      
      showToastMessage(
        isInWishlist ? 'تمت الإزالة من المفضلة' : 'تمت الإضافة إلى المفضلة',
        'success'
      );

      return newWishlist;
    });
  };

  const renderProductCard = (product) => (
    <div
      key={product.id}
      className="group bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-lg"
    >
      <div className="relative">
        <RouterLink to={`/product/${product.id}`} className="block">
          <div className="aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-gray-50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-300" />
        </RouterLink>
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-2.5 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors
              ${wishlist.includes(product.id) ? 'text-red-500' : 'text-gray-600'}
              hover:scale-110 active:scale-95 transform duration-200`}
          >
            <FiHeart className={wishlist.includes(product.id) ? 'fill-current' : ''} size={18} />
          </button>
        </div>

        {/* Status Tags */}
        <div className="absolute top-4 left-4 space-y-2">
          {!product.inStock && (
            <span className="inline-block px-3 py-1.5 bg-black/80 text-white text-xs font-medium rounded-full">
              نفذت الكمية
            </span>
          )}
          {product.isNew && (
            <span className="inline-block px-3 py-1.5 bg-teal-500 text-white text-xs font-medium rounded-full">
              جديد
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5">
        <div className="mb-2 sm:mb-3">
          <span className="text-sm text-teal-600 font-medium">
            {product.brand}
          </span>
        </div>
        
        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-1 min-h-[1.75rem]">
          {product.name}
        </h2>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-sm text-gray-600 mr-1">{product.rating}</span>
          </div>
          <span className="text-gray-300">•</span>
          <span className="text-sm text-gray-600">{product.reviews} تقييم</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                {product.price} ريال
              </span>
              {product.oldPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {product.oldPrice} ريال
                </span>
              )}
            </div>
            {product.oldPrice && (
              <span className="text-sm text-green-600 font-medium">
                خصم {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
              </span>
            )}
          </div>

          <RouterLink
            to={`/product/${product.id}`}
            className={`inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all duration-300
              ${product.inStock 
                ? 'bg-black text-white hover:bg-teal-500 hover:scale-110 active:scale-95'
                : 'bg-gray-200 cursor-not-allowed'}
              transform hover:shadow-lg`}
          >
            <FiShoppingBag size={16} />
          </RouterLink>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold text-red-500">{error}</h2>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-teal-50 opacity-10 rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-purple-50 opacity-10 rounded-full" />
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              متجر الأحذية
            </h1>
            <p className="text-base md:text-lg text-gray-600 text-center">
              اكتشف مجموعتنا الواسعة من الأحذية العصرية والأنيقة
            </p>
            <div className="max-w-[100px] mx-auto border-t-2 border-teal-500"></div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 max-w-5xl mx-auto">
            <div className="relative flex-grow">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:w-auto w-full">
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                  sm:w-40 w-full"
              >
                <option value="all">جميع الفئات</option>
                <option value="men">رجال</option>
                <option value="women">نساء</option>
                <option value="kids">أطفال</option>
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                  sm:w-40 w-full"
              >
                <option value="all">جميع الأنواع</option>
                <option value="رياضي">رياضي</option>
                <option value="كاجوال">كاجوال</option>
                <option value="رسمي">رسمي</option>
                <option value="مدرسي">مدرسي</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {filteredProducts.map((product) => renderProductCard(product))}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className={`px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300
            ${toastMessage.status === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}
          >
            <h4 className="font-medium text-sm">{toastMessage.title}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
