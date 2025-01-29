import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  SimpleGrid,
  Image,
  Heading,
  Text,
  Badge,
  Stack,
  Button,
  Select,
  HStack,
  Wrap,
  WrapItem,
  useToast,
  IconButton,
  VStack,
  Divider,
  Flex,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,
  AspectRatio,
  Icon,
  Spinner,
  Center
} from '@chakra-ui/react';
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
  const toast = useToast();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');

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
        toast({
          title: 'Error',
          description: 'Failed to fetch products',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchProducts();
  }, [toast]);

  // Update category when URL parameter changes
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

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
      
      toast({
        title: isInWishlist ? 'تمت الإزالة من المفضلة' : 'تمت الإضافة إلى المفضلة',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      return newWishlist;
    });
  };

  const renderProductCard = (product) => (
    <Box
      key={product.id}
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
      position="relative"
    >
      <RouterLink to={`/product/${product.id}`}>
        <AspectRatio ratio={1}>
          <Image
            src={product.image}
            alt={product.name}
            objectFit="cover"
            w="100%"
            h="100%"
          />
        </AspectRatio>
      </RouterLink>
      <IconButton
        icon={<FiHeart fill={wishlist.includes(product.id) ? 'red' : 'none'} />}
        aria-label="Add to wishlist"
        position="absolute"
        top={4}
        right={4}
        colorScheme={wishlist.includes(product.id) ? 'red' : 'gray'}
        variant="solid"
        bg="white"
        onClick={() => toggleWishlist(product.id)}
        _hover={{ transform: 'scale(1.1)' }}
      />
      {!product.inStock && (
        <Badge
          position="absolute"
          top={4}
          left={4}
          colorScheme="red"
          variant="solid"
        >
          نفذت الكمية
        </Badge>
      )}
      <VStack p={6} align="stretch" spacing={4}>
        <HStack fontSize="sm" color={textColor} spacing={4}>
          <Flex align="center">
            <Icon as={FiCalendar} mr={2} />
            <Text>28 يناير 2025</Text>
          </Flex>
          <Flex align="center">
            <Icon as={FiUser} mr={2} />
            <Text>{getCategoryLabel(product.category)}</Text>
          </Flex>
        </HStack>

        <VStack align="stretch" spacing={2}>
          <Heading size="md" noOfLines={2}>
            {product.name}
          </Heading>
          <Text color={textColor} noOfLines={2}>
            حذاء {product.type} من ماركة {product.brand} متوفر بعدة مقاسات وألوان.
          </Text>
        </VStack>

        <HStack justify="space-between" align="center">
          <Text fontWeight="bold" fontSize="xl" color="blue.500">
            {product.price} ريال
          </Text>
          <Badge colorScheme="blue" fontSize="sm" px={2} py={1}>
            {product.brand}
          </Badge>
        </HStack>

        <Wrap spacing={2}>
          <WrapItem>
            <Badge colorScheme="purple">{product.type}</Badge>
          </WrapItem>
          <WrapItem>
            <Badge colorScheme="yellow">
              {product.rating} ★ ({product.reviews})
            </Badge>
          </WrapItem>
        </Wrap>

        <Button
          as={RouterLink}
          to={`/product/${product.id}`}
          colorScheme="blue"
          width="100%"
          isDisabled={!product.inStock}
          leftIcon={<FiShoppingBag />}
        >
          {product.inStock ? 'عرض التفاصيل' : 'نفذت الكمية'}
        </Button>
      </VStack>
    </Box>
  );

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <VStack spacing={4}>
          <Heading size="md" color="red.500">{error}</Heading>
          <Button colorScheme="blue" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </VStack>
      </Center>
    );
  }

  return (
    <Box>
      {/* Header Section */}
      <Box bg={bgColor} borderBottom="1px" borderColor={borderColor} py={8}>
        <Container maxW="container.xl">
          <VStack spacing={6} align="stretch">
            <Heading size="2xl" textAlign="center">متجر الأحذية</Heading>
            <Text fontSize="lg" color={textColor} textAlign="center">
              اكتشف مجموعتنا الواسعة من الأحذية العصرية والأنيقة
            </Text>
            <Divider maxW="100px" mx="auto" borderColor="blue.500" borderWidth={2} />
          </VStack>
        </Container>
      </Box>

      {/* Filters Section */}
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8}>
          <HStack 
            spacing={4} 
            w="full" 
            bg={cardBg}
            p={4}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            flexWrap={{ base: "wrap", md: "nowrap" }}
            gap={4}
          >
            <InputGroup maxW={{ base: "full", md: "320px" }}>
              <InputLeftElement pointerEvents="none">
                <FiSearch color="gray.300" />
              </InputLeftElement>
              <Input placeholder="ابحث عن منتج..." />
            </InputGroup>
            <Select 
              value={selectedCategory} 
              onChange={handleCategoryChange}
              bg={cardBg}
            >
              <option value="all">جميع الفئات</option>
              <option value="men">رجال</option>
              <option value="women">نساء</option>
              <option value="kids">أطفال</option>
            </Select>
            <Select 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
              bg={cardBg}
            >
              <option value="all">جميع الأنواع</option>
              <option value="رياضي">رياضي</option>
              <option value="كاجوال">كاجوال</option>
              <option value="رسمي">رسمي</option>
              <option value="مدرسي">مدرسي</option>
            </Select>
          </HStack>

          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8} w="full">
            {filteredProducts.map((product) => renderProductCard(product))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Products;
