import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";
import { Input, Icon } from "@rneui/themed";
import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [user, setUser] = useState({
    userId: "",
    password: "",
    exponentPushToken: "ExponentPushToken[Ax8TfJFqujvlWcisHBId0f]",
    factory: "LYV",
  });
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
      }}
    >
      <Image style={styles.tinyLogo} source={require("../assets/zlogo.png")} />
      <Input
        onChangeText={(value) => setUser({ ...user, userId: value })}
        placeholder="Username"
        leftIcon={
          <Icon name="user" type="ant-design" size={24} color="#0573ff" />
        }
      />
      <Input
        secureTextEntry={true}
        onChangeText={(value) => setUser({ ...user, password: value })}
        placeholder="Password"
        leftIcon={
          <Icon name="key" type="ant-design" size={24} color="#0573ff" />
        }
      />
      <Button
        onPress={async () => {
          let result = await axios({
            method: "POST",
            url: "http://erp.lacty.com.vn:8081/auth/login",
            data: user,
          });
          if (result.data.authenticated == true) {
            let data = result.data;
            navigation.navigate("Home", { token: data.accessToken });
          } else {
            Alert("Login fail!");
          }
        }}
        containerStyle={{
          width: 500,
          height: 300,
        }}
        title="Login"
        type="solid"
        loading
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    marginTop: -60,
    marginBottom: 10,
  },
});
