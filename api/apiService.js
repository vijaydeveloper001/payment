import axios from 'axios';

const BASE_URL = 'https://api.stripe.com/v1';

const secretKey = 'sk_test_51OFgXoSH0WsKss1ljHjnrQeEaFvw2P0IQMkMvWe65XIAYaZGP1Oi1elxx2B1nrpteYbYpSJtJaciYSk0213MIm7e00chSirC3V';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${secretKey}`,
    'Stripe-Version': '2023-10-16',
  },
});

export const getCustomer = async () => {
  return api.post('/customers');
};

export const getEphemeral = async (customer) => {
  return api.post('/ephemeral_keys', { customer });
};

export const getPaymentIntent = async (customer, amount = '10000', currency = 'inr', automatic = true) => {
  return api.post('/payment_intents', { customer, amount, currency, 'automatic_payment_methods[enabled]': automatic });
};



export const getRestHome = async (url) =>{
 return  axios({
    method: 'get',
    url: url,
    headers:{
      'Id-Token': 'smarte:c7f45bd3-a0d3-4910-9655-336e096b1c67',
	  	'Content-Type': 'application/json'
    },
    timeout:6000
    // responseType: 'stream'
  })
  // try{
  //   return api.get('https://api.mealme.ai/search/store/v3?latitude=41.889&longitude=-87.798',
  // {
  //   headers:{
  //     'Id-Token': 'smarte:c7f45bd3-a0d3-4910-9655-336e096b1c67',
	//   	'Content-Type': 'application/json'
  //   }
  // })
  // }
  // catch(e){
  //   console.log(e)
  // }
}