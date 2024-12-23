import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function CategoryExpensesPage() {
  const { categoryName, expenses } = useLocalSearchParams(); // Access query parameters

  console.log('[DEBUG] Search params received:', { categoryName, expenses });

  const [parsedExpenses, setParsedExpenses] = useState([]);


  useEffect(() => {
    if (!categoryName) {
      console.error('[ERROR] categoryName is missing in the URL.');
    }
  
    if (expenses) {
      try {
        // Decode and then parse the expenses
        const decodedExpenses = decodeURIComponent(expenses);
        const parsedData = JSON.parse(decodedExpenses);
        setParsedExpenses(parsedData);
        console.log('[DEBUG] Parsed expenses:', parsedData);
      } catch (error) {
        console.error('[ERROR] Failed to parse expenses:', error);
      }
    } else {
      console.warn('[WARN] No expenses data provided. Ensure router.push includes expenses.');
    }
  }, [categoryName, expenses]);
  
  

  if (!categoryName) {
    return <Text>Category name is missing in the URL.</Text>;
  }

  if (!parsedExpenses.length) {
    return <Text>No expenses found for this category.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses for {categoryName}</Text>
      <FlatList
        data={parsedExpenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text>{item.description}</Text>
            <Text>{item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  expenseItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
