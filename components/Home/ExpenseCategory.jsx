import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useContext } from 'react';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { ExpensesContext } from '../../components/ExpensesContext';  // Assuming this context holds expenses data
import { CATEGORY_SUBCATEGORY_MAPPING, CATEGORY_ICON_MAPPING, SUBCATEGORY_ICON_MAPPING } from '../../constants/Constants';

// Static category list using the predefined mappings
const categoryList = [
  { id: '1', name: 'FOOD' },
  { id: '2', name: 'TRANSPORT' },
  { id: '3', name: 'ENTERTAINMENT' },
  { id: '4', name: 'HEALTH' },
  { id: '5', name: 'UTILITIES' },
  { id: '6', name: 'OTHER' },
];

export default function Expenses() {
  const router = useRouter();
  const { expensesList } = useContext(ExpensesContext);  // Fetch expenses from context

  // Function to filter expenses by selected category
  const filterExpensesByCategory = (categoryName) => {
    // Get the subcategories for the given category
    const subcategories = CATEGORY_SUBCATEGORY_MAPPING[categoryName];

    // Debugging: Log the subcategories for the selected category
    console.log(`Subcategories for ${categoryName}:`, subcategories);

    // Filter expenses that match the subcategories for the selected category
    const filtered = expensesList.filter(expense => {
      // Convert both category/subcategory to lowercase for case-insensitive matching
      const expenseSubcategory = expense.Subcategory.toLowerCase();  // Convert expense Subcategory to lowercase
      const subcategoriesLower = Array.from(subcategories).map(sub => sub.toLowerCase()); // Convert subcategories to lowercase
      
      // Check if the expense subcategory is included in the lowercase subcategory set
      const isMatch = subcategoriesLower.includes(expenseSubcategory);
      
      if (isMatch) {
        // Debugging: Log matching expenses
        console.log('Matching Expense:', expense);
      }
      console.log('[DEBUG] Filtered Expenses for category:', {
        categoryName: categoryName,
        filtered,
      });
      
      
      return isMatch;
    });


    return filtered;
  };


  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Category</Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>

      <FlatList
        data={categoryList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
        renderItem={({ item, index }) => (
          <CategoryItem
            category={item}
            key={index}
            onCategoryPress={() => {
              // Filter expenses related to the category
              const filteredExpenses = filterExpensesByCategory(item.name);
              console.log('Category:', item.name);
              console.log('Filtered Expenses:', filteredExpenses);
              console.log('[DEBUG] JSON.stringify(filteredExpenses):', JSON.stringify(filteredExpenses));

              // Push to the new route with filtered expenses data
              router.push({
                pathname: `/expense/${item.name}`, // Matches [categoryName].js
                query: {
                  categoryName: item.name,
                  expenses: encodeURIComponent(JSON.stringify(filteredExpenses)), // Pass the expenses safely
                },
              });              
            }}
          />
        )}
      />
    </View>
  );
}

const CategoryItem = ({ category, onCategoryPress }) => {
  // Get the corresponding icon for the category
  const iconSource = CATEGORY_ICON_MAPPING[category.name] || CATEGORY_ICON_MAPPING['OTHER'];

  return (
    <TouchableOpacity onPress={onCategoryPress} style={styles.categoryItem}>
      <Image source={iconSource} style={styles.icon} />
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
  },
  viewAll: {
    color: Colors.PRIMARY,
    fontFamily: 'outfit-medium',
  },
  flatList: {
    marginLeft: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  icon: {
    width: 40,
    height: 40,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: 'outfit-regular',
    color: Colors.PRIMARY,
    marginTop: 5,
  },
});
