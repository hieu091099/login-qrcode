import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image style={styles.tinyLogo} source={require("../assets/zlogo.png")} />
      <Text style={{ fontSize: 20, color: "#1C315E" }}>
        Scan QR code for logging
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Qr");
        }}
        style={styles.button}
      >
        <Icon name="qrcode" size={50} color="#1C315E" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  tinyLogo: {
    marginTop: -60,
    marginBottom: 10,
  },
  button: {
    width: 60,
    height: 60,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#0573ff",
    borderRadius: 6,
  },
});
