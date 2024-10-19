import React, { useEffect, useState } from "react";
import { useGetLogPowerUsageQuery } from "../../../services/powerApi"; // Adjust import path as necessary
import Pagination from "../../Atoms/Pagination/Pagination"; // Adjust import path as necessary

const PowerDataSyncLogPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10); // Items per page
  const [filters, setFilters] = useState({}); // You can add filters if needed
  const [syncLogData, setSyncLogData] = useState([]); // State for sync log data

  // Fetch log power usage data from API using the pagination
  const { data, isLoading, error, refetch } = useGetLogPowerUsageQuery({
    ...filters,
    perPage,
    page,
  });

  // Update syncLogData whenever data changes
  useEffect(() => {
    console.log("syncLogData - ", data);
    if (data && data.data) {
      setSyncLogData(data.data.data); // Set the sync log data
    } else {
      setSyncLogData([]); // Fallback to empty array if data is not available
    }
  }, [data]); // Run this effect whenever data changes

  useEffect(() => {
    // Re-fetch the data whenever page or perPage changes
    refetch();
  }, [page, perPage, filters, refetch]); // Add filters to dependencies if needed

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setPage(1); // Reset to first page when items per page change
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading log power usage data: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Power Data Sync Logs</h1>
      
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Client Remotik ID</th>
            <th className="py-2 px-4 border-b">Synced Count</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Message</th>
            <th className="py-2 px-4 border-b">Created At</th>
            <th className="py-2 px-4 border-b">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {syncLogData.length > 0 && syncLogData.map((log) => (
            <tr key={log.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{log.id}</td>
              <td className="py-2 px-4 border-b">{log.client_remotik_id}</td>
              <td className="py-2 px-4 border-b">{log.synced_count}</td>
              <td className="py-2 px-4 border-b">{log.status}</td>
              <td className="py-2 px-4 border-b">{log.message}</td>
              <td className="py-2 px-4 border-b">{new Date(log.created_at).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">{new Date(log.updated_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Component */}
      <div className="flex justify-between items-center mt-4">
        <p>
          Showing {data?.from} to {data?.to} of {data?.total} entries
        </p>
        <Pagination
          currentPage={data?.current_page}
          totalPages={data?.last_page}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Per Page Selector (optional) */}
      <div className="mt-4">
        <label htmlFor="perPage">Items per page:</label>
        <select
          id="perPage"
          value={perPage}
          onChange={(e) => handlePerPageChange(Number(e.target.value))}
          className="ml-2 p-1 border border-gray-300 rounded"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default PowerDataSyncLogPage;
