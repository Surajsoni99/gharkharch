import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AddExpense() {
  const [subcategory, setSubcategory] = useState([]);
  const [description, setDescription] = useState([]);
  const [amount, setAmount] = useState([]);
  const [date, setDate] = useState([]);
  const navigation = useNavigation();

  // Debug log for AddExpense render
  useEffect(() => {
    console.log('AddExpense rendered');
  }, []);

  const handleSubmit = () => {
    if (!subcategory || !description || !amount || !date) {
      alert('Please fill in all fields');
      return;
    }
    console.log({ subcategory, description, amount, date });
    //navigation.navigate('Overview'); // Navigate back after submitting
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Expense</Text>
      <TextInput
        placeholder="Subcategory"
        style={styles.input}
        value={subcategory}
        onChangeText={setSubcategory}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Amount"
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        placeholder="Date (DD-MM-YYYY)"
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Overview')}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
