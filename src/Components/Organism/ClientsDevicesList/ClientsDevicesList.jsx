import React, { useEffect, useState } from "react";
import axios from "axios";

const ClientsDevicesList = () => {
  const [devicesData, setDevicesData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/sqlite/power");
        setDevicesData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Device Power Usage</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Node ID</th>
              <th className="py-2 px-4 border-b">Power</th>
              <th className="py-2 px-4 border-b">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {devicesData.length > 0 ? (
              devicesData.map((device) => (
                <tr key={device.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{device.id}</td>
                  <td className="py-2 px-4 border-b">{device.doc.nodeid}</td>
                  <td className="py-2 px-4 border-b">{device.doc.power}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(device.doc.time).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsDevicesList;
