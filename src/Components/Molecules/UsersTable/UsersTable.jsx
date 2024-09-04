import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import StyledLink from "../../Atoms/StyledLink/StyledLink";
import routes from "../../../routes/routes";

const UsersTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>       
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email verified</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data?.data?.data.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <StyledLink to={routes.adminDashboardUserProfile(user.id).link}>
                {user.id}
                </StyledLink>
              
                </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email_verified_at ? "Yes" : "No"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.status ? "Active" : "Inactive"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Button onClick={() => onEdit(user)} className="mr-2">Edit</Button>
                <Button
                  variant="destructive"
                  onClick={() => onDelete(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
