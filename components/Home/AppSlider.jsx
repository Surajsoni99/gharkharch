import { View, Text, FlatList,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {db} from '../../configs/FirebaseConfig'
import { collection, getDocs, query } from 'firebase/firestore'

export default function Slider() {

  const [sliderList, setSliderList] = useState([]);
  useEffect(() => {
    GetSliderList();
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
      <Text style={{
        fontSize:20,
        fontFamily: 'outfit-bold',
        paddingLeft: 20,
        paddingTop:20,
        marginBottom:5
      }}
      >
        #Special for You</Text>
      <FlatList
         data = {sliderList}
         horizontal={true}
         showsHorizontalScrollIndicator={false}
         style={{paddingLeft:20}}
         renderItem={(item)=>(
          <Image source={{uri:item.imageUrl}}
          style={{
            width:300,
            height:150,
            borderRadius: 15,
            marginRight:20
          }}
          />
         )}
      />
    </View>
  )
}