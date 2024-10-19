import React, { useState } from "react";
import { useGetPowerUsageQuery } from "../../../services/powerApi";
import Pagination from "../../Atoms/Pagination/Pagination"; // Adjust import path as necessary
import { Input } from "../../ui/input"; 
import { Button } from "../../ui/Button"; // Adjust import path for UI components
import PowerUsageTable from "../../Molecules/Tables/PowerUsageTable";

const PowerUsagePage = () => {
  const [page, setPage] = useState(1);
  const [clientRemotikId, setClientRemotikId] = useState("");
  const [childClientRemotikId, setChildClientRemotikId] = useState("");
  const [orderBy, setOrderBy] = useState("desc");
  const [perPage, setPerPage] = useState(50);
  
  // State for date range filters
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const { data, isLoading, error } = useGetPowerUsageQuery({
    client_remotik_id: clientRemotikId,
    child_client_remotik_id: childClientRemotikId,
    orderBy,
    perPage,
    page,
    start_time: startTime, // Add start_time filter
    end_time: endTime,     // Add end_time filter
  });

  const handleSearch = () => {
    setPage(1); // Reset to the first page after searching
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading power usage data: {error.message}</p>;

  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-4">
        {/* Search Filters */}
        <Input
          type="text"
          value={clientRemotikId}
          onChange={(e) => setClientRemotikId(e.target.value)}
          placeholder="Client Remotik ID"
          className="w-1/4"
        />
        <Input
          type="text"
          value={childClientRemotikId}
          onChange={(e) => setChildClientRemotikId(e.target.value)}
          placeholder="Child Client Remotik ID"
          className="w-1/4"
        />
        {/* Date Range Filters */}
        <Input
          type="date"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          placeholder="Start Time"
          className="w-1/4"
        />
        <Input
          type="date"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          placeholder="End Time"
          className="w-1/4"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <PowerUsageTable data={data} />

      {/* Pagination Component */}
      <Pagination
        currentPage={data.pagination.current_page}
        totalPages={data.pagination.last_page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PowerUsagePage;
