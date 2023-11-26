
//new code is 

// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import { PaymentSheet, StripeProvider, usePaymentSheet ,useStripe} from '@stripe/stripe-react-native';
import Home from './src/Home';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/Navigation/AppNavigation/AppNavigation';
import { StatusBar } from 'expo-status-bar';
//import { PaymentConfiguration } from '@stripe/stripe-react-native'; // Replace with the actual path to your payment library

// import { useStripe } from '@stripe/stripe-react-native';

export const PublishableKey = 'pk_test_51OFgXoSH0WsKss1lL1tvirPW1gRtZriFawfAA1Q7vQcNyEFERwKdwVycevW3FSTxgXiXqSKtN20aeyFviWQNsgxc00ykNPze6i';

// Define constants
const SecretKey = 'sk_test_51OFgXoSH0WsKss1ljHjnrQeEaFvw2P0IQMkMvWe65XIAYaZGP1Oi1elxx2B1nrpteYbYpSJtJaciYSk0213MIm7e00chSirC3V';





// React Native functional component
const App = () => {
  

  // Return JSX
  return (
    
      <StripeProvider
      publishableKey={PublishableKey}
      // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{com.anonymous.MealMe}}" // required for Apple Pay
    >
      
      <NavigationContainer>
        {/* <StatusBar backgroundColor='red' /> */}
        <AppNavigation/>
      {/* <Home/> */}
      </NavigationContainer>
     
    </StripeProvider>
   
  );
};

export default App;

