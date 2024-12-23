// contexts/ExpensesContext.js
import React, { createContext, useState, useEffect } from 'react';
import { db } from '../configs/FirebaseConfig';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';

// Create context
export const ExpensesContext = createContext();

// Provider component
export const ExpensesProvider = ({ children }) => {
    const [expensesList, setExpensesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const fetchExpensesByMonth = async (month) => {
        setLoading(true);
        try {
            const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
            const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

            const q = query(
                collection(db, 'Expenses'),
                where('date', '>=', startOfMonth),
                where('date', '<=', endOfMonth),
                orderBy('date', 'desc')
            );
            const querySnapshot = await getDocs(q);
            const expenses = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setExpensesList(expenses);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpensesByMonth(currentMonth);
    }, [currentMonth]);

    return (
        <ExpensesContext.Provider
            value={{ expensesList, loading, currentMonth, setCurrentMonth, fetchExpensesByMonth }}
        >
            {children}
        </ExpensesContext.Provider>
    );
};
