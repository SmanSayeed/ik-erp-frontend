import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreateDeviceForm = ({ onSubmit }) => {
  // Initialize status state to false
  const [status, setStatus] = useState(false);

  const handleCheckboxChange = (e) => {
    setStatus(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newDevice = Object.fromEntries(formData.entries());

    // Convert the status to a boolean
    newDevice.status = status;

    onSubmit(newDevice);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <Input
          id="name"
          name="name"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <Input
          type="checkbox"
          id="status"
          name="status"
          checked={status}
          onChange={handleCheckboxChange}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
};

export default CreateDeviceForm;
