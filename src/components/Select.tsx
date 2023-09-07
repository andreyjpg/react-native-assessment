import { useRef, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { ColorId, Orientation } from "unsplash-js";
import { View } from "react-native";

type Props = {
  label: string;
  options: string[];
  handleChange: (value: ColorId | Orientation) => void;
};

const Select = ({ options, handleChange, label }: Props) => {
  const dropdownRef = useRef({} as SelectDropdown);
  return (
    <View>
      <SelectDropdown
        defaultButtonText={label}
        ref={dropdownRef}
        buttonStyle={{ width: "auto" }}
        data={options}
        onSelect={(selectedItem) => handleChange(selectedItem)}
        buttonTextAfterSelection={(selectedItem) => {
          return selectedItem;
        }}
        rowTextForSelection={(item) => {
          return item;
        }}
      />
    </View>
  );
};

export default Select;
