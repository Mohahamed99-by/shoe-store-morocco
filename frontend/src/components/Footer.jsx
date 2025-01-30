import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiMapPin,
  FiPhone,
  FiMail,
  FiArrowLeft,
} from 'react-icons/fi';

const SocialButton = ({ icon: Icon, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-10 h-10 rounded-full text-gray-400 hover:text-teal-300 hover:-translate-y-1 transition-all duration-300"
    >
      <Icon className="w-5 h-5" />
    </a>
  );
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gray-900 text-gray-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-blue-500/10" />

      <div className="container relative mx-auto px-4 py-12 md:py-16 max-w-7xl">
        <div className="space-y-12">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr] gap-10 md:gap-16">
            {/* About Section */}
            <div className="space-y-6">
              <div>
                <img
                  src="/logo.svg"
                  alt="Logo"
                  className="h-10 md:h-11 brightness-0 invert"
                />
              </div>
              <p className="text-sm max-w-md text-gray-400 leading-relaxed">
                نحن نقدم أفضل الأحذية العالمية بأسعار تنافسية. جودة عالية وخدمة ممتازة هي أولويتنا.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-400">
                  <FiMapPin className="w-5 h-5 text-teal-400" />
                  <span className="text-sm">الرياض، المملكة العربية السعودية</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <FiPhone className="w-5 h-5 text-teal-400" />
                  <span className="text-sm" dir="ltr">+966 50 123 4567</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <FiMail className="w-5 h-5 text-teal-400" />
                  <span className="text-sm">info@shoesstore.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">
                روابط سريعة
              </h3>
              <div className="flex flex-col space-y-3">
                {[
                  { label: 'من نحن', path: '/about' },
                  { label: 'تواصل معنا', path: '/contact' },
                  { label: 'الوظائف', path: '/careers' },
                  { label: 'سياسة الخصوصية', path: '/privacy' },
                  { label: 'الشروط والأحكام', path: '/terms' },
                ].map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-teal-300 hover:-translate-x-1 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Customer Service */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">
                خدمة العملاء
              </h3>
              <div className="flex flex-col space-y-3">
                {[
                  { label: 'مركز المساعدة', path: '/help' },
                  { label: 'سياسة الإرجاع', path: '/returns' },
                  { label: 'الشحن والتوصيل', path: '/shipping' },
                  { label: 'دليل المقاسات', path: '/size-guide' },
                  { label: 'الأسئلة الشائعة', path: '/faq' },
                ].map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-teal-300 hover:-translate-x-1 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">
                النشرة البريدية
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                اشترك في نشرتنا البريدية للحصول على آخر العروض والتخفيضات
              </p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:border-teal-300 focus:ring-1 focus:ring-teal-300 transition-all duration-200"
                />
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 bg-teal-500 text-white rounded hover:-translate-x-1 transition-all duration-200 text-sm"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  اشتراك
                </button>
              </div>
            </div>
          </div>

          <hr className="border-gray-700" />

          {/* Bottom Section */}
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 md:gap-0">
            <p className="text-sm text-gray-400 text-center md:text-start">
              &copy; {new Date().getFullYear()} متجر الأحذية. جميع الحقوق محفوظة
            </p>
            <div className="flex gap-4">
              {[
                { icon: FiFacebook, href: 'https://facebook.com' },
                { icon: FiTwitter, href: 'https://twitter.com' },
                { icon: FiInstagram, href: 'https://instagram.com' },
                { icon: FiYoutube, href: 'https://youtube.com' },
              ].map((social, index) => (
                <SocialButton key={index} icon={social.icon} href={social.href} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
