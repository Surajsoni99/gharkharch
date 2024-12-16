import { View, Text , TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import Toast from 'react-native-toast-message';
import { Colors } from '../../constants/Colors';


export default function Budget() {

  useEffect(()=>{
        console.log('Toast triggered');
        setTimeout(()=>{
          Toast.show({
            type: "error",
            text1: "Incomplete Details",
            text2: "Please fill in all fields before submitting.",
            position: "bottom",
            visibilityTime: 10000
          });
        },2000)
      },[]);
  
    return (
      <View>
        <Text style={{
          fontSize:30,
          marginTop:60
        }}>budget : Coming Soon!!!</Text>
        <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: Colors.PRIMARY,
                  borderRadius: 5,
                  marginTop: 60,
                }}
                onPress={()=>
                  //console.log(category)
                  <Toast style={{
                    color: '#000',
                    marginTop:100,
                  }}/>
                }
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "outfit-medium",
                    color: "#fff",
                  }}
                >
                  Add Budget
                </Text>
              </TouchableOpacity>
      </View>
    );
    
}
