import { View, StyleSheet, Text, TextInput } from "react-native";
import { Input } from "react-native-elements";

const style = StyleSheet.create({
  container: {
    backgroundColor: "white",
    boxShadow: "1px",
    width: "90%",
    padding: 12,
    borderRadius: 8,
  },
});

type Props = {
  value: string;
  handleChange: React.Dispatch<React.SetStateAction<string>>;
};
const SearchBar = ({ value, handleChange }: Props) => {
  return (
    <View style={{ marginTop: 8 }}>
      <Input
        placeholder="Search"
        onEndEditing={(event) => handleChange(event.nativeEvent.text)}
      />
    </View>
  );
};

export default SearchBar;
