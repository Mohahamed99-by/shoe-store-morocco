import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  HStack,
  Icon,
  Divider,
  useColorModeValue,
  Image,
  Flex,
  IconButton,
} from '@chakra-ui/react';
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

const SocialButton = ({ icon, href }) => {
  const iconColor = useColorModeValue('gray.600', 'gray.300');
  const hoverBg = useColorModeValue('blue.50', 'blue.800');
  const hoverColor = useColorModeValue('blue.500', 'blue.300');

  return (
    <IconButton
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit our ${icon.name}`}
      icon={<Icon as={icon} />}
      size={{ base: 'sm', md: 'md' }}
      variant="ghost"
      color={iconColor}
      rounded="full"
      _hover={{
        bg: hoverBg,
        color: hoverColor,
        transform: 'translateY(-2px)',
      }}
      transition="all 0.3s"
    />
  );
};

const Footer = () => {
  const footerBg = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const headingColor = useColorModeValue('gray.800', 'white');
  const inputBg = useColorModeValue('white', 'gray.800');
  const iconBg = useColorModeValue('blue.50', 'blue.900');
  const iconColor = useColorModeValue('blue.500', 'blue.200');

  return (
    <Box
      bg={footerBg}
      color={textColor}
      borderTopWidth={1}
      borderColor={borderColor}
    >
      <Container maxW="container.xl" py={{ base: 10, md: 16 }}>
        <SimpleGrid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: '2fr 1fr 1fr 1.2fr',
          }}
          spacing={{ base: 8, md: 12 }}
        >
          {/* About Section */}
          <Stack spacing={6}>
            <Box>
              <Image
                src="/logo.svg"
                alt="Logo"
                h={{ base: "35px", md: "40px" }}
              />
            </Box>
            <Text fontSize="sm" maxW="400px" lineHeight="tall">
              نحن نقدم أفضل الأحذية العالمية بأسعار تنافسية. جودة عالية وخدمة ممتازة هي أولويتنا.
            </Text>
            <VStack spacing={4} align="flex-start">
              <HStack spacing={3}>
                <Flex
                  align="center"
                  justify="center"
                  w={8}
                  h={8}
                  rounded="full"
                  bg={iconBg}
                >
                  <Icon as={FiMapPin} color={iconColor} />
                </Flex>
                <Text fontSize="sm">الرياض، المملكة العربية السعودية</Text>
              </HStack>
              <HStack spacing={3}>
                <Flex
                  align="center"
                  justify="center"
                  w={8}
                  h={8}
                  rounded="full"
                  bg={iconBg}
                >
                  <Icon as={FiPhone} color={iconColor} />
                </Flex>
                <Text fontSize="sm" dir="ltr">+966 50 123 4567</Text>
              </HStack>
              <HStack spacing={3}>
                <Flex
                  align="center"
                  justify="center"
                  w={8}
                  h={8}
                  rounded="full"
                  bg={iconBg}
                >
                  <Icon as={FiMail} color={iconColor} />
                </Flex>
                <Text fontSize="sm">info@shoesstore.com</Text>
              </HStack>
            </VStack>
          </Stack>

          {/* Quick Links */}
          <Stack align="flex-start" spacing={4}>
            <Text fontSize="lg" fontWeight="600" color={headingColor} mb={1}>
              روابط سريعة
            </Text>
            <Stack spacing={2} align="flex-start">
              {[
                { label: 'من نحن', path: '/about' },
                { label: 'تواصل معنا', path: '/contact' },
                { label: 'الوظائف', path: '/careers' },
                { label: 'سياسة الخصوصية', path: '/privacy' },
                { label: 'الشروط والأحكام', path: '/terms' },
              ].map((link) => (
                <Link
                  key={link.path}
                  as={RouterLink}
                  to={link.path}
                  fontSize="sm"
                  _hover={{ color: 'blue.500', transform: 'translateX(-4px)' }}
                  transition="all 0.2s"
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Stack>

          {/* Customer Service */}
          <Stack align="flex-start" spacing={4}>
            <Text fontSize="lg" fontWeight="600" color={headingColor} mb={1}>
              خدمة العملاء
            </Text>
            <Stack spacing={2} align="flex-start">
              {[
                { label: 'مركز المساعدة', path: '/help' },
                { label: 'سياسة الإرجاع', path: '/returns' },
                { label: 'الشحن والتوصيل', path: '/shipping' },
                { label: 'دليل المقاسات', path: '/size-guide' },
                { label: 'الأسئلة الشائعة', path: '/faq' },
              ].map((link) => (
                <Link
                  key={link.path}
                  as={RouterLink}
                  to={link.path}
                  fontSize="sm"
                  _hover={{ color: 'blue.500', transform: 'translateX(-4px)' }}
                  transition="all 0.2s"
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Stack>

          {/* Newsletter */}
          <Stack spacing={6}>
            <Text fontSize="lg" fontWeight="600" color={headingColor}>
              النشرة البريدية
            </Text>
            <Text fontSize="sm" lineHeight="tall">
              اشترك في نشرتنا البريدية للحصول على آخر العروض والتخفيضات
            </Text>
            <InputGroup size="md">
              <Input
                placeholder="البريد الإلكتروني"
                bg={inputBg}
                border="1px"
                borderColor={borderColor}
                _hover={{
                  borderColor: 'blue.500',
                }}
                _focus={{
                  borderColor: 'blue.500',
                  boxShadow: 'outline',
                }}
                fontSize="sm"
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  colorScheme="blue"
                  leftIcon={<FiArrowLeft />}
                  _hover={{
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.2s"
                >
                  اشتراك
                </Button>
              </InputRightElement>
            </InputGroup>
          </Stack>
        </SimpleGrid>

        <Divider my={8} borderColor={borderColor} />

        {/* Bottom Section */}
        <Stack
          direction={{ base: 'column-reverse', md: 'row' }}
          justify="space-between"
          align="center"
          spacing={{ base: 6, md: 0 }}
        >
          <Text fontSize="sm" textAlign={{ base: "center", md: "start" }}>
            © {new Date().getFullYear()} متجر الأحذية. جميع الحقوق محفوظة
          </Text>
          <HStack spacing={4}>
            <SocialButton icon={FiFacebook} href="https://facebook.com" />
            <SocialButton icon={FiTwitter} href="https://twitter.com" />
            <SocialButton icon={FiInstagram} href="https://instagram.com" />
            <SocialButton icon={FiYoutube} href="https://youtube.com" />
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
