import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Stack,
  Image,
  SimpleGrid,
  Flex,
  Icon,
  VStack,
  HStack,
  useColorModeValue,
  AspectRatio,
  Badge,
  Divider,
  useBreakpointValue,
  Skeleton,
  Input
} from '@chakra-ui/react';
import {
  FiTruck,
  FiCreditCard,
  FiRefreshCw,
  FiPhoneCall,
  FiArrowRight,
  FiShoppingBag,
} from 'react-icons/fi';
import { motion } from 'framer-motion';

// Wrap ChakraUI components with motion
const MotionBox = motion(Box);
const MotionBadge = motion(Badge);
const MotionVStack = motion(VStack);

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

  const bgGradient = useColorModeValue(
    'linear(to-r, teal.500, purple.500)',
    'linear(to-r, teal.600, purple.600)',
  );

  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const borderColor = useColorModeValue('teal.100', 'teal.700');

  // Responsive font sizes
  const heroHeadingSize = useBreakpointValue({ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' });
  const sectionHeadingSize = useBreakpointValue({ base: 'xl', md: '2xl' });

  return (
    <Box>
      {/* Hero Section */}
      <Box
        position="relative"
        h={{ base: '90vh', lg: '85vh' }}
        overflow="hidden"
      >
        {/* Background Images with Scroll Effect */}
        {backgroundImages.map((image, index) => (
          <MotionBox
            key={index}
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgImage={`url('${image}')`}
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            filter="brightness(0.7)"
            initial={{ opacity: 0, x: '100%' }}
            animate={{
              opacity: currentImageIndex === index ? 1 : 0,
              x: currentImageIndex === index ? '0%' : '-100%',
            }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
            }}
            style={{
              zIndex: currentImageIndex === index ? 1 : 0,
            }}
          />
        ))}
        {/* Overlay Gradient */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient="linear(to-r, rgba(0,0,0,0.8), rgba(0,0,0,0.4))"
        />

        {/* Content */}
        <Container maxW="container.xl" h="full" position="relative" zIndex={1}>
          <Flex
            direction="column"
            justify="center"
            align="center"
            h="full"
            maxW={{ base: '100%', lg: '80%' }}
            mx="auto"
            textAlign="center"
            px={{ base: 4, lg: 0 }}
          >
            <MotionVStack
              align="center"
              spacing={{ base: 4, md: 6 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MotionBadge
                colorScheme="teal"
                fontSize={{ base: 'sm', md: 'md' }}
                px={3}
                py={1}
                bg="teal.500"
                color="white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                متجر متميز
              </MotionBadge>
              <Heading
                as="h1"
                fontSize={heroHeadingSize}
                fontWeight="bold"
                lineHeight="shorter"
                color="white"
                textShadow="2px 2px 4px rgba(0,0,0,0.3)"
              >
                اكتشف عالم الأناقة مع تشكيلة أحذيتنا العصرية
              </Heading>
              <Text
                fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
                color="gray.100"
                lineHeight="tall"
                maxW="3xl"
                textShadow="1px 1px 2px rgba(0,0,0,0.2)"
              >
                نقدم لك أفضل الماركات العالمية بأسعار تنافسية مع خدمة توصيل سريعة وضمان الجودة
              </Text>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                spacing={{ base: 3, sm: 4 }}
                w={{ base: 'full', sm: 'auto' }}
                pt={2}
              >
                <Button
                  as={RouterLink}
                  to="/products"
                  size={{ base: 'lg', md: 'lg' }}
                  colorScheme="teal"
                  rightIcon={<FiShoppingBag />}
                  px={8}
                  w={{ base: 'full', sm: 'auto' }}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'xl',
                    bg: 'teal.600',
                  }}
                  transition="all 0.3s"
                >
                  تسوق الآن
                </Button>
                <Button
                  as={RouterLink}
                  to="/products?sale=true"
                  size={{ base: 'lg', md: 'lg' }}
                  variant="outline"
                  colorScheme="whiteAlpha"
                  color="white"
                  px={8}
                  w={{ base: 'full', sm: 'auto' }}
                  _hover={{
                    bg: 'whiteAlpha.200',
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.3s"
                >
                  العروض
                </Button>
              </Stack>
            </MotionVStack>
          </Flex>
        </Container>
      </Box>


        {/* Features Section */}
        <Box py={{ base: 12, md: 16 }} bg={useColorModeValue('white', 'gray.900')}>
        <Container maxW="container.xl">
          <VStack spacing={8}>
            <Stack spacing={4} textAlign="center">
              <Heading size={sectionHeadingSize}>لماذا تختارنا؟</Heading>
              <Text fontSize={{ base: 'md', md: 'lg' }} color={textColor} maxW="2xl" mx="auto">
                نقدم لك تجربة تسوق استثنائية مع مزايا حصرية
              </Text>
            </Stack>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <VStack
                  p={6}
                  bg={cardBg}
                  rounded="xl"
                  shadow="md"
                  spacing={4}
                  h="full"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <Icon as={FiTruck} w={8} h={8} color="teal.500" />
                  <Heading size="md">توصيل مجاني</Heading>
                  <Text textAlign="center" color={textColor}>
                    توصيل مجاني لجميع الطلبات التي تزيد عن 500 ريال
                  </Text>
                </VStack>
              </MotionBox>

              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <VStack
                  p={6}
                  bg={cardBg}
                  rounded="xl"
                  shadow="md"
                  spacing={4}
                  h="full"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <Icon as={FiCreditCard} w={8} h={8} color="teal.500" />
                  <Heading size="md">دفع آمن</Heading>
                  <Text textAlign="center" color={textColor}>
                    طرق دفع متعددة وآمنة مع حماية كاملة لبياناتك
                  </Text>
                </VStack>
              </MotionBox>

              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <VStack
                  p={6}
                  bg={cardBg}
                  rounded="xl"
                  shadow="md"
                  spacing={4}
                  h="full"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <Icon as={FiRefreshCw} w={8} h={8} color="teal.500" />
                  <Heading size="md">استبدال سهل</Heading>
                  <Text textAlign="center" color={textColor}>
                    سياسة استبدال مرنة خلال 30 يوماً من الشراء
                  </Text>
                </VStack>
              </MotionBox>

              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <VStack
                  p={6}
                  bg={cardBg}
                  rounded="xl"
                  shadow="md"
                  spacing={4}
                  h="full"
                  borderWidth="1px"
                  borderColor={borderColor}
                >
                  <Icon as={FiPhoneCall} w={8} h={8} color="teal.500" />
                  <Heading size="md">دعم متواصل</Heading>
                  <Text textAlign="center" color={textColor}>
                    فريق دعم متخصص متواجد على مدار الساعة لخدمتك
                  </Text>
                </VStack>
              </MotionBox>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Box py={{ base: 12, md: 16 }} bg={useColorModeValue('gray.50', 'gray.800')}>
        <Container maxW="container.xl">
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 8, md: 12 }}
            align="center"
            justify="space-between"
            bg={cardBg}
            p={{ base: 8, md: 12 }}
            rounded="2xl"
            shadow="xl"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <VStack align={{ base: 'center', md: 'start' }} spacing={4} flex="1">
              <Heading size={sectionHeadingSize}>اشترك في نشرتنا البريدية</Heading>
              <Text fontSize={{ base: 'md', md: 'lg' }} color={textColor}>
                احصل على آخر العروض والتخفيضات مباشرة في بريدك الإلكتروني
              </Text>
            </VStack>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              spacing={4}
              w={{ base: 'full', md: 'auto' }}
            >
              <Input
                placeholder="البريد الإلكتروني"
                size="lg"
                bg={useColorModeValue('white', 'gray.700')}
                borderColor={borderColor}
                _placeholder={{ color: 'gray.400' }}
                _hover={{ borderColor: 'teal.500' }}
                _focus={{ borderColor: 'teal.500', shadow: 'outline' }}
              />
              <Button
                colorScheme="teal"
                size="lg"
                px={8}
                _hover={{
                  transform: 'translateY(-2px)',
                  shadow: 'lg',
                }}
                transition="all 0.3s"
              >
                اشترك الآن
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>


      {/* Trending Products Section */}
      <Box py={{ base: 12, md: 16 }} bg={useColorModeValue('white', 'gray.900')}>
        <Container maxW="container.xl">
          <VStack spacing={{ base: 10, md: 16 }}>
            <Stack spacing={4} textAlign="center">
              <Heading size={sectionHeadingSize}>المنتجات الرائجة</Heading>
              <Text fontSize={{ base: 'md', md: 'lg' }} color={textColor} maxW="2xl" mx="auto">
                اكتشف أحدث صيحات الموضة في عالم الأحذية
              </Text>
            </Stack>
            
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={8} w="full">
              {TrendingProducts.map((product, index) => (
                <MotionBox
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <VStack
                    bg={cardBg}
                    rounded="xl"
                    shadow="lg"
                    overflow="hidden"
                    spacing={0}
                    h="full"
                    _hover={{ transform: 'translateY(-8px)', shadow: 'xl' }}
                    transition="all 0.3s"
                  >
                    <Box position="relative" w="full">
                      <AspectRatio ratio={1}>
                        <Image src={product.image} alt={product.name} objectFit="cover" />
                      </AspectRatio>
                      {product.sale && (
                        <Badge
                          position="absolute"
                          top={2}
                          right={2}
                          colorScheme="red"
                          variant="solid"
                          rounded="md"
                          px={2}
                        >
                          تخفيض
                        </Badge>
                      )}
                    </Box>
                    <VStack p={4} align="start" spacing={2} flex={1} w="full">
                      <Text fontSize="sm" color="gray.500">
                        {product.category}
                      </Text>
                      <Heading size="md" noOfLines={2}>
                        {product.name}
                      </Heading>
                      <HStack spacing={2}>
                        <Text fontWeight="bold" fontSize="xl" color="teal.500">
                          {product.price} ريال
                        </Text>
                        {product.oldPrice && (
                          <Text fontSize="md" color="gray.500" textDecoration="line-through">
                            {product.oldPrice} ريال
                          </Text>
                        )}
                      </HStack>
                      <Button
                        as={RouterLink}
                        to={`/product/${product.id}`}
                        colorScheme="teal"
                        size="sm"
                        w="full"
                        mt="auto"
                      >
                        عرض المنتج
                      </Button>
                    </VStack>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
            
            <Button
              as={RouterLink}
              to="/products"
              size="lg"
              colorScheme="teal"
              variant="outline"
              rightIcon={<FiArrowRight />}
              _hover={{
                transform: 'translateX(-4px)',
                shadow: 'md'
              }}
            >
              عرض جميع المنتجات
            </Button>
          </VStack>
        </Container>
      </Box>

     
      {/* Categories Section with Enhanced Animation */}
      <Box
        py={{ base: 12, md: 16 }}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Container maxW="container.xl">
          <VStack spacing={{ base: 10, md: 16 }}>
            <Stack spacing={{ base: 4, md: 6 }} textAlign="center" w="full">
              <Heading size={sectionHeadingSize}>تصفح حسب الفئة</Heading>
              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color={textColor}
                maxW="2xl"
                mx="auto"
              >
                اختر من تشكيلتنا الواسعة من الأحذية المناسبة لجميع الأذواق والمناسبات
              </Text>
              <Divider maxW="100px" mx="auto" borderColor="teal.500" borderWidth={2} />
            </Stack>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={{ base: 8, md: 10 }}
              w="100%"
            >
              {FeaturedCategories.map((category, index) => (
                <MotionBox
                  key={index}
                  as={RouterLink}
                  to={category.href}
                  position="relative"
                  role="group"
                  overflow="hidden"
                  rounded="xl"
                  shadow="lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <AspectRatio ratio={4 / 3}>
                    <Image
                      src={category.image}
                      alt={category.title}
                      objectFit="cover"
                      transition="0.3s"
                      _groupHover={{
                        transform: 'scale(1.1)',
                      }}
                    />
                  </AspectRatio>
                  <Box
                    position="absolute"
                    inset="0"
                    bgGradient="linear(to-t, blackAlpha.800, blackAlpha.400)"
                    transition="0.3s"
                    _groupHover={{ opacity: 0.8 }}
                  />
                  <VStack
                    position="absolute"
                    bottom="0"
                    w="100%"
                    p={{ base: 6, md: 8 }}
                    spacing={3}
                  >
                    <Heading
                      size={{ base: 'md', md: 'lg' }}
                      color="white"
                      textShadow="2px 2px 4px rgba(0,0,0,0.3)"
                    >
                      {category.title}
                    </Heading>
                    <Text
                      color="gray.100"
                      fontSize={{ base: 'sm', md: 'md' }}
                      textAlign="center"
                      textShadow="1px 1px 2px rgba(0,0,0,0.2)"
                    >
                      {category.description}
                    </Text>
                    <Button
                      variant="solid"
                      colorScheme="teal"
                      size={{ base: 'sm', md: 'md' }}
                      rightIcon={<FiArrowRight />}
                      _hover={{
                        transform: 'translateY(-2px)',
                        shadow: 'lg',
                        bg: 'teal.600',
                      }}
                      transition="all 0.3s"
                    >
                      تصفح الفئة
                    </Button>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;