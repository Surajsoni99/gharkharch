import { useFonts } from "expo-font"
import { Stack } from "expo-router/stack";
import { ClerkProvider, ClerkLoaded, SignedIn, SignedOut } from '@clerk/clerk-expo'
import LoginScreen from "../components/LoginScreen";
import * as SecureStore from "expo-secure-store";


const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}


const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

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
    return null;
  }
  console.log("Fonts loaded successfully"); // Debug
  console.log("fontsLoaded:", fontsLoaded); 

  return (
   <ClerkProvider tokenCache = {tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <SignedIn>
          {/* This block is rendered if the user is signed in */}
          {console.log("User is Signed In")}
          <Stack screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SignedIn>
        
        <SignedOut>
          {/* This block is rendered if the user is signed out */}
          {console.log("User is Signed Out")}
            <LoginScreen/>
        </SignedOut>
      </ClerkLoaded>
    </ClerkProvider>

  )
}
