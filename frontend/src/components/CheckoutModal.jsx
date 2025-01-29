import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Alert,
  AlertIcon,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useCart } from '../context/CartContext';
import emailjs from '@emailjs/browser';

const CheckoutModal = ({ isOpen, onClose }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const { cartItems, clearCart, getCartTotal } = useCart();
  const toast = useToast();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const formatOrderDetails = (formData) => {
    const total = getCartTotal();
    const shippingCost = total > 500 ? 0 : 50;
    const finalTotal = total + shippingCost;

    // Format order items
    let orderDetails = cartItems.map(item => 
      `${item.name}\nالمقاس: ${item.size} | اللون: ${item.color}\nالكمية: ${item.quantity} | السعر: ${item.price * item.quantity} ريال\n`
    ).join('\n');

    // Create the complete message
    const message = `
طلب جديد:

معلومات العميل:
الاسم: ${formData.name}
رقم الجوال: ${formData.phone}
العنوان: ${formData.address}
المدينة: ${formData.city}

المنتجات:
${orderDetails}

ملخص الطلب:
المجموع الفرعي: ${total} ريال
الشحن: ${shippingCost === 0 ? 'مجاني' : `${shippingCost} ريال`}
الإجمالي النهائي: ${finalTotal} ريال

طريقة الدفع: الدفع عند الاستلام`;

    return {
      name: formData.name,
      email: formData.phone, // Using phone number in email field since we don't collect email
      message: message
    };
  };

  const sendEmail = async (formData) => {
    const SERVICE_ID = 'service_pt8ugbq';
    const TEMPLATE_ID = 'template_t4q59s4';
    const USER_ID = 'B-qBSDLg9GU-JVgmN';

    try {
      const templateParams = formatOrderDetails(formData);
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  };

  const onSubmit = async (data) => {
    setIsProcessing(true);
    
    const emailSent = await sendEmail(data);
    
    if (emailSent) {
      clearCart();
      reset();
      onClose();
      toast({
        title: 'تم الطلب بنجاح',
        description: 'تم استلام طلبك وسيتم التواصل معك قريباً',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'حدث خطأ',
        description: 'لم نتمكن من إرسال طلبك، يرجى المحاولة مرة أخرى',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    
    setIsProcessing(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>معلومات التوصيل</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.name}>
                <FormLabel>الاسم الكامل</FormLabel>
                <Input
                  {...register('name', {
                    required: 'هذا الحقل مطلوب',
                    minLength: { value: 3, message: 'الاسم قصير جداً' }
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.phone}>
                <FormLabel>رقم الجوال</FormLabel>
                <Input
                  type="tel"
                  {...register('phone', {
                    required: 'هذا الحقل مطلوب',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'رقم جوال غير صالح'
                    }
                  })}
                />
                <FormErrorMessage>
                  {errors.phone && errors.phone.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.address}>
                <FormLabel>العنوان التفصيلي</FormLabel>
                <Input
                  {...register('address', {
                    required: 'هذا الحقل مطلوب',
                    minLength: { value: 10, message: 'يرجى كتابة عنوان تفصيلي' }
                  })}
                />
                <FormErrorMessage>
                  {errors.address && errors.address.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.city}>
                <FormLabel>المدينة</FormLabel>
                <Input
                  {...register('city', {
                    required: 'هذا الحقل مطلوب'
                  })}
                />
                <FormErrorMessage>
                  {errors.city && errors.city.message}
                </FormErrorMessage>
              </FormControl>

              <Alert status="warning">
                <AlertIcon />
                سيتم الدفع عند الاستلام
              </Alert>

              <Button
                colorScheme="teal"
                size="lg"
                width="100%"
                type="submit"
                isLoading={isProcessing}
                loadingText="جاري إرسال الطلب..."
              >
                تأكيد الطلب
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CheckoutModal;
