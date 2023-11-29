import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image,ToastAndroid ,Alert} from 'react-native'
import React,{useEffect,useState} from 'react'
import { image } from '../../assets'
import { PaymentSheet, StripeProvider, usePaymentSheet ,useStripe} from '@stripe/stripe-react-native';


const data = [
    {
        id:1,
        title:'Burger',
        img:image.Bug,
        price:150
      },
      {
        id:1,
        title:'Dosa',
        img:image.Con,
        price:250
      },
      {
        id:1,
        title:'Patbelly',
        img:image.Pot,
        price:350
      },
      {
        id:1,
        title:'Patbelly',
        img:image.Pot,
        price:350
      }
    
  ]


  export const PublishableKey = 'pk_test_51OFgXoSH0WsKss1lL1tvirPW1gRtZriFawfAA1Q7vQcNyEFERwKdwVycevW3FSTxgXiXqSKtN20aeyFviWQNsgxc00ykNPze6i';

// Define constants
const SecretKey = 'sk_test_51OFgXoSH0WsKss1ljHjnrQeEaFvw2P0IQMkMvWe65XIAYaZGP1Oi1elxx2B1nrpteYbYpSJtJaciYSk0213MIm7e00chSirC3V';



export default function Restmenu() {



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
            
            
            Alert.alert('','Payment successfully');
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
  


    const renderItem = ({item,index}) =>{
        return (
          <TouchableOpacity key={index} style = {styles.FlatCon}>
            <Image source={item?.img} style = {styles.ImageStyle}/>
            <Text style = {styles.TextData} numberOfLines={1}>{item?.title}</Text>
            <Text style = {styles.TextData}>Rs {item.price}</Text>
            <TouchableOpacity style = {styles.OrderCon} onPress={handlePaymentFlow}>
                <Text style = {styles.orderText}>Place Order</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )
      }
  return (
    <View style = {styles.MainCon}>
        
      <FlatList data={data} renderItem={renderItem} contentContainerStyle = {{flex:1,flexWrap:'wrap',flexDirection:'row',justifyContent:'space-between',marginHorizontal:20}} />
    </View>
  )
}

const styles = StyleSheet.create({
    ImageStyle:{
     width:"80%",
     height:'60%',
     borderRadius:5,
     elevation:1,
     alignSelf:'center'
    
    },
    FlatCon:{
      width:190,
      height:220,
      marginTop:30,
      justifyContent:'center',
    //   alignItems:'center',
      backgroundColor:'white',
    //   marginHorizontal:30,
      borderRadius:10,
      paddingHorizontal:10,
      paddingVertical:10,
      elevation:18,
    // shadowColor:'white',
    
    },
    TextData:{
      fontSize:15,
      flex:1,
      alignSelf:'flex-start',
      // paddingHorizontal:2,
      fontWeight:'600',
      marginTop:5
    },
    MainCon:{
        flex:1,
        // justifyContent:'space-between',
        
    },
    OrderCon:{
        backgroundColor:'blue',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5
    },
    orderText:{
        color:'white',
        fontWeight:'600'
    }
  })