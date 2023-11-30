import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image,ToastAndroid ,Alert,useWindowDimensions, Dimensions, ScrollView} from 'react-native'
import React,{useEffect,useState} from 'react'
import { image } from '../../assets'
import { PaymentSheet, StripeProvider, usePaymentSheet ,useStripe} from '@stripe/stripe-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getRestHome } from '../../api/apiService';
import Loader from '../Loder/Loder';

const data = [
    {
        id:1,
        title:'Sandwiches',
        img:image.Bug,
        price:200
      },
      {
        id:1,
        title:'Italian',
        img:image.Con,
        price:250
      },
    
  ]


  export const PublishableKey = 'pk_test_51OFgXoSH0WsKss1lL1tvirPW1gRtZriFawfAA1Q7vQcNyEFERwKdwVycevW3FSTxgXiXqSKtN20aeyFviWQNsgxc00ykNPze6i';

// Define constants
const SecretKey = 'sk_test_51OFgXoSH0WsKss1ljHjnrQeEaFvw2P0IQMkMvWe65XIAYaZGP1Oi1elxx2B1nrpteYbYpSJtJaciYSk0213MIm7e00chSirC3V';

const { width } = Dimensions.get('window');
let pricce = null
export default function Restmenu({route}) {
  console.log(route?.params?.id)



    const [customerId, setCustomerId] = useState('');
    const [ephemeralKey, setEphemeralKey] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [apidata, setapidata] = useState('')
   
    const [Loading, setLoading] = useState(false);
    const [spiner, setspiner] = useState(false)
   
    console.log("Loading",Loading);
    
    console.log(ephemeralKey,'ephemeralKey',customerId,'clientSecret',clientSecret,'dfgdsgdsfdgfs',)
  

    
    
  
  
    // PaymentSheet setup
    const { presentPaymentSheet ,initPaymentSheet} = useStripe();
  
    // Function to handle successful payment
    const handlePaymentSuccess = () => {
      ToastAndroid.show('Payment Successful!', ToastAndroid.SHORT);
      // Additional logic after successful payment
    //   getCustomerId();
    };
  
    const handlePaymentFlow = async () => {
    //   console.log(clientSecret,customerId,ephemeralKey,'cvdsvvs')
      try {
        // setLoading(true);
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
            // setLoading(false)
            // openPaymentSheet()
            const {error,PaymentSheet}  =await presentPaymentSheet();
            console.log(error,PaymentSheet)
           
            
            if (!error) Alert.alert('','Payment successfully');
            // Handle success if needed
          }
        } else {
          // setLoading(false)
          console.error('One or more required variables are not initialized');
          console.log('clientSecret:', clientSecret);
          console.log('customerId:', customerId);
          console.log('ephemeralKey:', ephemeralKey);
        }
      } catch (error) {
        // setLoading(false)
        console.error('Error in handlePaymentFlow:', error);
      }
    };
    // useEffect(()=>{
    //   handlePaymentFlow()
    // },[])
  
    //   const openPaymentSheet = async () => {
    //     const {error,PaymentSheet}  =await presentPaymentSheet();
    //     console.log(error,PaymentSheet)
        
    //     if (!error) Alert.alert('','Payment successfully');
    //   };
  
    // Function to get customer ID
    const getCustomerId = async () => {

      try {
        // setLoading(true)
        const response = await fetch('https://api.stripe.com/v1/customers', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${SecretKey}`,
          },
        });
        const data = await response.json();
        // setLoading(true)
        setCustomerId(data.id);
        getEphemeralKey(data.id);
        console.warn('customer id',data.id)
      } catch (error) {
        // setLoading(false)
        console.error('Error getting customer ID', error);
      }
    };
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
        // setLoading(false)
      }
    };
  
    // Function to get payment intent

    const getPaymentIntent = async (customerId, ephemeralKey) => {
      try {
        // setLoading(true)
        const response = await fetch(`https://api.stripe.com/v1/payment_intents?customer=${customerId}&amount=${pricce*100}&currency=inr&automatic_payment_methods[enabled]=true`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${SecretKey}`,
            
          },
        });

        
        const data = await response.json();
        
        console.log(data.client_secret,'sdghndbsd')
        
        // setLoading(false)
        setClientSecret(data.client_secret);
       
        console.warn('client_secret id',data.client_secret)
       
        pricce = null
        
       
  
        // ToastAndroid.show('Proceed for payment', ToastAndroid.SHORT);
      } catch (error) {
        // setLoading(false)
        
        console.error('Error getting payment intent', error);
      
      }
    };

    // working
    //  const fetchData=async()=>{
    //  Alert.alert(1)
    //   setLoading(true);
    //   const reqyestKey={
    //     method:"GET",
    //     headers:{
    //       "Content-type":"application/json",
    //       'Id-Token': 'smarte:c7f45bd3-a0d3-4910-9655-336e096b1c67'
    //     }
    //   };
    //   const res =await fetch(`https://api.mealme.ai/details/inventory?store_id=${route?.params?.id}`,reqyestKey);
    //   if(res.status>=200 && res.status<400){
    //     const data = await res.json();
    //     console.log("data",data);
    //     setLoading(false)
    //    Alert.alert(2)
    //   };
    //   if(res.status>=400 && res.status<500){
    //     const error = await res.json();
    //     console.log("error",error);
    //     setLoading(false);
    //   }
    //  }
  
    // Initial setup
    const fetchData = async () => {
      try {
        setspiner(true)
        const response = await fetch(`https://api.mealme.ai/details/inventory?store_id=${route?.params?.id}`, {
          method: 'GET',
          headers: {
            'Id-Token': 'smarte:c7f45bd3-a0d3-4910-9655-336e096b1c67',
            'Content-Type': 'application/json'
          }
        });
        console.log('API Response:', response);
        if (response.ok) {
          const data = await response.json();
          // console.log('API Response:', data?.categories[0]
          // setapidata(data?.categories)
          let dt =  data?.categories.filter((item,index)=>{
            if (item?.menu_item_list[0]?.price!==0){
               return item
            }
          })
          setapidata(dt)
          setspiner(false)

        } else {
          console.error('API Error:', response.status, response.statusText);
          // setLoading(false)
        }
      } catch (error) {
        // setLoading(false)
  
        console.error('API Request Error:', error);
      }
    };

    
    
  
  

    useFocusEffect(
        React.useCallback(()=>{
            handlePaymentFlow()
        },[clientSecret])
    )

    useEffect(()=>{
     fetchData()
    },[])


    const renderItem = ({item,index}) =>{
      const lastItem = index === apidata.length - 1;
        return (
         
          <TouchableOpacity key={index} style = {{...styles.FlatCon,width:apidata.length%2==0?'47%':lastItem?'67%':'47%'}}  >
            <Image source={{uri:item?.menu_item_list[0]?.image}} style = {styles.ImageStyle} resizeMode='cover'/>
            <Text style = {styles.TextData} numberOfLines={1}>{item?.name}</Text>
            <Text style = {styles.TextData}>Rs {item?.menu_item_list[0]?.price}</Text>
            <TouchableOpacity style = {styles.OrderCon} onPress={()=>{
                // setprice(item?.price);
                pricce = item?.menu_item_list[0]?.price
                getCustomerId()
              
              
            


            }}>
                <Text style = {styles.orderText}>Place Order</Text>
            </TouchableOpacity>
          </TouchableOpacity>
      
        )
      }

      // const fil = () =>{
     
      //   if(apidata){
      //   setLoading(true)
      //     let data =  apidata.filter((item,index)=>{
      //        if (item?.menu_item_list[0]?.price!==0){
      //           return item
      //        }
      //      })
      //      setLoading(false)
      //      setfiler(data)
      //    }
      // }

    // useEffect(()=>{
    //   fil()
    // },[apidata])
   
  return (
    <View style = {styles.MainCon}>
      <ScrollView style = {{flex:1}}>
      {spiner  &&  <Loader loading = {spiner}/>}
      <FlatList data={apidata} renderItem={renderItem} contentContainerStyle = {{flex:1,justifyContent:'space-between',marginHorizontal:20,flexWrap:'wrap',flexDirection:'row',paddingBottom:10}} numColumns={2} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    ImageStyle:{
     width:"100%",
     height:'60%',
     borderRadius:5,
    
     alignSelf:'center'
    
    },
    FlatCon:{
      width:'47%',
  
      height:220,
      marginTop:30,
      justifyContent:'center',
    //   alignItems:'center',
      backgroundColor:'white',
    //   marginHorizontal:30,
      borderRadius:10,
      paddingHorizontal:10,
      paddingVertical:10,
      elevation:5,
      marginRight:15
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
        justifyContent:'space-between',
        
    },
    OrderCon:{
        backgroundColor:'blue',
        // flex:1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        height:30,marginTop:5
    },
    orderText:{
        color:'white',
        fontWeight:'600'
    }
  })