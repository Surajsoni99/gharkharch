import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  console.log("Rendering Layout with routes");
  const [fontsLoaded] = useFonts({
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
    'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
  });

  // Ensure fonts are loaded before rendering
  if (!fontsLoaded) {
    console.log("Fonts are not loaded yet"); // Debug
    return null; // You can also return a loading spinner here
  }
  console.log("Fonts loaded successfully"); // Debug
  console.log("fontsLoaded:", fontsLoaded); 

  return 
  ( 
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="(tabs)" />
  </Stack>
  );
}
