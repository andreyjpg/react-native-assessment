import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { getPhotoById } from "../unsplash";
import { Full } from "unsplash-js/dist/methods/photos/types";
import { Card, Button } from "react-native-elements";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import Toast from "react-native-root-toast";

type Props = {
  navigation: NativeStackNavigationProp<any>;
  route: any;
};

const PhotoDetails = ({ route }: Props) => {
  const [photoDetail, setPhotoDetail] = useState<Full | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { photoId } = route.params;

  useEffect(() => {
    const run = async () => {
      try {
        const res = await getPhotoById(photoId);
        setPhotoDetail(res);
      } catch (err) {
        Toast.show(`${err}`, {
          duration: Toast.durations.LONG,
        });
      }
    };
    run();
  }, []);

  const downloadFromUrl = async () => {
    setIsLoading(true);
    const fileName = `${photoId}.jpg`;
    const result = await FileSystem.downloadAsync(
      photoDetail?.links.download || "",
      FileSystem.documentDirectory + fileName
    );
    save(result.uri);
    setIsLoading(false);
  };

  const save = (uri: string) => {
    shareAsync(uri);
  };

  return (
    <View>
      <Card wrapperStyle={{ height: "88%" }}>
        <Card.Image
          source={{ uri: photoDetail?.urls.full }}
          style={{ height: "90%", resizeMode: "contain" }}
        />
        <Text style={style.imageTitle}>{photoDetail?.description}</Text>
        <View style={style.photoInformation}>
          <Text>
            <Text style={style.likes}>{photoDetail?.likes + " "}</Text>
            Likes
          </Text>
          {photoDetail?.user.first_name ? (
            <Text>
              User name: {photoDetail?.user.first_name}{" "}
              {photoDetail?.user.last_name}
            </Text>
          ) : null}
        </View>
        <View style={style.photoInformation}>
          <Text>
            Created At:{" "}
            {new Date(photoDetail?.created_at || "").toLocaleDateString(
              "en-us",
              {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            )}
          </Text>
          {photoDetail?.user.instagram_username ? (
            <Text>@{photoDetail.user.instagram_username}</Text>
          ) : null}
        </View>
      </Card>
      <Button
        buttonStyle={{
          borderRadius: 0,
          margin: 16,
        }}
        onPress={downloadFromUrl}
        title={isLoading ? <ActivityIndicator color="fff" /> : "Download"}
      ></Button>
    </View>
  );
};

const style = StyleSheet.create({
  imageTitle: {
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "bold",
    fontSize: 16,
  },
  photoInformation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  likes: {
    fontWeight: "bold",
    margin: 4,
  },
});

export default PhotoDetails;
