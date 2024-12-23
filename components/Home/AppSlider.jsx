import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ExpensesContext } from '../../components/ExpensesContext';
import { Colors } from '../../constants/Colors';

export default function AppSlider({ onIncrementMonth, onDecrementMonth }) {
  const { currentMonth, expensesList } = useContext(ExpensesContext);

  // Helper function to format month display
  const getFormattedMonth = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  // Helper function to calculate the total expense
  const calculateTotalExpense = () => {
    console.log("Expense Data: ", expensesList);  // Log the expenses list

    const total = expensesList.reduce((sum, item) => {
      const amount = parseFloat(item.amount);
      console.log(`Amount for ${item.description}: `, amount);  // Log each expense amount
      return sum + amount;
    }, 0);

    console.log("Total Expense Calculation: ", total);  // Log the total expense
    return total;
  };

  // Helper function to calculate the daily average
  const calculateDailyAverage = () => {
    const totalExpense = calculateTotalExpense();
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    console.log("Days in Month for Daily Average: ", daysInMonth);  // Log the number of days in the month
    const dailyAverage = (totalExpense / daysInMonth).toFixed(2);
    console.log("Daily Average Calculation: ", dailyAverage);  // Log the daily average
    return dailyAverage;
  };

  // Sample data format adjustment for consistent UI rendering
  const sliderList = [
    {
      id: '1',
      name1: 'Total Expense',
      value1: calculateTotalExpense(),
      name2: 'Month Budget',
      value2: '0', // Replace with actual budget logic if available
      name3: 'Savings',
      value3: '0', // Replace with actual savings calculation
      name4: 'Daily Average',
      value4: calculateDailyAverage(),
    },
    {
      id: '2',
      name1: 'Transactions',
      value1: expensesList.length || 0,
      name2: 'Most Spent Category',
      value2: 'N/A', // Replace with logic for most spent category
      name3: 'Highest Spend',
      value3: Math.max(...expensesList.map((item) => parseFloat(item.amount)), 0) || 0,
      name4: 'Most Frequent',
      value4: 'N/A', // Replace with logic for most frequent transaction
    },
  ];

  return (
    <View>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Summary</Text>
        <View style={styles.monthNav}>
          <TouchableOpacity onPress={onDecrementMonth}>
            <Text style={styles.navText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.monthText}>{getFormattedMonth(currentMonth)}</Text>
          <TouchableOpacity onPress={onIncrementMonth}>
            <Text style={styles.navText}>{'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* FlatList Section */}
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 20 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.section}>
                <View style={styles.valueContainer}>
                  <Text style={styles.bigText}>{item.value1}</Text>
                </View>
                <Text style={styles.smallText}>{item.name1}</Text>
              </View>
              <View style={styles.section}>
                <View style={styles.valueContainer}>
                  <Text style={styles.bigText}>{item.value2}</Text>
                </View>
                <Text style={styles.smallText}>{item.name2}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <View style={styles.valueContainer}>
                  <Text style={styles.bigText}>{item.value3}</Text>
                </View>
                <Text style={styles.smallText}>{item.name3}</Text>
              </View>
              <View style={styles.section}>
                <View style={styles.valueContainer}>
                  <Text style={styles.bigText}>{item.value4}</Text>
                </View>
                <Text style={styles.smallText}>{item.name4}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navText: {
    fontSize: 20,
    color: Colors.PRIMARY,
    paddingHorizontal: 10,
    fontFamily: 'outfit-bold'
  },
  monthText: {
    fontSize: 20,
    fontFamily: 'outfit-bold'
  },
  card: {
    width: 360,
    height: 200,
    borderRadius: 20,
    marginRight: 20,
    backgroundColor: Colors.ICON_BG,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  valueContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 150,
    height: 70,
    borderColor: Colors.PRIMARY,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  bigText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    textAlign: 'center',
  },
  smallText: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'outfit-medium'
  },
});
