import React from 'react';

const PowerDataTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-800 text-gray-100">
          <tr>
            <th className="py-2 px-4 text-left"> Remotik Power ID</th>
            <th className="py-2 px-4 text-left">Client ID</th>
            <th className="py-2 px-4 text-left">Child Client ID</th>
            <th className="py-2 px-4 text-left">Node Name</th>
            <th className="py-2 px-4 text-left">Power</th>
            <th className="py-2 px-4 text-left">Time</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((powerData, index) => (
            <tr key={powerData.id} className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
              <td className="py-2 px-4">{powerData.remotik_power_id}</td>
              <td className="py-2 px-4">{powerData.client_remotik_id}</td>
              <td className="py-2 px-4">{powerData.child_client_remotik_id}</td>
              <td className="py-2 px-4">{powerData.node_name}</td>
              <td className="py-2 px-4">{powerData.power}</td>
              <td className="py-2 px-4">{new Date(powerData.time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PowerDataTable;
