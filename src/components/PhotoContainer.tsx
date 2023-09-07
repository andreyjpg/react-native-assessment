import { SafeAreaView, Text } from "react-native";
import PhotoList from "./PhotoList";
import SearchContainer from "./SearchContainer";
import { PhotoProvider } from "../context/PhotoContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const PhotoContainer = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={{ alignItems: "center" }}>
      <PhotoProvider>
        <SearchContainer />
        <PhotoList navigation={navigation} />
      </PhotoProvider>
    </SafeAreaView>
  );
};

export default PhotoContainer;
