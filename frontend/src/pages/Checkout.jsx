import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Stack,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  useSteps,
  useToast,
} from '@chakra-ui/react';
import ShippingForm from '../components/checkout/ShippingForm';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderSummary from '../components/checkout/OrderSummary';
import { useCart } from '../context/CartContext';

const steps = [
  { title: 'الشحن', description: 'عنوان التوصيل' },
  { title: 'الدفع', description: 'طريقة الدفع' },
  { title: 'المراجعة', description: 'تأكيد الطلب' },
];

const Checkout = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const [shippingData, setShippingData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const { cart, clearCart } = useCart();

  const handleShippingSubmit = (data) => {
    setShippingData(data);
    setActiveStep(1);
  };

  const handlePaymentSubmit = (data) => {
    setPaymentData(data);
    setActiveStep(2);
  };

  const handleOrderSubmit = async () => {
    try {
      // Here you would typically make an API call to process the order
      // For now, we'll just simulate a successful order
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: 'تم تأكيد الطلب',
        description: 'سيتم إرسال تفاصيل الطلب إلى بريدك الإلكتروني',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      clearCart();
      navigate('/order-success');
    } catch (error) {
      toast({
        title: 'حدث خطأ',
        description: 'يرجى المحاولة مرة أخرى',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <ShippingForm onSubmit={handleShippingSubmit} />;
      case 1:
        return <PaymentForm onSubmit={handlePaymentSubmit} />;
      case 2:
        return (
          <OrderSummary
            shippingData={shippingData}
            paymentData={paymentData}
            onSubmit={handleOrderSubmit}
          />
        );
      default:
        return null;
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <Container maxW="container.xl" py={10}>
        <Stack spacing={4} align="center">
          <Heading>السلة فارغة</Heading>
          <Text>يرجى إضافة منتجات إلى السلة للمتابعة</Text>
          <Button
            colorScheme="blue"
            onClick={() => navigate('/products')}
          >
            تصفح المنتجات
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue('gray.50', 'gray.900')}
      pt={{ base: 4, md: 8 }}
      pb={10}
    >
      <Container maxW="container.xl">
        <Stack spacing={8}>
          <Heading textAlign="center" size="xl" mb={8}>
            إتمام الطلب
          </Heading>

          <Stepper index={activeStep} colorScheme="blue" size="lg">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <Box flexShrink="0">
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>

          <Box
            bg={useColorModeValue('white', 'gray.800')}
            p={{ base: 4, md: 8 }}
            borderRadius="lg"
            shadow="base"
          >
            {renderStepContent(activeStep)}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Checkout;
