import { View ,TouchableOpacity, Text, StyleSheet} from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header';
import AppSlider from '../../components/Home/AppSlider'
import ExpenseCategory from '../../components/Home/ExpenseCategory'
import Expenses from '../../components/Home/Expenses';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/Colors';
import {useRouter} from 'expo-router'


export default function Overview() {
  const navigation = useNavigation();

  const router = useRouter();
  const onPlusClick=()=>{
          router.push('expense/add-expense')
   }

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0' }} // for parent View
>
        {/* Header */}
        <Header/>
        {/* Slider */ }
        <AppSlider/>
        {/* Expenses Category*/}
        <ExpenseCategory/>
        {/*Expenses*/}
        <Expenses/>
        {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => onPlusClick()}
      >
        <Text style={styles.plusIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30, // Perfectly round button
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Ensures it appears above other components
  },
  plusIcon: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',  // Ensures the text is centered
    lineHeight: 60,  // Ensures the text is vertically centered in the circle
  },
});