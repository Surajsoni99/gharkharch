import { View, Text, Image} from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Colors } from '../../constants/Colors';

export default function Header() {
    const {user} = useUser();
  return (
    // Header
    <View style = {{
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20
    }}>
      <View style={{
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap:10
      }}>
      <Image source = {{uri:user?.imageUrl}}
        style={{
            width: 45,
            height: 45,
            borderRadius:99
        }}
      />
      <View>
        <Text style={{
            color:'#fff'
        }}>Welcome</Text>
        <Text style={{
            fontSize:19,
            color:'#fff',
            fontFamily:'outfit-medium'
        }}>{user?.fullName}</Text>
      </View>
      </View>    

    </View>
  )
}