import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'


const Fallback = () => {
  return (
    <View style={{alignItems:"center"}}>
      <Image source ={require("../../assets/tasks.jpg")} style={{height:270, width:400}}></Image>
      <Text style={{fontWeight:"bold",
            fontSize:20}}>Comece a adicionar suas tarefas</Text>
    </View>
  )
}

export default Fallback

const styles = StyleSheet.create({})