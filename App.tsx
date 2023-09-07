import { StyleSheet, View } from "react-native";
import PhotoContainer from "./src/components/PhotoContainer";
import "react-native-url-polyfill/auto";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PhotoDetails from "./src/components/PhotoDetails";
import { RootSiblingParent } from "react-native-root-siblings";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      {/* //Toast library */}
      <RootSiblingParent>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={PhotoContainer} />
            <Stack.Screen name="Details" component={PhotoDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </RootSiblingParent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
