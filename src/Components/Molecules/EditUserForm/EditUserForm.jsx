import React from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

const EditUserForm = ({ user, onSubmit }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedUser = Object.fromEntries(formData.entries());
        onSubmit(updatedUser);
      }}
      className="space-y-4"
    >
      <div>
        <label>Email: {user.email}</label>
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <Input
          id="name"
          name="name"
          defaultValue={user.name}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      {/* <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
        <Input
          id="role"
          name="role"
          defaultValue={user.role}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div> */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email Verified</label>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="email_verified_at"
            name="email_verified_at"
            defaultChecked={user.email_verified_at}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="status"
            name="status"
            defaultChecked={user.status}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default EditUserForm;
