import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';
import {Colors} from './../../app-example/constants/Colors'

export default function TabLayout() {
  return (
   <Tabs screenOptions={{
    headerShown:false,
    tabBarActiveTintColor:Colors.PRIMARY
    }}>
    <Tabs.Screen name='overview'
    options={{
        tabBarLabel:'Overview',
        tabBarIcon:({color}) =><Entypo name="home" size={24} color={color}/>
    }}/>
    <Tabs.Screen name='budget'
    options={{
        tabBarLabel:'Budget',
        tabBarIcon:({color}) =><Fontisto name="wallet" size={24} color={color}/>
    }}/>
    <Tabs.Screen name='incomes'
    options={{
        tabBarLabel:'Incomes',
        tabBarIcon:({color}) => <FontAwesome name="money" size={24} color={color}/>
    }}/>
    <Tabs.Screen name='tools'
    options={{
        tabBarLabel:'Tools',
        tabBarIcon:({color}) =><Octicons name="tools" size={24} color={color} />
    }}/>
   </Tabs>
  )
}