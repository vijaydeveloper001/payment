import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import { Screens } from '../Navigation/AppNavigation/AppNavigation'

export default function Splash({navigation}) {
    
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate(Screens.Home)
        },3000)
    },[])
  return (
    <View style = {styles.Main}>
      <Text style = {styles.Text}>MealMe</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    Main:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    Text:{
        fontSize:30,
        fontWeight:'700',
        color:'black'
    }
})