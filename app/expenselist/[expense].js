import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig'

export default function ExpenseListByCategory() {
  const navigation = useNavigation();
  const {expense}=useLocalSearchParams();
  useEffect(()=>{
    navigation.setOptions({
        headerShown: true,
        //headerTitle: expense
        headerTitle: 'Expense'
    });
    getExpenseList()
  },[])

  /**
   * Used to get Expense by id
   */
  const getExpenseList=async()=>{
    const q = query(collection(db,'Expenses', where("Subcategory",'==',expense)));
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc)=>{
      console.log(doc.data);
    })
  }
  return (
    <View>
      <Text>{expense}</Text>
    </View>
  );
}