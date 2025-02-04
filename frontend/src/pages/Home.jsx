import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // Add this import
import axios from 'axios';
import {
  FiTruck,
  FiCreditCard,
  FiRefreshCw,
  FiPhoneCall,
  FiArrowRight,
  FiShoppingBag,
  FiPackage,
  FiShield,
  FiClock,
  FiHeart,
} from 'react-icons/fi';
import { motion } from 'framer-motion';

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

const url_api = 'https://shoe-store-morocco.onrender.com';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${url_api}/products`);
        setProducts(response.data.slice(0, 8)); // Get first 6 products
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
      {/* Add Helmet for SEO */}
      <Helmet>
        <title>متجر الأحذية المغربي - تشكيلة متميزة من الأحذية العصرية</title>
        <meta name="description" content="اكتشف أحدث تشكيلات الأحذية للرجال والنساء والأطفال. توفير أحذية عالية الجودة بأسعار تنافسية مع خدمة توصيل سريعة." />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shoe-store-pi-three.vercel.app/" />
        <meta property="og:title" content="متجر الأحذية المغربي - تشكيلة متميزة من الأحذية العصرية" />
        <meta property="og:description" content="اكتشف أحدث تشكيلات الأحذية للرجال والنساء والأطفال. توفير أحذية عالية الجودة بأسعار تنافسية مع خدمة توصيل سريعة." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1549298916-b41d501d3772" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://shoe-store-pi-three.vercel.app/" />
        <meta property="twitter:title" content="متجر الأحذية المغربي - تشكيلة متميزة من الأحذية العصرية" />
        <meta property="twitter:description" content="اكتشف أحدث تشكيلات الأحذية للرجال والنساء والأطفال. توفير أحذية عالية الجودة بأسعار تنافسية مع خدمة توصيل سريعة." />
        <meta property="twitter:image" content="https://images.unsplash.com/photo-1549298916-b41d501d3772" />

        {/* Additional SEO meta tags */}
        <meta name="keywords" content="أحذية, متجر أحذية, أحذية رجالية, أحذية نسائية, أحذية أطفال, تسوق أحذية, ماركات أحذية" />
        <link rel="canonical" href="https://shoe-store-pi-three.vercel.app/" />
      </Helmet>
      {/* Hero Section */}
      <div className="relative h-[80vh] sm:h-[85vh] lg:h-[90vh] overflow-hidden">
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
          <div className="flex flex-col justify-center items-center h-full max-w-[95%] sm:max-w-[90%] lg:max-w-[80%] mx-auto text-center px-3 sm:px-4 lg:px-0">
            <motion.div
              className="flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-6"
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight shadow-text">
                اكتشف عالم الأناقة مع تشكيلة أحذيتنا العصرية
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed max-w-3xl shadow-text">
                نقدم لك أفضل الماركات العالمية بأسعار تنافسية مع خدمة توصيل سريعة وضمان الجودة
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto pt-4 sm:pt-2">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 text-sm sm:text-base font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 hover:-translate-y-1 shadow-lg transition-all duration-300"
                >
                  <span>تسوق الآن</span>
                  <FiShoppingBag className="mr-2" />
                </Link>
                <Link
                  to="/products?sale=true"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 text-sm sm:text-base font-medium text-white border-2 border-white rounded-lg hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
                >
                  العروض
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex flex-col items-center">
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-teal-600 text-xs sm:text-sm tracking-wider uppercase mb-3 sm:mb-4 block">ما يميزنا</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">تجربة تسوق لا مثيل لها</h2>
              <div className="w-24 h-1 bg-teal-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
              {[
                {
                  icon: FiPackage,
                  title: 'شحن عالمي سريع',
                  description: 'توصيل سريع لباب منزلك مع تتبع مباشر للشحنة'
                },
                {
                  icon: FiShield,
                  title: 'ضمان الجودة',
                  description: 'منتجات أصلية 100% مع ضمان استرداد كامل'
                },
                {
                  icon: FiClock,
                  title: 'خدمة 24/7',
                  description: 'دعم فني متخصص على مدار الساعة لمساعدتك'
                },
                {
                  icon: FiHeart,
                  title: 'مكافآت حصرية',
                  description: 'برنامج ولاء مميز مع خصومات وعروض خاصة'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <div className="absolute -top-6 right-8">
                      <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-12 sm:py-16 md:py-20 bg-teal-50">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-8 md:p-12">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600"></div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="inline-block text-teal-600 text-xs sm:text-sm tracking-wider uppercase">انضم إلى عائلتنا</span>
                <h2 className="text-3xl sm:text-4xl font-bold leading-tight">احصل على تجربة تسوق مميزة</h2>
                <p className="text-gray-600 text-base sm:text-lg">
                  اشترك الآن واحصل على خصم 15% على أول طلب لك، بالإضافة إلى عروض حصرية وإشعارات مسبقة عن التخفيضات
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="بريدك الإلكتروني"
                    className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-right"
                  />
                  <button className="px-6 sm:px-8 py-3 sm:py-4 bg-teal-500 text-white rounded-lg sm:rounded-xl hover:bg-teal-600 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
                    اشترك الآن
                  </button>
                </div>
              </div>
              <div className="relative hidden md:block">
                <img
                  src="https://billyfootwear.com/cdn/shop/files/BW24171-420_45_lateral_940x614_b8c6572b-2796-42aa-9010-aa7f2c102975.jpg?v=1719356349&width=533"
                  alt="Newsletter"
                  className="rounded-2xl shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-500"
                />
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-teal-100 rounded-full opacity-50 blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Products Section */}
      <div className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex flex-col items-center">
            <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
              <span className="inline-block text-teal-600 text-xs sm:text-sm tracking-wider uppercase">اكتشف الجديد</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">أحدث التشكيلات</h2>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                تصاميم عصرية تجمع بين الأناقة والراحة لتناسب أسلوب حياتك
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative bg-gray-50 rounded-2xl overflow-hidden">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    {product.sale && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                          خصم {product.discount}%
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-0 inset-x-0 h-full bg-gradient-to-t from-black/60 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <div className="absolute bottom-0 inset-x-0 p-6">
                        <Link
                          to={`/product/${product.id}`}
                          className="w-full bg-white text-gray-900 text-center py-3 rounded-xl font-medium hover:bg-teal-500 hover:text-white transition-colors duration-300"
                        >
                          عرض التفاصيل
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm text-teal-600 font-medium">{product.category}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-gray-600 text-sm mr-1">{product.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold mb-2 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl font-bold text-gray-900">{product.price} ريال</span>
                      {product.oldPrice && (
                        <span className="text-gray-400 line-through">{product.oldPrice} ريال</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              to="/products"
              className="mt-16 inline-flex items-center px-8 py-4 bg-black text-white rounded-full font-medium
                hover:bg-teal-500 transform hover:-translate-y-1 transition-all duration-300 gap-3 shadow-lg"
            >
              <span>استكشف جميع المنتجات</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center space-y-12 md:space-y-16">
            <div className="text-center max-w-3xl mx-auto">
              <motion.span
                className="inline-block text-teal-600 text-sm font-medium tracking-wider uppercase mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                تصنيفات مميزة
              </motion.span>
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                تصفح حسب الفئة
              </motion.h2>
              <motion.p
                className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                اختر من تشكيلتنا الواسعة من الأحذية المناسبة لجميع الأذواق والمناسبات
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full">
              {FeaturedCategories.map((category, index) => (
                <motion.div
                  key={index}
                  className="group relative h-[400px] sm:h-[450px] overflow-hidden rounded-2xl shadow-xl"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <Link to={category.href} className="block h-full">
                    <div className="absolute inset-0">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    </div>

                    <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
                        className="relative z-10 space-y-4"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-1 bg-teal-500 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-300" />
                          <span className="text-teal-400 font-medium">
                            {index + 1 < 10 ? `0${index + 1}` : index + 1}
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                          {category.title}
                        </h3>
                        <p className="text-gray-300 text-base sm:text-lg mb-6 max-w-md">
                          {category.description}
                        </p>

                        <div className="flex items-center gap-4 text-white group/btn">
                          <span className="font-medium group-hover/btn:text-teal-400 transition-colors duration-300">
                            تصفح الفئة
                          </span>
                          <FiArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform duration-300" />
                        </div>
                      </motion.div>
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