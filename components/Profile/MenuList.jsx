import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import {useRouter} from 'expo-router'

export default function MenuList() {
    const menuList=[
        {
            id:1,
            name: 'Manage Categories',
            icon: require('./../../assets/images/categories.png'),
            path:''
        },
        {
            id:2,
            name: 'Export',
            icon: require('./../../assets/images/export.png'),
            path:''
        },
        {
            id:3,
            name: 'Share App',
            icon: require('./../../assets/images/share.png'),
            path:''
        },
        {
            id:4,
            name: 'Sign Out',
            icon: require('./../../assets/images/logout.png'),
            path:''
        },
        {
            id:5,
            name: 'Add Expense',
            icon: require('./../../assets/images/add.png'),
            path:'expense/add-expense'
        }
    ]
    const router = useRouter();
    const onMenuClick=(item)=>{
        router.push(item.path)
    }
  return (
    <View style={{
        marginTop: 50
    }}>
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({item, index})=>(
            <TouchableOpacity 
            onPress={() => onMenuClick(item)}
            style = {{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                flex: 1,
                padding: 10,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: Colors.PRIMARY,
                margin: 10,
                backgroundColor:'#fff'
            }}>
                <Image source={item.icon}
                       style = {{
                        width:50,
                        height:50
                       }}
                />
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 14,
                    flex: 1
                }}
                >{item.name}</Text>
            </TouchableOpacity>
        )}
      />

      <Text style={{
        fontFamily:'outfit',
        textAlign: 'center',
        marginTop: 30,
        color: Colors.GRAY
      }}>
        Developed by Suraj @2024
      </Text>
    </View>
  )
}