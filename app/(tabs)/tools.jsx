import { View, Text } from 'react-native'
import React from 'react'
import UserIntro from '../../components/Profile/UserIntro';
import MenuList from '../../components/Profile/MenuList';

export default function Tools() {
  return (
    <View style={{
      padding:30
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:35
      }}>setting</Text>

     <UserIntro/>
     
     <MenuList/>

    </View>

  );
}