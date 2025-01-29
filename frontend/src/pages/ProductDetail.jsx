import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Grid,
  Image,
  Text,
  Heading,
  Stack,
  Button,
  Badge,
  HStack,
  VStack,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  List,
  ListItem,
  ListIcon,
  Divider,
  useColorModeValue,
  IconButton,
  SimpleGrid,
  Progress,
  Flex,
} from '@chakra-ui/react';
import { FiHeart, FiShoppingCart, FiCheck, FiTruck, FiRefreshCcw, FiShield, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('teal.100', 'teal.700');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const primaryColor = useColorModeValue('teal.500', 'teal.300');
  const secondaryColor = useColorModeValue('purple.500', 'purple.300');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://shoe-store-morocco.onrender.com/products/${id}`);
        const productData = response.data;
        
        // Set default values for missing fields
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

  if (loading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Text>Loading...</Text>
      </Box>
    );
  }

  if (error || !product) {
    return null;
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: 'تنبيه',
        description: 'الرجاء اختيار المقاس واللون',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity
    });
    
    toast({
      title: 'تمت الإضافة',
      description: 'تمت إضافة المنتج إلى سلة التسوق',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
    toast({
      title: isWishlist ? 'تمت الإزالة' : 'تمت الإضافة',
      description: isWishlist ? 'تم إزالة المنتج من المفضلة' : 'تمت إضافة المنتج إلى المفضلة',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const totalReviews = Object.values(product.ratingBreakdown).reduce((a, b) => a + b, 0);

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh" py={8}>
      <Container maxW="container.xl">
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8}>
          {/* Product Images */}
          <Box bg={bgColor} p={6} borderRadius="lg" shadow="md">
            <Box position="relative" mb={6}>
              <Image
                src={product.images[selectedImage]}
                alt={`${product.name} - صورة ${selectedImage + 1}`}
                borderRadius="lg"
                w="100%"
                h={{ base: "300px", md: "500px" }}
                objectFit="cover"
              />
              <IconButton
                icon={<FiHeart fill={isWishlist ? 'red' : 'none'} />}
                aria-label="Add to wishlist"
                position="absolute"
                top={4}
                right={4}
                colorScheme={isWishlist ? 'red' : 'gray'}
                onClick={toggleWishlist}
              />
            </Box>
            <SimpleGrid columns={3} spacing={4}>
              {product.images.map((image, index) => (
                <Box
                  key={index}
                  borderWidth={selectedImage === index ? "2px" : "1px"}
                  borderColor={selectedImage === index ? "teal.500" : borderColor}
                  borderRadius="md"
                  overflow="hidden"
                  cursor="pointer"
                  onClick={() => setSelectedImage(index)}
                  transition="all 0.2s"
                  _hover={{ opacity: 0.8 }}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - صورة ${index + 1}`}
                    w="100%"
                    h="100px"
                    objectFit="cover"
                  />
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* Product Info */}
          <Stack spacing={6} bg={bgColor} p={6} borderRadius="lg" shadow="md">
            <Box>
              <HStack spacing={2} mb={2}>
                <Badge colorScheme="teal" fontSize="sm">
                  {product.brand}
                </Badge>
                <Badge colorScheme="purple" fontSize="sm">
                  متوفر
                </Badge>
              </HStack>
              <Heading size="lg" mb={2}>
                {product.name}
              </Heading>
              <HStack spacing={2} mb={4}>
                <HStack color="purple.400">
                  <FiStar fill="currentColor" />
                  <Text fontWeight="bold">{product.rating}</Text>
                </HStack>
                <Text color={textColor}>({product.reviews} تقييم)</Text>
              </HStack>
              <Text fontSize="2xl" fontWeight="bold" color={primaryColor}>
                {product.price} ريال
              </Text>
            </Box>

            <Divider />

            {/* Selections */}
            <Stack spacing={4}>
              <Box>
                <Text fontWeight="bold" mb={2}>المقاس</Text>
                <SimpleGrid columns={6} spacing={2}>
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      size="sm"
                      variant={selectedSize === size ? 'solid' : 'outline'}
                      colorScheme="teal"
                      onClick={() => setSelectedSize(size)}
                      w="100%"
                      _hover={{
                        bg: selectedSize === size ? 'teal.600' : 'teal.50',
                      }}
                    >
                      {size}
                    </Button>
                  ))}
                </SimpleGrid>
              </Box>

              <Box>
                <Text fontWeight="bold" mb={2}>اللون</Text>
                <SimpleGrid columns={3} spacing={2}>
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      size="sm"
                      variant={selectedColor === color ? 'solid' : 'outline'}
                      colorScheme="teal"
                      onClick={() => setSelectedColor(color)}
                      w="100%"
                      _hover={{
                        bg: selectedColor === color ? 'teal.600' : 'teal.50',
                      }}
                    >
                      {color}
                    </Button>
                  ))}
                </SimpleGrid>
              </Box>

              <Box>
                <Text fontWeight="bold" mb={2}>الكمية</Text>
                <HStack maxW="200px">
                  <Button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    colorScheme="teal"
                    variant="outline"
                  >
                    -
                  </Button>
                  <Text px={4} fontWeight="bold" color={textColor}>
                    {quantity}
                  </Text>
                  <Button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= 10}
                    colorScheme="teal"
                    variant="outline"
                  >
                    +
                  </Button>
                </HStack>
              </Box>
            </Stack>

            <Button
              colorScheme="teal"
              size="lg"
              leftIcon={<FiShoppingCart />}
              onClick={handleAddToCart}
              isFullWidth
              _hover={{
                bg: 'teal.600',
                transform: 'translateY(-2px)',
                shadow: 'lg',
              }}
              transition="all 0.3s"
            >
              إضافة إلى السلة
            </Button>

            {/* Features */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <VStack
                p={4}
                bg={useColorModeValue('teal.50', 'rgba(49, 151, 149, 0.1)')}
                borderRadius="md"
                align="center"
                transition="all 0.3s"
                _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
              >
                <Box color="teal.500">
                  <FiTruck size={24} />
                </Box>
                <Text fontWeight="bold" fontSize="sm">شحن مجاني</Text>
                <Text fontSize="sm" color={textColor} textAlign="center">
                  للطلبات فوق 200 ريال
                </Text>
              </VStack>
              <VStack
                p={4}
                bg={useColorModeValue('purple.50', 'rgba(128, 90, 213, 0.1)')}
                borderRadius="md"
                align="center"
                transition="all 0.3s"
                _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
              >
                <Box color="purple.500">
                  <FiRefreshCcw size={24} />
                </Box>
                <Text fontWeight="bold" fontSize="sm">إرجاع مجاني</Text>
                <Text fontSize="sm" color={textColor} textAlign="center">
                  خلال 30 يوم
                </Text>
              </VStack>
              <VStack
                p={4}
                bg={useColorModeValue('teal.50', 'rgba(49, 151, 149, 0.1)')}
                borderRadius="md"
                align="center"
                transition="all 0.3s"
                _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
              >
                <Box color="teal.500">
                  <FiShield size={24} />
                </Box>
                <Text fontWeight="bold" fontSize="sm">ضمان الجودة</Text>
                <Text fontSize="sm" color={textColor} textAlign="center">
                  منتجات أصلية 100%
                </Text>
              </VStack>
            </SimpleGrid>

            {/* Tabs */}
            <Tabs colorScheme="teal">
              <TabList>
                <Tab>الوصف</Tab>
                <Tab>المميزات</Tab>
                <Tab>التقييمات</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Text color={textColor}>{product.description}</Text>
                </TabPanel>

                <TabPanel>
                  <List spacing={3}>
                    {product.features.map((feature, index) => (
                      <ListItem key={index}>
                        <ListIcon as={FiCheck} color="teal.500" />
                        {feature}
                      </ListItem>
                    ))}
                  </List>
                </TabPanel>

                <TabPanel>
                  <VStack align="stretch" spacing={4}>
                    <HStack justify="space-between">
                      <Box>
                        <Text fontSize="3xl" fontWeight="bold">
                          {product.rating}
                        </Text>
                        <Text color={textColor}>
                          من 5 ({totalReviews} تقييم)
                        </Text>
                      </Box>
                      <VStack align="stretch" flex="1" maxW="400px">
                        {Object.entries(product.ratingBreakdown)
                          .reverse()
                          .map(([rating, count]) => (
                            <HStack key={rating} spacing={4}>
                              <Text w="10px">{rating}</Text>
                              <Progress
                                value={(count / totalReviews) * 100}
                                size="sm"
                                colorScheme="teal"
                                flex="1"
                              />
                              <Text w="40px">{count}</Text>
                            </HStack>
                          ))}
                      </VStack>
                    </HStack>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetail;
