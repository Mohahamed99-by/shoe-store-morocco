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
  const borderColor = useColorModeValue('teal.100', 'teal.700');
  const hoverBg = useColorModeValue('teal.50', 'teal.700');
  const activeColor = useColorModeValue('teal.600', 'teal.200');
  const textColor = useColorModeValue('gray.600', 'gray.300');

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
      shadow="md"
      transition="all 0.3s"
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
            size={{ base: 'sm', sm: 'md' }}
            _hover={{ bg: hoverBg }}
            color={textColor}
          />

          {/* Logo */}
          <RouterLink to="/">
            <Box 
              display="flex" 
              alignItems="center"
              p={2}
            >
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
          <HStack spacing={{ md: 6, lg: 8 }} display={{ base: 'none', md: 'flex' }}>
            <Link 
              as={RouterLink} 
              to="/" 
              px={3} 
              py={2} 
              rounded="md" 
              fontWeight="medium"
              color={textColor}
              _hover={{ 
                bg: hoverBg,
                color: activeColor,
                transform: 'translateY(-1px)'
              }}
              transition="all 0.2s"
            >
              الرئيسية
            </Link>
            
            <Menu>
              <MenuButton 
                as={Button} 
                rightIcon={<ChevronDownIcon />} 
                variant="ghost"
                size={{ md: "sm", lg: "md" }}
                color={textColor}
                _hover={{ 
                  bg: hoverBg,
                  color: activeColor
                }}
                _active={{
                  bg: hoverBg,
                  color: activeColor
                }}
              >
                التصنيفات
              </MenuButton>
              <MenuList 
                borderColor={borderColor}
                shadow="lg"
              >
                {categories.map((category) => (
                  <MenuItem 
                    key={category.name} 
                    as={RouterLink} 
                    to={category.href}
                    _hover={{ 
                      bg: hoverBg,
                      color: activeColor
                    }}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            <Link 
              as={RouterLink} 
              to="/products" 
              px={3} 
              py={2} 
              rounded="md"
              fontWeight="medium"
              color={textColor}
              _hover={{ 
                bg: hoverBg,
                color: activeColor,
                transform: 'translateY(-1px)'
              }}
              transition="all 0.2s"
            >
              المنتجات
            </Link>
          </HStack>

          {/* Right Side Icons */}
          <HStack spacing={{ base: 2, sm: 3, md: 4 }}>
            <IconButton
              aria-label="Search"
              icon={<FiSearch />}
              variant="ghost"
              color={textColor}
              _hover={{ 
                bg: hoverBg,
                color: activeColor,
                transform: 'scale(1.05)'
              }}
              transition="all 0.2s"
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
                color={textColor}
                _hover={{ 
                  bg: hoverBg,
                  color: activeColor,
                  transform: 'scale(1.05)'
                }}
                transition="all 0.2s"
                size={{ base: "sm", sm: "md" }}
              />
              {cartCount > 0 && (
                <Badge
                  position="absolute"
                  top="-1"
                  right="-1"
                  colorScheme="teal"
                  borderRadius="full"
                  fontSize="xs"
                  px={2}
                  transform="scale(1.1)"
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
          <DrawerCloseButton 
            color={textColor}
            _hover={{ 
              bg: hoverBg,
              color: activeColor
            }}
          />
          <DrawerHeader 
            borderBottomWidth="1px" 
            borderColor={borderColor}
            bgGradient="linear(to-r, teal.400, purple.500)"
            color="white"
          >
            <Box display="flex" justifyContent="center">
              <Image
                src="/logo.svg"
                alt="Store Logo"
                h="40px"
                mx="auto"
              />
            </Box>
          </DrawerHeader>
          <DrawerBody bg={bgColor}>
            <VStack spacing={4} align="stretch">
              <Link 
                as={RouterLink} 
                to="/" 
                onClick={onClose}
                p={2}
                rounded="md"
                fontWeight="medium"
                color={textColor}
                _hover={{ 
                  bg: hoverBg,
                  color: activeColor
                }}
              >
                الرئيسية
              </Link>
              <Box>
                <Text 
                  fontWeight="bold" 
                  mb={2}
                  bgGradient="linear(to-r, teal.400, purple.500)"
                  bgClip="text"
                >
                  التصنيفات
                </Text>
                <VStack spacing={2} align="stretch" pl={4}>
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      as={RouterLink}
                      to={category.href}
                      onClick={onClose}
                      p={2}
                      rounded="md"
                      color={textColor}
                      _hover={{ 
                        bg: hoverBg,
                        color: activeColor
                      }}
                    >
                      {category.name}
                    </Link>
                  ))}
                </VStack>
              </Box>
              <Link 
                as={RouterLink} 
                to="/products" 
                onClick={onClose}
                p={2}
                rounded="md"
                fontWeight="medium"
                color={textColor}
                _hover={{ 
                  bg: hoverBg,
                  color: activeColor
                }}
              >
                المنتجات
              </Link>
              <Link 
                as={RouterLink} 
                to="/cart" 
                onClick={onClose}
                p={2}
                rounded="md"
                fontWeight="medium"
                color={textColor}
                _hover={{ 
                  bg: hoverBg,
                  color: activeColor
                }}
              >
                سلة التسوق ({cartCount})
              </Link>
              <Link 
                as={RouterLink} 
                to="/login" 
                onClick={onClose}
                p={2}
                rounded="md"
                fontWeight="medium"
                color={textColor}
                _hover={{ 
                  bg: hoverBg,
                  color: activeColor
                }}
              >
                تسجيل الدخول
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
