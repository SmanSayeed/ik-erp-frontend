// src/components/ui/CustomSelectInput/CustomSelectInput.jsx
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../select"; // Adjust the import path based on your project structure
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";

const CustomSelectInput = ({ value, onChange, options, placeholder }) => {
  return (
    <Select value={value} onValueChange={onChange} className="w-[180px]">
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, index) => (
          <React.Fragment key={index}>
            {option.value && (<SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>)}
          </React.Fragment>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelectInput;
