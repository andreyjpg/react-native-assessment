import { View, FlatList, Text, TouchableOpacity } from "react-native";
import PhotoContext from "../context/PhotoContext";
import { useContext } from "react";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { Image } from "react-native-elements";

const PhotoList = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) => {
  const { photosList, nextPage } = useContext(PhotoContext);
  const handleOnPressImage = (id: string) => {
    navigation.navigate("Details", {
      photoId: id,
    });
  };
  const renderItem = ({ item }: { item: Basic }) => {
    return (
      <TouchableOpacity onPress={() => handleOnPressImage(item.id)}>
        <Image
          style={{
            resizeMode: "cover",
            width: 320,
            height: 320,
            marginTop: 16,
          }}
          source={{
            uri: item.urls.regular,
          }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      style={{ marginTop: 16 }}
      data={photosList}
      renderItem={renderItem}
      onEndReachedThreshold={0.5}
      onEndReached={nextPage}
      keyExtractor={(item, index) => `${item.id}-${index}`}
    />
  );
};

export default PhotoList;
