import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useColorModeValue,
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  useDisclosure,
  Container,
  Text,
  Image,
} from '@chakra-ui/react';
import { FiShoppingCart, FiMenu, FiUser, FiSearch } from 'react-icons/fi';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const categories = [
    { name: 'رجال', href: '/products?category=men' },
    { name: 'نساء', href: '/products?category=women' },
    { name: 'أطفال', href: '/products?category=kids' },
  ];

  return (
    <Box 
      bg={bgColor} 
      borderBottom="1px" 
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={1000}
      shadow="sm"
    >
      <Container maxW="container.xl" px={{ base: 2, sm: 4, md: 6 }}>
        <Flex h={{ base: 14, md: 16 }} alignItems="center" justifyContent="space-between">
          {/* Mobile Menu Button */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            variant="ghost"
            aria-label="Open Menu"
            icon={<FiMenu />}
            size={{ base: "sm", sm: "md" }}
          />

          {/* Logo */}
          <RouterLink to="/">
            <Box display="flex" alignItems="center">
              <Image
                src="/logo.svg"
                alt="Store Logo"
                h={{ base: "30px", sm: "35px", md: "40px" }}
                transition="transform 0.3s"
                _hover={{
                  transform: 'scale(1.05)'
                }}
              />
            </Box>
          </RouterLink>

          {/* Desktop Navigation */}
          <HStack spacing={{ md: 4, lg: 8 }} display={{ base: 'none', md: 'flex' }}>
            <Link as={RouterLink} to="/" px={2} py={1} rounded="md" _hover={{ color: 'blue.500' }}>
              الرئيسية
            </Link>
            
            <Menu>
              <MenuButton 
                as={Button} 
                rightIcon={<ChevronDownIcon />} 
                variant="ghost"
                size={{ md: "sm", lg: "md" }}
              >
                التصنيفات
              </MenuButton>
              <MenuList>
                {categories.map((category) => (
                  <MenuItem key={category.name} as={RouterLink} to={category.href}>
                    {category.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            <Link as={RouterLink} to="/products" px={2} py={1} rounded="md" _hover={{ color: 'blue.500' }}>
              المنتجات
            </Link>
          </HStack>

          {/* Right Side Icons */}
          <HStack spacing={{ base: 1, sm: 2, md: 4 }}>
            <IconButton
              aria-label="Search"
              icon={<FiSearch />}
              variant="ghost"
              _hover={{ color: 'blue.500' }}
              display={{ base: 'none', md: 'flex' }}
              size={{ md: "sm", lg: "md" }}
            />

            <Box position="relative">
              <IconButton
                as={RouterLink}
                to="/cart"
                aria-label="Shopping Cart"
                icon={<FiShoppingCart />}
                variant="ghost"
                _hover={{ color: 'blue.500' }}
                size={{ base: "sm", sm: "md" }}
              />
              {cartCount > 0 && (
                <Badge
                  position="absolute"
                  top="-1"
                  right="-1"
                  colorScheme="blue"
                  borderRadius="full"
                  fontSize="xs"
                  px={2}
                >
                  {cartCount}
                </Badge>
              )}
            </Box>
          </HStack>
        </Flex>
      </Container>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Box display="flex" justifyContent="center">
              <Image
                src="/logo.svg"
                alt="Store Logo"
                h="35px"
                mx="auto"
              />
            </Box>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Link as={RouterLink} to="/" onClick={onClose}>الرئيسية</Link>
              <Box>
                <Text fontWeight="bold" mb={2}>التصنيفات</Text>
                <VStack spacing={2} align="stretch" pl={4}>
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      as={RouterLink}
                      to={category.href}
                      onClick={onClose}
                    >
                      {category.name}
                    </Link>
                  ))}
                </VStack>
              </Box>
              <Link as={RouterLink} to="/products" onClick={onClose}>المنتجات</Link>
              <Link as={RouterLink} to="/cart" onClick={onClose}>سلة التسوق ({cartCount})</Link>
              <Link as={RouterLink} to="/login" onClick={onClose}>تسجيل الدخول</Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
