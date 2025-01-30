import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  FiTruck,
  FiCreditCard,
  FiRefreshCw,
  FiPhoneCall,
  FiArrowRight,
  FiShoppingBag,
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const TrendingProducts = [
  {
    id: 1,
    name: 'نايكي اير ماكس',
    price: 499,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    category: 'men',
    rating: 4.8,
    sale: true,
    oldPrice: 699,
  },
  {
    id: 2,
    name: 'اديداس الترا بوست',
    price: 599,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
    category: 'نساء',
    rating: 4.9,
    sale: false,
  },
  {
    id: 3,
    name: 'بوما كلاسيك',
    price: 299,
    image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3',
    category: 'رجال',
    rating: 4.7,
    sale: true,
    oldPrice: 399,
  },
  {
    id: 4,
    name: 'ريبوك كلاسيك',
    price: 349,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
    category: 'نساء',
    rating: 4.6,
    sale: false,
  },
];

const FeaturedCategories = [
  {
    title: 'رجال',
    description: 'أحذية رجالية فاخرة',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    href: '/products?category=men',
  },
  {
    title: 'نساء',
    description: 'أحذية نسائية عصرية',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
    href: '/products?category=women',
  },
  {
    title: 'أطفال',
    description: 'أحذية مريحة للأطفال',
    image: 'https://images.unsplash.com/photo-1507464098880-e367bc5d2c08',
    href: '/products?category=kids',
  },
];

const backgroundImages = [
  'https://images.unsplash.com/photo-1549298916-b41d501d3772',
  'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb',
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
  'https://images.unsplash.com/photo-1460353581641-37baddab0fa2',
];

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://shoe-store-morocco.onrender.com/api/products');
        setProducts(response.data.slice(0, 6)); // Get first 6 products
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 4000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[90vh] lg:h-[85vh] overflow-hidden">
        {/* Background Images with Scroll Effect */}
        {backgroundImages.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-75"
            style={{
              backgroundImage: `url('${image}')`,
              zIndex: currentImageIndex === index ? 1 : 0,
            }}
            initial={{ opacity: 0, x: '100%' }}
            animate={{
              opacity: currentImageIndex === index ? 1 : 0,
              x: currentImageIndex === index ? '0%' : '-100%',
            }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
            }}
          />
        ))}
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />

        {/* Content */}
        <div className="container mx-auto h-full relative z-10">
          <div className="flex flex-col justify-center items-center h-full max-w-[80%] mx-auto text-center px-4 lg:px-0">
            <motion.div
              className="flex flex-col items-center space-y-4 md:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm md:text-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                متجر متميز
              </motion.span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight shadow-text">
                اكتشف عالم الأناقة مع تشكيلة أحذيتنا العصرية
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-100 leading-relaxed max-w-3xl shadow-text">
                نقدم لك أفضل الماركات العالمية بأسعار تنافسية مع خدمة توصيل سريعة وضمان الجودة
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto pt-2">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 hover:-translate-y-1 shadow-lg transition-all duration-300"
                >
                  <span>تسوق الآن</span>
                  <FiShoppingBag className="mr-2" />
                </Link>
                <Link
                  to="/products?sale=true"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white border-2 border-white rounded-lg hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
                >
                  العروض
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 md:py-16 bg-white dark:bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">لماذا تختارنا؟</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                نقدم لك تجربة تسوق استثنائية مع مزايا حصرية
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
              {[
                {
                  icon: FiTruck,
                  title: 'توصيل مجاني',
                  description: 'توصيل مجاني لجميع الطلبات التي تزيد عن 500 ريال'
                },
                {
                  icon: FiCreditCard,
                  title: 'دفع آمن',
                  description: 'طرق دفع متعددة وآمنة مع حماية كاملة لبياناتك'
                },
                {
                  icon: FiRefreshCw,
                  title: 'استبدال سهل',
                  description: 'سياسة استبدال مرنة خلال 30 يوماً من الشراء'
                },
                {
                  icon: FiPhoneCall,
                  title: 'دعم متواصل',
                  description: 'فريق دعم متخصص متواجد على مدار الساعة لخدمتك'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-white dark:bg-white rounded-xl shadow-md border border-gray-200 dark:border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex flex-col items-center space-y-4 h-full">
                    <feature.icon className="w-8 h-8 text-teal-500" />
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-center text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-12 md:py-16 bg-white dark:bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-between bg-white dark:bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-200">
            <div className="flex flex-col items-center md:items-start space-y-4 flex-1">
              <h2 className="text-3xl md:text-4xl font-bold">اشترك في نشرتنا البريدية</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                احصل على آخر العروض والتخفيضات مباشرة في بريدك الإلكتروني
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                className="px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-gray-900 dark:text-white"
              />
              <button
                className="px-8 py-3 bg-teal-500 text-white rounded-lg hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                اشترك الآن
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Products Section */}
      <div className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-white dark:to-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-12 md:space-y-20">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-teal-500 font-semibold text-sm md:text-base bg-teal-50 px-4 py-1 rounded-full">
                منتجاتنا المميزة
              </span>
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
                المنتجات الرائجة
              </h2>
              <p className="text-gray-600 dark:text-gray-600 text-lg md:text-xl leading-relaxed">
                اكتشف أحدث صيحات الموضة في عالم الأحذية
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
              {TrendingProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="group bg-white dark:bg-white rounded-2xl shadow-sm hover:shadow-2xl overflow-hidden transition-all duration-500 ease-out transform hover:-translate-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    </div>
                    {product.sale && (
                      <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        تخفيض
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-sm font-medium">
                        {product.category}
                      </span>
                      <div className="flex items-center text-yellow-400 text-sm">
                        {'★'.repeat(Math.floor(product.rating))}
                        <span className="text-gray-400 text-xs mr-1">({product.rating})</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-2 min-h-[3.5rem]">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-teal-500">
                        {product.price} ريال
                      </span>
                      {product.oldPrice && (
                        <span className="text-gray-400 line-through text-lg">
                          {product.oldPrice} ريال
                        </span>
                      )}
                    </div>
                    <Link
                      to={`/product/${product.id}`}
                      className="mt-4 w-full px-6 py-3 bg-teal-500 text-white text-center rounded-xl font-medium 
                        transform hover:bg-teal-600 hover:shadow-lg transition-all duration-300 
                        flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                    >
                      <span>عرض المنتج</span>
                      <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-white text-teal-500 rounded-xl font-medium
                shadow-md hover:shadow-xl border-2 border-teal-500 hover:bg-teal-50
                transform hover:-translate-y-1 transition-all duration-300 gap-3"
            >
              <span>عرض جميع المنتجات</span>
              <FiArrowRight className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 md:py-16 bg-white dark:bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-10 md:space-y-16">
            <div className="text-center space-y-4 w-full">
              <h2 className="text-3xl md:text-4xl font-bold">تصفح حسب الفئة</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                اختر من تشكيلتنا الواسعة من الأحذية المناسبة لجميع الأذواق والمناسبات
              </p>
              <div className="w-24 h-1 bg-teal-500 mx-auto mt-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 w-full">
              {FeaturedCategories.map((category, index) => (
                <motion.div
                  key={index}
                  className="relative overflow-hidden rounded-xl shadow-lg group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Link to={category.href}>
                    <div className="aspect-[4/3]">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 transition-opacity duration-300 group-hover:opacity-80" />
                    <div className="absolute bottom-0 w-full p-6 md:p-8 space-y-3">
                      <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                        {category.title}
                      </h3>
                      <p className="text-gray-100 text-sm md:text-base text-center drop-shadow-md">
                        {category.description}
                      </p>
                      <button className="w-full px-4 py-2 bg-teal-500 text-white rounded hover:-translate-y-1 hover:shadow-lg hover:bg-teal-600 transition-all duration-300 flex items-center justify-center gap-2">
                        تصفح الفئة
                        <FiArrowRight />
                      </button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;