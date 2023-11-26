import { StyleSheet, Text, View,SafeAreaView, FlatList,Image,TouchableOpacity ,ScrollView} from 'react-native'
import React from 'react'
import { image } from '../../assets'
import { Screens } from '../Navigation/AppNavigation/AppNavigation'

const data = [
  {
    id:1,
    title:'Patbelly'
  },
  {
    id:1,
    title:'Dosa'
  },
  {
    id:1,
    title:'Patbelly'
  }
]


export  function HomeScreens({navigation}) {
  const renderItem = ({item,index}) =>{
    return (
      <TouchableOpacity key={index} style = {styles.FlatCon} onPress={()=>navigation.navigate(Screens.RestMenu)} >
        <Image source={image.HomePhto} style = {styles.ImageStyle}/>
        <Text style = {styles.TextData}>{item.title}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <View  style = {{flex:1,backgroundColor:'#FFFFFF'}}>
      <ScrollView>
      <Text style = {styles.MenuMain}>Menu</Text>
      <FlatList data={data} renderItem={renderItem}/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  ImageStyle:{
   width:"100%",
   height:200,
   borderRadius:5,
   elevation:20
  },
  FlatCon:{
    flex:1,
    marginTop:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    marginHorizontal:30,
    borderRadius:10,
    paddingHorizontal:10,
    paddingVertical:10,
    elevation:20
  },
  TextData:{
    fontSize:25,
    flex:1,
    alignSelf:'flex-start',
    // paddingHorizontal:2,
    fontWeight:'600',
    marginTop:5
  },
  MenuMain:{
    fontSize:30,
    color:'red',
    fontWeight:'700',
    paddingHorizontal:30,
    marginTop:23
  }
})