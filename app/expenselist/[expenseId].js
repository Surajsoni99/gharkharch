import { useLocalSearchParams, useNavigation } from "expo-router";
import { setDoc, doc,query, collection, where,getDocs, updateDoc,Timestamp } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Dropdown from "./../../components/DropDown";
import { categories } from "../../utils/categories";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

const formattedCategories = categories.map((c) => ({
    value: c.label,
    label: `${c.icon} ${c.label}`,
}));

export default function ExpenseListByCategory() {
    const { expenseId } = useLocalSearchParams() || {};
    if (!expenseId) {
        console.error("expenseId is undefined. Check the route or parameter passing.");
        return <Text>Error: expenseId is missing.</Text>;
    }

    const navigation = useNavigation();
    const router = useRouter();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [loading, setLoading] = useState(false);

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);

    const handleConfirm = (date) => {
        const formattedDate = new Date(date).toISOString().split("T")[0];
        setSelectedDate(formattedDate);
        hideDatePicker();
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: category || "Modify Expense",
        });
        fetchExpenseDetails();
    }, [category]);

    const fetchExpenseDetails = async () => {
        try {
            console.log("Fetching details for Expense ID:", expenseId); // Debug log
            const querySnapshot = await getDocs(
                query(collection(db, "Expenses"), where("id", "==", expenseId))
            );
            if (!querySnapshot.empty) {
                const docData = querySnapshot.docs[0].data();
                console.log("Queried document data:", docData);
                setAmount(docData.amount || "");
                setDescription(docData.description || "");
                setCategory(docData.Subcategory || "");
                setSelectedDate(
                    docData.date
                        ? new Date(docData.date.seconds * 1000).toISOString().split("T")[0]
                        : ""
                );
            } else {
                console.error("No document found with matching id!");
            }
        } catch (error) {
            console.error("Error fetching expense:", error);
        }
    };

    const saveExpenseDetails = async () => {
        if (!amount || !selectedDate || !category) {
            Toast.show({
                type: "error",
                text1: "Missing Fields",
                text2: "Please fill out all required fields.",
            });
            return;
        }

        setLoading(true);
        try {
            if (!expenseId) {
                console.error("expenseId is undefined. Cannot update expense.");
                return;
            }
    
            // Query the Expenses collection to find the document with the matching expenseId
            const q = query(collection(db, "Expenses"), where("id", "==", expenseId));
            const querySnapshot = await getDocs(q);
    
            // Check if a document is found
            if (!querySnapshot.empty) {
                const docSnap = querySnapshot.docs[0]; // Get the first document
                const docRef = doc(db, "Expenses", docSnap.id); // Get the document reference using the document ID
    
                // Ensure selectedDate is a valid date object and convert it to Firestore Timestamp if necessary
                const dateToSave = selectedDate
                    ? Timestamp.fromDate(new Date(selectedDate)) // Converts string date to Timestamp
                    : Timestamp.now(); // Default to current date if no date is provided
    
                // Update the document with the new data
                await updateDoc(docRef, {
                    amount: amount,
                    description: description,
                    Subcategory: category,
                    date: dateToSave, // Store the date as Firestore Timestamp
                });
    
                setLoading(false);
                Toast.show({
                    type: "success",
                    text1: "Expense Updated",
                    text2: "Your expense was updated successfully!",
                });
    
                router.push("/"); // Navigate to the home or list page after updating
            } else {
                setLoading(false);
                console.error("No document found with expenseId:", expenseId);
                Toast.show({
                    type: "error",
                    text1: "Expense Not Found",
                    text2: "No expense document was found with the provided expenseId.",
                });
            }
        } catch (error) {
            setLoading(false);
            console.error("Error updating expense:", error);
            Toast.show({
                type: "error",
                text1: "Failed to Update Expense",
                text2: "An error occurred while saving the expense.",
            });
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={styles.title}>Modify Expense</Text>
            <Text style={styles.subtitle}>Fill in details to update this expense</Text>
            <TouchableOpacity style={{ marginTop: 20 }}>
                <Image
                    source={require("./../../assets/images/camera.png")}
                    style={styles.image}
                />
            </TouchableOpacity>
            <View style={styles.container}>
                <Dropdown
                    value={category}
                    onChange={(item) => setCategory(item.value)}
                    data={formattedCategories}
                    placeholder="Select Category"
                />
                <TextInput
                    value={amount}
                    onChangeText={(v) => setAmount(v)}
                    placeholder="Amount"
                    style={styles.input}
                />
                <TextInput
                    value={description}
                    onChangeText={(v) => setDescription(v)}
                    placeholder="Description"
                    multiline
                    numberOfLines={2}
                    style={[styles.input, { height: 70 }]}
                />
                <TouchableOpacity onPress={showDatePicker}>
                    <Text style={styles.dateText}>
                        {selectedDate || "Select Date"}
                    </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
            <TouchableOpacity
                style={[styles.button, loading && { backgroundColor: Colors.GRAY }]}
                onPress={saveExpenseDetails}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator size="large" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Save Expense</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontFamily: "outfit-bold",
        fontSize: 25,
    },
    subtitle: {
        fontFamily: "outfit-regular",
        color: Colors.GRAY,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 99,
        borderWidth: 1,
        borderColor: Colors.SECONDARY,
    },
    container: {
        padding: 20,
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
    button: {
        padding: 10,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        textAlign: "center",
        fontFamily: "outfit-medium",
        color: "#fff",
    },
});
