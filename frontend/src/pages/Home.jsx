import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
  Grid,
  GridItem,
  Badge,
  Divider,
} from '@chakra-ui/react';
import { FiTruck, FiCreditCard, FiRefreshCw, FiPhoneCall, FiArrowRight, FiStar, FiCalendar, FiUser } from 'react-icons/fi';

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
    href: '/products?category=men'
  },
  {
    title: 'نساء',
    description: 'أحذية نسائية عصرية',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
    href: '/products?category=women'
  },
  {
    title: 'أطفال',
    description: 'أحذية مريحة للأطفال',
    image: 'https://images.unsplash.com/photo-1507464098880-e367bc5d2c08',
    href: '/products?category=kids'
  },
];

const features = [
  {
    icon: FiTruck,
    title: 'شحن مجاني',
    description: 'للطلبات فوق 500 ريال',
  },
  {
    icon: FiRefreshCw,
    title: 'استبدال سهل',
    description: 'خلال 14 يوم',
  },
  {
    icon: FiCreditCard,
    title: 'دفع آمن',
    description: 'طرق دفع متعددة',
  },
  {
    icon: FiPhoneCall,
    title: 'دعم متواصل',
    description: 'خدمة عملاء 24/7',
  },
];

const Home = () => {
  const bgGradient = useColorModeValue(
    'linear(to-r, blue.500, purple.500)',
    'linear(to-r, blue.700, purple.700)'
  );
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box>
      {/* Hero Section */}
      <Box
        position="relative"
        h={{ base: "90vh", lg: "85vh" }}
        overflow="hidden"
      >
        {/* Background Image */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgImage="url('https://images.unsplash.com/photo-1549298916-b41d501d3772')"
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          filter="brightness(0.7)"
        />

        {/* Overlay Gradient */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4))"
        />

        {/* Content */}
        <Container 
          maxW="container.xl" 
          h="full" 
          position="relative" 
          zIndex={1}
        >
          <Flex 
            direction="column" 
            justify="center" 
            align="center"
            h="full"
            maxW={{ base: "100%", lg: "80%" }}
            mx="auto"
            textAlign="center"
            px={{ base: 4, lg: 0 }}
          >
            <VStack align="center" spacing={{ base: 4, md: 6 }}>
              <Badge 
                colorScheme="blue" 
                fontSize={{ base: "sm", md: "md" }} 
                px={3} 
                py={1}
                bg="blue.500"
                color="white"
              >
                متجر متميز
              </Badge>
              <Heading
                as="h1"
                fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
                fontWeight="bold"
                lineHeight="shorter"
                color="white"
              >
                اكتشف عالم الأناقة مع تشكيلة أحذيتنا العصرية
              </Heading>
              <Text 
                fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }} 
                color="gray.100"
                lineHeight="tall"
              >
                نقدم لك أفضل الماركات العالمية بأسعار تنافسية مع خدمة توصيل سريعة وضمان الجودة
              </Text>
              <Stack 
                direction={{ base: "column", sm: "row" }} 
                spacing={{ base: 3, sm: 4 }}
                w={{ base: "full", sm: "auto" }}
                pt={2}
              >
                <Button
                  as={RouterLink}
                  to="/products"
                  size={{ base: "lg", md: "lg" }}
                  colorScheme="blue"
                  rightIcon={<FiArrowRight />}
                  px={8}
                  w={{ base: "full", sm: "auto" }}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'xl',
                  }}
                >
                  تسوق الآن
                </Button>
                <Button
                  as={RouterLink}
                  to="/products?sale=true"
                  size={{ base: "lg", md: "lg" }}
                  variant="outline"
                  colorScheme="whiteAlpha"
                  color="white"
                  px={8}
                  w={{ base: "full", sm: "auto" }}
                  _hover={{
                    bg: 'whiteAlpha.200',
                    transform: 'translateY(-2px)',
                  }}
                >
                  العروض
                </Button>
              </Stack>
            </VStack>
          </Flex>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={{ base: 8, md: 12 }} borderBottom="1px" borderColor={borderColor} px={{ base: 4, md: 0 }}>
        <Container maxW="container.xl">
          <SimpleGrid
            columns={{ base: 1, sm: 2, lg: 4 }}
            spacing={{ base: 6, md: 8 }}
          >
            {features.map((feature, index) => (
              <Stack
                key={index}
                direction={{ base: "row" }}
                align={{ base: "center", md: "start" }}
                spacing={4}
              >
                <Flex
                  w={{ base: 10, md: 12 }}
                  h={{ base: 10, md: 12 }}
                  align="center"
                  justify="center"
                  rounded="full"
                  bg="blue.50"
                  color="blue.500"
                  flexShrink={0}
                >
                  <Icon as={feature.icon} w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} />
                </Flex>
                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
                    {feature.title}
                  </Text>
                  <Text color={textColor} fontSize={{ base: "sm", md: "md" }}>
                    {feature.description}
                  </Text>
                </VStack>
              </Stack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Products Section */}
      <Box py={{ base: 8, sm: 12, md: 16 }} px={{ base: 4, md: 0 }}>
        <Container maxW="container.xl">
          <VStack spacing={{ base: 8, md: 12 }}>
            <Stack spacing={{ base: 3, md: 4 }} textAlign="center" w="full">
              <Heading size={{ base: "xl", md: "2xl" }}>أحدث المنتجات</Heading>
              <Text 
                fontSize={{ base: "md", md: "lg" }} 
                color={textColor} 
                maxW="2xl" 
                mx="auto"
                px={{ base: 4, md: 0 }}
              >
                اكتشف أحدث صيحات الموضة وأكثر المنتجات مبيعاً
              </Text>
              <Divider maxW="100px" mx="auto" borderColor="blue.500" borderWidth={2} />
            </Stack>
            <SimpleGrid
              columns={{ base: 1, sm: 2, lg: 3 }}
              spacing={{ base: 6, md: 8 }}
              w="100%"
            >
              {TrendingProducts.map((product) => (
                <Box
                  key={product.id}
                  as={RouterLink}
                  to={`/products/${product.id}`}
                  bg={cardBg}
                  rounded="lg"
                  overflow="hidden"
                  borderWidth="1px"
                  borderColor={borderColor}
                  transition="all 0.3s"
                  _hover={{
                    transform: 'translateY(-4px)',
                    shadow: 'lg',
                  }}
                >
                  <Box position="relative">
                    <AspectRatio ratio={{ base: 4/3, md: 16/9 }}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        objectFit="cover"
                      />
                    </AspectRatio>
                    {product.sale && (
                      <Badge
                        position="absolute"
                        top={{ base: 2, md: 4 }}
                        right={{ base: 2, md: 4 }}
                        colorScheme="red"
                        variant="solid"
                        rounded="full"
                        px={3}
                        fontSize={{ base: "xs", md: "sm" }}
                      >
                        تخفيض
                      </Badge>
                    )}
                  </Box>
                  <Box p={{ base: 4, md: 6 }}>
                    <VStack align="start" spacing={{ base: 2, md: 3 }}>
                      <HStack spacing={2} fontSize={{ base: "xs", md: "sm" }} color={textColor}>
                        <Icon as={FiCalendar} />
                        <Text>28 يناير 2025</Text>
                        <Icon as={FiUser} />
                        <Text>{product.category}</Text>
                      </HStack>
                      <Heading size={{ base: "sm", md: "md" }} noOfLines={2}>
                        {product.name}
                      </Heading>
                      <Text 
                        color={textColor} 
                        noOfLines={3}
                        fontSize={{ base: "sm", md: "md" }}
                      >
                        حذاء رياضي عصري يجمع بين الراحة والأناقة. مثالي للاستخدام اليومي والرياضة.
                      </Text>
                      <HStack spacing={2}>
                        <Text 
                          fontWeight="bold" 
                          fontSize={{ base: "lg", md: "xl" }} 
                          color="blue.500"
                        >
                          {product.price} ريال
                        </Text>
                        {product.oldPrice && (
                          <Text
                            fontSize={{ base: "sm", md: "md" }}
                            color={textColor}
                            textDecoration="line-through"
                          >
                            {product.oldPrice} ريال
                          </Text>
                        )}
                      </HStack>
                      <Button
                        colorScheme="blue"
                        variant="outline"
                        size={{ base: "sm", md: "md" }}
                        width="full"
                        rightIcon={<FiArrowRight />}
                      >
                        اقرأ المزيد
                      </Button>
                    </VStack>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Categories Section */}
      <Box 
        py={{ base: 8, sm: 12, md: 16 }} 
        px={{ base: 4, md: 0 }}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Container maxW="container.xl">
          <VStack spacing={{ base: 8, md: 12 }}>
            <Stack spacing={{ base: 3, md: 4 }} textAlign="center" w="full">
              <Heading size={{ base: "xl", md: "2xl" }}>تصفح حسب الفئة</Heading>
              <Text 
                fontSize={{ base: "md", md: "lg" }} 
                color={textColor} 
                maxW="2xl" 
                mx="auto"
                px={{ base: 4, md: 0 }}
              >
                اختر من تشكيلتنا الواسعة من الأحذية المناسبة لجميع الأذواق والمناسبات
              </Text>
              <Divider maxW="100px" mx="auto" borderColor="blue.500" borderWidth={2} />
            </Stack>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={{ base: 6, md: 8 }}
              w="100%"
            >
              {FeaturedCategories.map((category, index) => (
                <Box
                  key={index}
                  as={RouterLink}
                  to={category.href}
                  position="relative"
                  role="group"
                  overflow="hidden"
                  rounded="lg"
                  shadow="md"
                >
                  <AspectRatio ratio={{ base: 16/9, md: 4/3 }}>
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
                    bg="blackAlpha.600"
                    transition="0.3s"
                    _groupHover={{ bg: 'blackAlpha.400' }}
                  />
                  <VStack
                    position="absolute"
                    bottom="0"
                    w="100%"
                    p={{ base: 4, md: 6 }}
                    spacing={{ base: 1, md: 2 }}
                  >
                    <Heading size={{ base: "md", md: "lg" }} color="white">
                      {category.title}
                    </Heading>
                    <Text
                      color="white"
                      fontSize={{ base: "sm", md: "md" }}
                      textAlign="center"
                    >
                      {category.description}
                    </Text>
                    <Button
                      variant="outline"
                      colorScheme="whiteAlpha"
                      size={{ base: "sm", md: "md" }}
                      rightIcon={<FiArrowRight />}
                    >
                      تصفح الفئة
                    </Button>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
