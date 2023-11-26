import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import { PaymentSheet, StripeProvider, usePaymentSheet ,useStripe} from '@stripe/stripe-react-native';
//import { PaymentConfiguration } from '@stripe/stripe-react-native'; // Replace with the actual path to your payment library

// import { useStripe } from '@stripe/stripe-react-native';

export const PublishableKey = 'pk_test_51OFgXoSH0WsKss1lL1tvirPW1gRtZriFawfAA1Q7vQcNyEFERwKdwVycevW3FSTxgXiXqSKtN20aeyFviWQNsgxc00ykNPze6i';

// Define constants
const SecretKey = 'sk_test_51OFgXoSH0WsKss1ljHjnrQeEaFvw2P0IQMkMvWe65XIAYaZGP1Oi1elxx2B1nrpteYbYpSJtJaciYSk0213MIm7e00chSirC3V';


export default function Home() {
    const [customerId, setCustomerId] = useState('');
  const [ephemeralKey, setEphemeralKey] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  console.log(ephemeralKey,'ephemeralKey',customerId,'clientSecret',clientSecret,'dfgdsgdsfdgfs',)

  // PaymentSheet setup
  const { presentPaymentSheet ,initPaymentSheet} = useStripe();

  // Function to handle successful payment
  const handlePaymentSuccess = () => {
    ToastAndroid.show('Payment Successful!', ToastAndroid.SHORT);
    // Additional logic after successful payment
    getCustomerId();
  };

  const handlePaymentFlow = async () => {
    console.log(clientSecret,customerId,ephemeralKey,'cvdsvvs')
    try {
      if (clientSecret && customerId && ephemeralKey) {
        // Call the presentPaymentSheet function with the necessary parameters
       
        const { error ,PaymentSheet} = await initPaymentSheet({
          // clientSecret,
          customer: customerId,
          // ephemeralKey,
          merchantDisplayName:'Vijay',
          paymentIntentClientSecret: clientSecret,
          customerEphemeralKeySecret: clientSecret,
          allowsDelayedPaymentMethods: true,
          defaultBillingDetails: {
            name: 'Jane Doe',
          },
          merchantCountryCode: 'FR',
  // google pay conf
          googlePay: true,
        });

        console.log(PaymentSheet)
        
      

        
  
        if (error) {
          console.error('Error presenting Payment Sheet:', error);
        } else {
          // openPaymentSheet()
          const {error,PaymentSheet}  =await presentPaymentSheet();
          console.log(error,PaymentSheet)
          
          
          console.log('Payment Sheet presented successfully');
          // Handle success if needed
        }
      } else {
        console.error('One or more required variables are not initialized');
        console.log('clientSecret:', clientSecret);
        console.log('customerId:', customerId);
        console.log('ephemeralKey:', ephemeralKey);
      }
    } catch (error) {
      console.error('Error in handlePaymentFlow:', error);
    }
  };
  // useEffect(()=>{
  //   handlePaymentFlow()
  // },[])

    const openPaymentSheet = async () => {
      // const { error } = await presentPaymentSheet();
      
      

     try{
      // if (error) {
      //   Alert.alert(`Error code: ${error.code}`, error.message);
      // } else {
        const {er,PaymentSheet} = presentPaymentSheet()
        console.log(er,PaymentSheet)
        
        Alert.alert('Success', 'Your order is confirmed!');
      // }
     }
     catch(e){
      console.log(e)
     }
    };

  // Function to get customer ID
  const getCustomerId = async () => {
    try {
      const response = await fetch('https://api.stripe.com/v1/customers', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SecretKey}`,
        },
      });
      const data = await response.json();
      setCustomerId(data.id);
      getEphemeralKey(data.id);
      console.warn('customer id',data.id)
    } catch (error) {
      console.error('Error getting customer ID', error);
    }
  };

  // Function to get ephemeral key
  const getEphemeralKey = async (customerId) => {
    try {
      const response = await fetch(`https://api.stripe.com/v1/ephemeral_keys?customer=${customerId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SecretKey}`,
          'Stripe-Version': '2023-10-16',
        },
      });
      const data = await response.json();
      setEphemeralKey(data.id);
      console.log(data)
      getPaymentIntent(customerId, data.id);
      console.warn('customer id',customerId)
      console.warn('setEphemeralKey id',data.id)

    } catch (error) {
      console.error('Error getting ephemeral key', error);
    }
  };

  // Function to get payment intent
  const getPaymentIntent = async (customerId, ephemeralKey) => {
    try {
      const response = await fetch(`https://api.stripe.com/v1/payment_intents?customer=${customerId}&amount=10000&currency=inr&automatic_payment_methods[enabled]=true`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SecretKey}`,
        },
      });
      const data = await response.json();
      console.log(data.client_secret,'sdghndbsd')
      setClientSecret(data.client_secret);
      console.warn('client_secret id',data.client_secret)

      ToastAndroid.show('Proceed for payment', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error getting payment intent', error);
    }
  };

  // Initial setup
  useEffect(() => {
    // Initialize any setup here
    getCustomerId();

  }, []);


  return (
    <View style={{justifyContent:"center",flex:1,alignItems:"center"}}>
    <TouchableOpacity onPress={handlePaymentFlow} >
      <Text>Send 100 Rupees</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handlePaymentSuccess} >
      <Text>Send 100 Rupees</Text>
    </TouchableOpacity>
    </View>
  )
}

