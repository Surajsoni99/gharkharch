import { View, Text, FlatList,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import {db} from '../../configs/FirebaseConfig'
import { collection, getDocs, query } from 'firebase/firestore'
import { Colors } from '../../constants/Colors';


const sliderList = [
  {
    id: "1",
    name1: "Total Expense",
    value1: "4000",
    name2: "Month Budget",
    value2: "0",
    name3: "Savings",
    value3: "0",
    name4: "Daily Average",
    value4: "130",
  },
  {
    id: "2",
    name1: "Transactions",
    value1: "13",
    name2: "Most Spent Category",
    value2: "Household",
    name3: "Highest Spend",
    value3: "1330",
    name4: "Most Frequent",
    value4: "Tea",
  }
];


export default function Slider() {

  //const [sliderList, setSliderList] = useState([]);
  useEffect(() => {
    //GetSliderList();
  }, []);

  const GetSliderList = async () => {
    try {
      console.log("Fetching slider list...");

      const q = query(collection(db, 'Slider'));

      // Fetch documents from the collection
      const querySnapShot = await getDocs(q);
      console.log("Query Snapshot:", querySnapShot);

      // Iterate through each document in the snapshot
      querySnapShot.forEach((doc) => {
        console.log("Document Data:", doc.data());
        console.log("Document ID:", doc.id);
        setSliderList(prev=> [...prev, doc.data()])
      });
    } catch (error) {
      console.error("Error fetching slider list:", error);
    }
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontFamily: "outfit-bold",
          paddingLeft: 20,
          paddingTop: 20,
          marginBottom: 5,
        }}
      >
        Summary
      </Text>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 20 }}
        keyExtractor={(item) => item.id} // Ensure unique keys
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Top Row */}
            <View style={styles.row}>
              {/* Top Left */}
              <View style={[styles.section, styles.topLeft]}>
                <View style={styles.valueContainer}>
                  <Text style={styles.bigText}>{item.value1}</Text>
                </View>
                <Text style={styles.smallText}>{item.name1}</Text>
              </View>
              {/* Top Right */}
              <View style={[styles.section, styles.topRight]}>
                <View style={styles.valueContainer}>
                  <Text style={styles.bigText}>{item.value2}</Text>
                </View>
                <Text style={styles.smallText}>{item.name2}</Text>
              </View>
            </View>

            {/* Bottom Row */}
            <View style={styles.row}>
              {/* Bottom Left */}
              <View style={[styles.section, styles.bottomLeft]}>
                <View style={styles.valueContainer}>
                  <Text style={styles.bigText}>{item.value3}</Text>
                </View>
                <Text style={styles.smallText}>{item.name3}</Text>
              </View>
              {/* Bottom Right */}
              <View style={[styles.section, styles.bottomRight]}>
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
    alignItems: 'center', // Center both box and text
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
    marginBottom: 5, // Space between box and label
  },
  bigText: {
    fontSize: 26,
    fontWeight: 'outfit-bold',
    color: Colors.PRIMARY,
    textAlign: 'center',
  },
  smallText: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'outfit-medium',
    textAlign: 'center',
  },
});
