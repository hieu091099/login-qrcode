import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Provider, { AppContext } from "./context/Provider";
import Home from "./screens/Home";
import QRScreen from "./screens/QRScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  const { isLoggedIn } = useContext(AppContext);
  console.log(isLoggedIn);
  return (
    // <SafeAreaView>
    <Provider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Qr"
            component={QRScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
