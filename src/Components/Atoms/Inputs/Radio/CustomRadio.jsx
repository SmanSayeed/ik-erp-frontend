import React from "react";
import { Label } from "../../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";

export default function CustomRadio({ items }) {
  return (
    <>
      <RadioGroup defaultValue="comfortable">
        {items &&
          items.map((item,index) => (
            <React.Fragment key={index}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={item.value} id={item.id}  />
                <Label htmlFor={item.id}>{item.label}</Label>
              </div>
            </React.Fragment>
          ))}
       
      </RadioGroup>
    </>
  );
}
