import { useContext, useState, useRef } from "react";
import PhotoContext from "../context/PhotoContext";
import SearchBar from "./SearchBar";
import { View, StyleSheet } from "react-native";
import Select from "./Select";
import { COLORS, ORIENTATION } from "../utils/const";

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "white",
    boxShadow: "1px",
    width: 320,
    padding: 16,
    borderRadius: 8,
    gap: 16,
    marginTop: 16,
  },
});

const SearchContainer = () => {
  const { query, setQuery, handleSelectChange } = useContext(PhotoContext);

  return (
    <View style={style.container}>
      <SearchBar value={query} handleChange={setQuery} />
      <Select
        options={COLORS}
        handleChange={handleSelectChange}
        label="Colors"
      />
      <Select
        options={ORIENTATION}
        handleChange={handleSelectChange}
        label="Orientation"
      />
    </View>
  );
};

export default SearchContainer;
