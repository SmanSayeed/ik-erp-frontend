import React from "react";
import { Button } from "@/components/ui/button";
import StyledLink from "@/components/Atoms/StyledLink/StyledLink";
import routes from "@/routes/routes";

const DeviceTable = ({ data, onEdit, onDelete }) => {
  const devices = data?.data || [];
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {devices.map((device, index) => (
            <tr key={device.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {/* <StyledLink to={routes.deviceDetail(device.id).link}> */}
                  {device.id}
                {/* </StyledLink> */}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{device.status ? "Active" : "Inactive"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Button onClick={() => onEdit(device)} className="mr-2">Edit</Button>
                <Button variant="destructive" onClick={() => onDelete(device.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceTable;
