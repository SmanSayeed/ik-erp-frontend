import React from "react";
import { Label } from "../../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";

export default function CustomRadio({ items,label,id,onChange }) {
  return (
    <>
       <label className="block text-sm font-medium mb-1" htmlFor={id}>
        {label}
      </label>

      <RadioGroup defaultValue={label}  id={id} >
        {items &&
          items.map((item,index) => (
            <React.Fragment key={index}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem  value={item.value} id={item.id} checked={item.checked}  />
                <Label htmlFor={item.id}>{item.label}</Label>
              </div>
            </React.Fragment>
          ))}
       
      </RadioGroup>
    </>
  );
}
