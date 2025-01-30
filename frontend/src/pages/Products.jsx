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
      className="bg-white border border-teal-100 rounded-lg overflow-hidden
        transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-teal-300 relative"
    >
      <RouterLink to={`/product/${product.id}`}>
        <div className="aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </RouterLink>
      <button
        onClick={() => toggleWishlist(product.id)}
        className={`absolute top-4 right-4 p-2 rounded-full bg-white hover:scale-110 transition-transform
          ${wishlist.includes(product.id) ? 'text-red-500' : 'text-gray-600'}`}
      >
        <FiHeart className={wishlist.includes(product.id) ? 'fill-current' : ''} size={20} />
      </button>
      {!product.inStock && (
        <span className="absolute top-4 left-4 px-2 py-1 text-sm bg-red-500 text-white rounded-full">
          نفذت الكمية
        </span>
      )}
      <div className="p-6 space-y-4">
        <div className="flex text-sm text-gray-600 space-x-4 rtl:space-x-reverse">
          <div className="flex items-center">
            <FiCalendar className="mr-2" />
            <span>28 يناير 2025</span>
          </div>
          <div className="flex items-center">
            <FiUser className="mr-2" />
            <span>{getCategoryLabel(product.category)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
            {product.name}
          </h2>
          <p className="text-gray-600 line-clamp-2">
            حذاء {product.type} من ماركة {product.brand} متوفر بعدة مقاسات وألوان.
          </p>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-teal-500">
            {product.price} ريال
          </span>
          <span className="px-2 py-1 text-sm bg-teal-100 text-teal-800 rounded-full">
            {product.brand}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 text-sm bg-teal-100 text-teal-800 rounded-full">
            {product.type}
          </span>
          <span className="px-2 py-1 text-sm bg-purple-100 text-purple-800 rounded-full">
            {product.rating} ★ ({product.reviews})
          </span>
        </div>

        <RouterLink
          to={`/product/${product.id}`}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-all duration-300
            ${product.inStock 
              ? 'bg-teal-500 hover:bg-teal-600 hover:-translate-y-0.5 hover:shadow-lg text-white'
              : 'bg-gray-300 cursor-not-allowed text-gray-600'}`}
        >
          <FiShoppingBag />
          <span>{product.inStock ? 'عرض التفاصيل' : 'نفذت الكمية'}</span>
        </RouterLink>
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
    <div className="bg-white">
      {/* Header Section */}
      <div className="bg-white border-b border-teal-100 py-8 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-teal-50 opacity-10 rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-purple-50 opacity-10 rounded-full" />
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
              متجر الأحذية
            </h1>
            <p className="text-lg text-gray-600 text-center">
              اكتشف مجموعتنا الواسعة من الأحذية العصرية والأنيقة
            </p>
            <div className="max-w-[100px] mx-auto border-t-2 border-teal-500"></div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="flex flex-wrap md:flex-nowrap gap-4 bg-white p-4 rounded-lg border border-teal-100">
            <div className="relative w-full md:w-80">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg
                  focus:outline-none focus:border-teal-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full md:w-auto px-4 py-2 bg-white border border-gray-200 rounded-lg
                focus:outline-none focus:border-teal-500"
            >
              <option value="all">جميع الفئات</option>
              <option value="men">رجال</option>
              <option value="women">نساء</option>
              <option value="kids">أطفال</option>
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full md:w-auto px-4 py-2 bg-white border border-gray-200 rounded-lg
                focus:outline-none focus:border-teal-500"
            >
              <option value="all">جميع الأنواع</option>
              <option value="رياضي">رياضي</option>
              <option value="كاجوال">كاجوال</option>
              <option value="رسمي">رسمي</option>
              <option value="مدرسي">مدرسي</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => renderProductCard(product))}
          </div>
        </div>
      </div>

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

export default Products;
