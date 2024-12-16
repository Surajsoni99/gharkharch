import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from '../../configs/FirebaseConfig';
import { collection, getDocs, query,orderBy } from 'firebase/firestore';
import { Colors } from '../../constants/Colors';
import ExpenseItem from './ExpenseItem';
import { useRouter } from 'expo-router';

export default function Expenses() {
    const [expensesList, setExpensesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        GetExpensesList();
    }, []);

    const GetExpensesList = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, 'Expenses'), orderBy('date','desc'));
            const querySnapshot = await getDocs(q);

            const expenses = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setExpensesList(expenses);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        } finally {
            setLoading(false);
        }
    };

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
