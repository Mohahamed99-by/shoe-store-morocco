import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Stack,
  Image,
  Text,
  Button,
  Flex,
  IconButton,
  Divider,
  useToast,
  VStack,
  HStack,
  useColorModeValue,
  Progress,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon, DeleteIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { FiTruck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import CheckoutModal from '../components/CheckoutModal';

const Cart = () => {
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const toast = useToast();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
  } = useCart();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('teal.100', 'teal.700');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const primaryColor = useColorModeValue('teal.500', 'teal.300');
  const secondaryColor = useColorModeValue('purple.500', 'purple.300');

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1) {
      updateQuantity(item.id, item.size, item.color, newQuantity);
    }
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id, item.size, item.color);
    toast({
      title: 'تمت الإزالة',
      description: 'تم حذف المنتج من السلة',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const subtotal = getCartTotal();
  const shippingCost = subtotal > 500 ? 0 : 50;
  const total = subtotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="center">
          <Heading>سلة التسوق فارغة</Heading>
          <Text>لم تقم بإضافة أي منتجات إلى السلة بعد</Text>
          <Button
            as={RouterLink}
            to="/products"
            colorScheme="teal"
            leftIcon={<ArrowBackIcon />}
            _hover={{
              transform: 'translateY(-2px)',
              shadow: 'md',
            }}
            transition="all 0.3s"
          >
            تصفح المنتجات
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
        <GridItem>
          <Stack spacing={6}>
            <Heading mb={4}>سلة التسوق ({cartItems.length})</Heading>
            {cartItems.map((item) => (
              <Box
                key={`${item.id}-${item.size}-${item.color}`}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                bg={bgColor}
                borderColor={borderColor}
                _hover={{ shadow: 'sm' }}
                transition="box-shadow 0.2s"
              >
                <Grid templateColumns={{ base: '1fr', sm: '120px 1fr' }} gap={4}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    borderRadius="md"
                    objectFit="cover"
                    h="120px"
                    w="120px"
                  />
                  <Stack spacing={4}>
                    <Box>
                      <HStack justify="space-between">
                        <Heading size="md">{item.name}</Heading>
                        <IconButton
                          icon={<DeleteIcon />}
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => handleRemoveItem(item)}
                          aria-label="Remove item"
                          _hover={{ bg: 'red.50', transform: 'scale(1.1)' }}
                          transition="all 0.2s"
                        />
                      </HStack>
                      <Text color={textColor} fontSize="sm">
                        {item.brand} • المقاس: {item.size} • اللون: {item.color}
                      </Text>
                    </Box>
                    <Flex justify="space-between" align="center">
                      <HStack spacing={2}>
                        <IconButton
                          icon={<MinusIcon />}
                          size="sm"
                          onClick={() => handleQuantityChange(item, -1)}
                          isDisabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                          variant="outline"
                          colorScheme="teal"
                        />
                        <Text fontWeight="bold" minW="32px" textAlign="center" color={textColor}>
                          {item.quantity}
                        </Text>
                        <IconButton
                          icon={<AddIcon />}
                          size="sm"
                          onClick={() => handleQuantityChange(item, 1)}
                          aria-label="Increase quantity"
                          variant="outline"
                          colorScheme="teal"
                        />
                      </HStack>
                      <Text fontWeight="bold" fontSize="lg" color={primaryColor}>
                        {item.price * item.quantity} ريال
                      </Text>
                    </Flex>
                  </Stack>
                </Grid>
              </Box>
            ))}
          </Stack>
        </GridItem>

        <GridItem>
          <Box
            p={6}
            borderWidth="1px"
            borderRadius="lg"
            bg={bgColor}
            borderColor={borderColor}
            position="sticky"
            top="20px"
            shadow="sm"
          >
            <Stack spacing={6}>
              <Heading size="md" bgGradient="linear(to-r, teal.400, purple.500)" bgClip="text">
                ملخص الطلب
              </Heading>
              <Stack spacing={4}>
                <Flex justify="space-between">
                  <Text color={textColor}>المجموع الفرعي:</Text>
                  <Text fontWeight="medium" color={textColor}>{subtotal} ريال</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color={textColor}>الشحن:</Text>
                  <Text fontWeight="medium" color={shippingCost === 0 ? "teal.500" : textColor}>
                    {shippingCost === 0 ? 'مجاني' : `${shippingCost} ريال`}
                  </Text>
                </Flex>
                <Divider borderColor={borderColor} />
                <Flex justify="space-between" fontWeight="bold">
                  <Text color={textColor}>الإجمالي:</Text>
                  <Text color={primaryColor}>{total} ريال</Text>
                </Flex>
              </Stack>

              <Button
                colorScheme="teal"
                size="lg"
                onClick={() => setIsCheckoutModalOpen(true)}
                _hover={{ 
                  transform: 'translateY(-2px)',
                  shadow: 'lg',
                  bg: 'teal.600'
                }}
                transition="all 0.3s"
              >
                إتمام الطلب
              </Button>

              <HStack spacing={2} justify="center" color={primaryColor}>
                <FiTruck />
                <Text fontSize="sm" color={textColor}>الدفع عند الاستلام متاح</Text>
              </HStack>
            </Stack>
          </Box>
        </GridItem>
      </Grid>

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
    </Container>
  );
};

export default Cart;
