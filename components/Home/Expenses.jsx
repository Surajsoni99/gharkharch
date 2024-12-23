import React, { useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { ExpensesContext } from '../../components/ExpensesContext';
import ExpenseItem from './ExpenseItem';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';


export default function Expenses() {
    const { expensesList, loading } = useContext(ExpensesContext);
    const router = useRouter();

    return (
      <View style={{ flex: 1 }}>
      <View
          style={{
              padding: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
          }}
      >
          <Text
              style={{
                  fontSize: 20,
                  fontFamily: 'outfit-bold',
              }}
          >
              Expenses
          </Text>
          <Text
              style={{
                  color: Colors.PRIMARY,
                  fontFamily: 'outfit-medium',
              }}
          >
              View All
          </Text>
      </View>
      {loading ? (
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
      ) : (
          <FlatList
              data={expensesList}
              keyExtractor={(item, index) => item.id || index.toString()}
              renderItem={({ item }) => (
                  <ExpenseItem
                      expense={item}
                      onExpensePress={() => {
                          console.log("Item:", item);
                          console.log("Item ID:", item.id);
                          router.push(`/expenselist/${item.id}`);
                      }}
                  />
              )}
              ListEmptyComponent={
                  <Text style={{ textAlign: "center", marginTop: 20 }}>
                      No Expenses Found
                  </Text>
              }
              contentContainerStyle={{ paddingBottom: 20 }} // Ensuring padding at the bottom
          />
      )}
  </View>
    );
}
