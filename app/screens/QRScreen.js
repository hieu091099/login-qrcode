import { View, Text, StyleSheet, Button, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
const deviceWith = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const QRScreen = ({ route }) => {
  const [hasPermission, setHassPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { token } = route.params;
  const position = {
    leftTop: {
      borderTopLeftRadius: 5,
      borderLeftWidth: 6,
      borderTopWidth: 6,
      borderColor: "white",
    },
    leftBottom: {
      borderBottomLeftRadius: 5,
      borderLeftWidth: 6,
      borderBottomWidth: 6,
      borderColor: "white",
    },
    rightTop: {
      borderTopRightRadius: 5,
      borderRightWidth: 6,
      borderTopWidth: 6,
      borderColor: "white",
    },
    rightBottom: {
      borderBottomRightRadius: 5,
      borderRightWidth: 6,
      borderBottomWidth: 6,
      borderColor: "white",
    },
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHassPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    let dataBody = {
      name: data,
      token: token,
    };
    try {
      let result = await axios({
        method: "POST",
        url: "http://192.168.18.172:88/check",
        data: dataBody,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.barcodeBox}>
        <BarCodeScanner
          style={[StyleSheet.absoluteFillObject, styles.cameraContainer]}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
        <View
          style={{
            ...StyleSheet.absoluteFill,
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(52, 52, 52, 0.5)",
              height: (deviceHeight - deviceWith / 1.5) / 2,
              width: "100%",
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                width: (deviceWith - deviceWith / 1.5) / 2,
                height: deviceWith / 1.5,
                backgroundColor: "rgba(52, 52, 52, 0.5)",
              }}
            />
            <View
              style={{
                width: deviceWith / 1.5,
                height: deviceWith / 1.5,
              }}
            >
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flex: 1,
                    ...position.leftTop,
                  }}
                />
                <View
                  style={{
                    flex: 4,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    ...position.rightTop,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 4,
                }}
              />
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flex: 1,

                    ...position.leftBottom,
                  }}
                />
                <View
                  style={{
                    flex: 4,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    ...position.rightBottom,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                width: (deviceWith - deviceWith / 1.5) / 2,
                height: deviceWith / 1.5,
                backgroundColor: "rgba(52, 52, 52, 0.5)",
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: "rgba(52, 52, 52, 0.5)",
              height: (deviceHeight - deviceWith / 1.5) / 2,
              width: "100%",
            }}
          />
        </View>
      </View>
      {scanned && (
        <Button title="Tap to scan again " onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

export default QRScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barcodeBox: {
    flex: 1,
    backgroundColor: "#000",
    padding: 0,
  },
  cameraContainer: {
    marginHorizontal: 0,
    marginLeft: 0,
    marginStart: 0,
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingStart: 0,
    height: "115%",
    padding: 0,
  },
});
