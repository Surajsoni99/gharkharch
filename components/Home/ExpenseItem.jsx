import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import { CATEGORY_ICON_MAPPING, SUBCATEGORY_ICON_MAPPING } from '../../constants/Constants'; // Import mappings

export default function ExpenseItem({ expense, onExpensePress }) {
    // Convert Firestore Timestamp to DD-MM-YYYY
    const formatDate = (timestamp) => {
        if (!timestamp || !timestamp.seconds) return ''; // Fallback for missing date
        const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const getIcon = (subcategory) => {
      // Ensure subcategory exists before accessing or normalizing it
      if (!subcategory) {
          return null; // Return null if subcategory is missing or undefined
      }
  
      // Normalize subcategory to uppercase and access the mapping
      const normalizedSubcategory = subcategory.toUpperCase();
      return SUBCATEGORY_ICON_MAPPING[normalizedSubcategory] || null;
  };
  

  console.log('Expense Data:', expense);

    return (
        <TouchableOpacity onPress={() => onExpensePress(expense)}>
            <View style={styles.container}>
                <Image source={getIcon(expense.Subcategory)} style={styles.icon} />
                <View style={styles.textContainer}>
                    <View style={styles.row}>
                        <Text style={styles.subCategory}>{expense.Subcategory}</Text>
                        <Text style={styles.date}>{formatDate(expense.date)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.description}>{expense.description}</Text>
                        <Text style={styles.amount}>{`₹${expense.amount}`}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 1,
        borderRadius: 10,
        marginVertical: 8,
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 15,
        marginLeft: 20,
        borderRadius: 90,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
    },
    subCategory: {
        fontSize: 20,
        fontFamily: 'outfit-bold',
        marginTop: 5,
        color: Colors.PRIMARY,
    },
    date: {
        fontSize: 12,
        fontFamily: 'outfit-regular',
        color: Colors.SECONDARY,
        marginBottom: 5,
    },
    description: {
        fontSize: 12,
        fontFamily: 'outfit-regular',
        color: Colors.SECONDARY,
    },
    amount: {
        fontSize: 18,
        fontFamily: 'outfit-bold',
        color: Colors.PRIMARY,
        marginRight: 15,
        marginTop: -15,
    },
});
