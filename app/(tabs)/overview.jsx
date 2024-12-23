// pages/overview.jsx
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import Header from '../../components/Home/Header';
import AppSlider from '../../components/Home/AppSlider';
import ExpenseCategory from '../../components/Home/ExpenseCategory';
import Expenses from '../../components/Home/Expenses';
import { useRouter } from 'expo-router';
import { ExpensesContext } from '../../components/ExpensesContext';
import { Colors } from '../../constants/Colors';

export default function Overview() {
    const router = useRouter();
    const { currentMonth, setCurrentMonth } = useContext(ExpensesContext);

    const incrementMonth = () => {
        const nextMonth = new Date(currentMonth);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        setCurrentMonth(nextMonth);
    };

    const decrementMonth = () => {
        const prevMonth = new Date(currentMonth);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        setCurrentMonth(prevMonth);
    };

    const onPlusClick = () => {
        router.push('expense/add-expense');
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
            {/* Header */}
            <Header />
            {/* Slider */}
            <AppSlider onIncrementMonth={incrementMonth} onDecrementMonth={decrementMonth} />
            {/* Expenses Category */}
            <ExpenseCategory />
            {/* Expenses */}
            <Expenses />
            {/* Floating Button */}
            <TouchableOpacity style={styles.floatingButton} onPress={() => onPlusClick()}>
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
        borderRadius: 30,
        backgroundColor: Colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    plusIcon: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
    },
});
