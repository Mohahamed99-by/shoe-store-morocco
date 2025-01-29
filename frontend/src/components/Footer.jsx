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
      bg={useColorModeValue('gray.900', 'gray.800')}
      color={useColorModeValue('gray.200', 'gray.200')}
      position="relative"
      overflow="hidden"
    >
      {/* Background Pattern */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="radial(circle at top right, blue.500 0%, transparent 60%)"
        opacity={0.1}
      />

      <Container maxW="container.xl" py={{ base: 12, md: 16 }} position="relative">
        <Stack spacing={12}>
          {/* Top Section */}
          <SimpleGrid
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: '2fr 1fr 1fr 1.2fr',
            }}
            spacing={{ base: 10, md: 16 }}
          >
            {/* About Section */}
            <Stack spacing={6}>
              <Box>
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  h={{ base: "40px", md: "45px" }}
                  filter="brightness(0) invert(1)"
                />
              </Box>
              <Text fontSize="sm" maxW="400px" lineHeight="tall" color="gray.400">
                نحن نقدم أفضل الأحذية العالمية بأسعار تنافسية. جودة عالية وخدمة ممتازة هي أولويتنا.
              </Text>
              <VStack spacing={4} align="flex-start">
                <HStack spacing={4} color="gray.400">
                  <Icon as={FiMapPin} color="teal.400" boxSize={5} />
                  <Text fontSize="sm">الرياض، المملكة العربية السعودية</Text>
                </HStack>
                <HStack spacing={4} color="gray.400">
                  <Icon as={FiPhone} color="teal.400" boxSize={5} />
                  <Text fontSize="sm" dir="ltr">+966 50 123 4567</Text>
                </HStack>
                <HStack spacing={4} color="gray.400">
                  <Icon as={FiMail} color="teal.400" boxSize={5} />
                  <Text fontSize="sm">info@shoesstore.com</Text>
                </HStack>
              </VStack>
            </Stack>

            {/* Quick Links */}
            <Stack align="flex-start" spacing={6}>
              <Text fontSize="lg" fontWeight="600" color="white">
                روابط سريعة
              </Text>
              <Stack spacing={3} align="flex-start">
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
                    color="gray.400"
                    _hover={{
                      color: 'teal.300',
                      transform: 'translateX(-4px)'
                    }}
                    transition="all 0.2s"
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Stack>

            {/* Customer Service */}
            <Stack align="flex-start" spacing={6}>
              <Text fontSize="lg" fontWeight="600" color="white">
                خدمة العملاء
              </Text>
              <Stack spacing={3} align="flex-start">
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
                    color="gray.400"
                    _hover={{
                      color: 'teal.300',
                      transform: 'translateX(-4px)'
                    }}
                    transition="all 0.2s"
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Stack>

            {/* Newsletter */}
            <Stack spacing={6}>
              <Text fontSize="lg" fontWeight="600" color="white">
                النشرة البريدية
              </Text>
              <Text fontSize="sm" color="gray.400" lineHeight="tall">
                اشترك في نشرتنا البريدية للحصول على آخر العروض والتخفيضات
              </Text>
              <Box>
                <InputGroup size="lg">
                  <Input
                    placeholder="البريد الإلكتروني"
                    bg="gray.800"
                    border="1px"
                    borderColor="gray.600"
                    color="white"
                    _hover={{
                      borderColor: 'teal.300',
                    }}
                    _focus={{
                      borderColor: 'teal.300',
                      boxShadow: '0 0 0 1px teal.300',
                    }}
                    fontSize="md"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      size="sm"
                      colorScheme="teal"
                      h="1.75rem"
                      leftIcon={<FiArrowLeft />}
                      _hover={{
                        transform: 'translateX(-4px)',
                      }}
                      transition="all 0.2s"
                    >
                      اشتراك
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Stack>
          </SimpleGrid>

          <Divider borderColor="gray.700" />

          {/* Bottom Section */}
          <Stack
            direction={{ base: 'column-reverse', md: 'row' }}
            justify="space-between"
            align="center"
            spacing={{ base: 6, md: 0 }}
          >
            <Text fontSize="sm" color="gray.400" textAlign={{ base: "center", md: "start" }}>
              © {new Date().getFullYear()} متجر الأحذية. جميع الحقوق محفوظة
            </Text>
            <HStack spacing={4}>
              {[
                { icon: FiFacebook, href: 'https://facebook.com' },
                { icon: FiTwitter, href: 'https://twitter.com' },
                { icon: FiInstagram, href: 'https://instagram.com' },
                { icon: FiYoutube, href: 'https://youtube.com' },
              ].map((social, index) => (
                <IconButton
                  key={index}
                  as="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.icon.name}`}
                  icon={<Icon as={social.icon} />}
                  size="md"
                  color="gray.400"
                  variant="ghost"
                  rounded="full"
                  _hover={{
                    color: 'teal.300',
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.3s"
                />
              ))}
            </HStack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
