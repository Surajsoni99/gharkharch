import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../../configs/FirebaseConfig'
import { collection, getDocs, query } from 'firebase/firestore'
import { Colors } from '../../constants/Colors'
import ExpenseItem from './ExpenseItem'


export default function Expenses() {

    const [expensesList, setExpensesList]=useState([]);
      useEffect(()=>{
        GetExpensesList()
      },[])
      const GetExpensesList = async() => {
        setExpensesList([]);
        const q = query( collection(db,'Expenses'));
        const querySnapshot = await getDocs(q);
    
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          setExpensesList(prev=>[...prev,doc.data()])
        })
      }
  return (
     <View>
          <View style={{
            padding:10,
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
              }}>
          <Text
          style={{
            fontSize: 20,
            fontFamily: 'outfit-bold'
          }}>
           Expenses
          </Text>
          <Text style={{
            color:Colors.PRIMARY,
            fontFamily: 'outfit-medium'
          }}>View All</Text>
          </View>
          <FlatList
                data = {expensesList}
                horizontal={false}
                showsVerticalScrollIndicator={true}
                style={{ marginTop: 20 }}
                renderItem={({item,index})=>(
                  <ExpenseItem 
                  expense={item}
                  key={index}
                  onExpensePress={(expense)=>console.log(expense)}
                  />
                )}
                ListEmptyComponent={
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>
                        No Expenses Found
                    </Text>
                }
                />
    </View>
  )
}