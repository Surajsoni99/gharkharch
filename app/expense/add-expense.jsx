import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import React , { useEffect , useState} from 'react'
import {useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { TextInput } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Install this library
import Dropdown from "./../../components/DropDown";
import { categories } from "../../utils/categories";


const formattedCategories= categories.map((c) => ({
  value: c.label,
  label: `${c.icon} ${c.label}`,
}));



export default function AddExpense() {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(''); // Initialize with an empty string
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const[category, setCategory]=useState();
    const[amount, setAmount]=useState();
    const[description, setDescription]=useState();
    const[date, setDate]=useState();



    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
      // Format date as YYYY-MM-DD
      const formattedDate = new Date(date).toISOString().split('T')[0];
      setSelectedDate(formattedDate);
      hideDatePicker();
    };

    useEffect(()=>{
        navigation.setOptions({
            headerShown: true,
            //headerTitle: expense
            headerTitle: 'Add New Expense'
        })
      },[])

      const onImagePick=()=>{

      }
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
        }}
      >
        Add New Expense
      </Text>
      <Text
        style={{
          fontFamily: "outfit-regular",
          color: Colors.GRAY,
        }}
      >
        Fill all in details in order to add new expense
      </Text>
      <TouchableOpacity
        style={{
          marginTop: 20,
        }}
      >
        {/* onPress{()=>onImagePick()} */}
        <Image
          source={require("./../../assets/images/camera.png")}
          style={{
            width: 100,
            height: 100,
            borderRadius: 99,
            borderWidth: 1,
            borderColor: Colors.SECONDARY,
          }}
        />
      </TouchableOpacity>
      <View style={styles.container}>
        {/* <Text style={styles.header}>Add New Expense</Text> */}

        {/* Dropdown */}
        <Dropdown style ={{
          borderColor: Colors.PRIMARY
        }}
          onChangeText={(value)=>setCategory(value)}
          data={formattedCategories}
          onChange={console.log}
          placeholder="Select Category"
        />
        <TextInput onChangeText={(v)=>setAmount(v)} placeholder="Amount" style={styles.input} />
        <TextInput
        onChangeText={(v)=>setDescription(v)} 
          placeholder="Description"
          multiline
          numberOfLines={2}
          style={[styles.input, { height: 70 }]}
        />
        {/* Date Picker */}
        <TouchableOpacity onPress={showDatePicker}>
          <Text style={styles.dateText}>{selectedDate || "Select Date"}</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          onChange={(val)=> selectedDate(val)}
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <TouchableOpacity style={{
        padding: 10,
        backgroundColor: Colors.PRIMARY,
        borderRadius:5,
        marginTop: 10
      }}>
        <Text style={{
          textAlign: 'center',
          fontFamily: 'outfit-medium',
          color: '#fff'
        }}
        >Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
  },
  input: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 17,
    backgroundColor: Colors.light,
    borderColor: Colors.PRIMARY,
    fontFamily: "outfit-regular",
  },
  dateText: {
    marginTop: 10,
    fontSize: 17,
    color: Colors.PRIMARY,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: Colors.light,
    fontFamily: "outfit-regular",
  },
});