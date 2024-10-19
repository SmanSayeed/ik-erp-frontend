import React, { useState, useEffect } from "react";
import { useGetPowerUsageQuery } from "../../../services/powerApi";
import Pagination from "../../Atoms/Pagination/Pagination"; // Adjust import path as necessary
import { Input } from "../../ui/input";
import { Button } from "../../ui/Button"; // Adjust import path for UI components
import PowerUsageTable from "../../Molecules/Tables/PowerUsageTable";
import ClientSelectInput from "../../Molecules/Clients/ClientSelectInput/ClientSelectInput"; // Import ClientSelectInput
import { useGetClientsFromNodeJsQuery } from "@/services/clientsApi"; // Adjust import paths for your services
import { useGetChildClientsQuery } from "@/services/childClientsApi";

const PowerUsagePage = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    client_remotik_id: "",
    child_client_remotik_id: "",
    orderBy: "desc",
    start_time: "",
    end_time: "",
  });
  const [perPage, setPerPage] = useState(50);
  const [childClientsData, setChildClientsData] = useState([]); // Use state to store child client data

  // Fetching clients from Node.js API
  const { data: clients, isLoading: isLoadingClients } = useGetClientsFromNodeJsQuery();

  // Fetch child clients based on selected client_remotik_id
  const { data: childClients, isLoading: childClientLoading, refetch: refetchChildClients } = useGetChildClientsQuery(
    filters.client_remotik_id,
    { skip: !filters.client_remotik_id } // Only fetch child clients if a client_remotik_id is selected
  );

  // Fetch power usage data from API using the filters
  const { data, isLoading, error, refetch } = useGetPowerUsageQuery({
    ...filters,
    perPage,
    page,
  });

  useEffect(() => {
    if (filters.client_remotik_id) {
      refetchChildClients(); // Refetch child clients when client_remotik_id changes
    }
  }, [filters.client_remotik_id, refetchChildClients]);

  useEffect(() => {
    if (childClients) {
      setChildClientsData(childClients);
    } else {
      setChildClientsData([]); // Set to empty array if no child clients
    }
  }, [childClients]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    setPage(1); // Reset to first page after applying search
    refetch(); // Refetch the power usage data with new filters
  };

  const handleClear = () => {
    setFilters({
      client_remotik_id: "",
      child_client_remotik_id: "",
      orderBy: "desc",
      start_time: "",
      end_time: "",
    });
    setChildClientsData([]); // Clear child clients when filters are cleared
    setPage(1);
    refetch();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading power usage data: {error.message}</p>;

  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-4">
        {/* Client Select */}
        <ClientSelectInput
          name="client_remotik_id"
          value={filters.client_remotik_id}
          onChange={handleInputChange}
          options={clients?.data || []} // Pass clients from API safely
          isLoading={isLoadingClients}
          label="Client"
        />

        {/* Child Client Select */}
        <ClientSelectInput
          name="child_client_remotik_id"
          value={filters.child_client_remotik_id}
          onChange={handleInputChange}
          options={childClientsData.map((client) => client.client_remotik_id)} // Map child clients safely
          isLoading={childClientLoading}
          label="Child Client"
        />

        {/* Date Range Filters */}
        <Input
          type="date"
          name="start_time"
          value={filters.start_time}
          onChange={handleInputChange}
          placeholder="Start Time"
          className="w-1/4"
        />
        <Input
          type="date"
          name="end_time"
          value={filters.end_time}
          onChange={handleInputChange}
          placeholder="End Time"
          className="w-1/4"
        />

        <Button onClick={handleSearch}>Search</Button>
        <Button onClick={handleClear}>Clear</Button>
      </div>

      {/* Power Usage Table */}
      <PowerUsageTable data={data?.data} />

      {/* Pagination Component */}
      <div className="flex justify-between items-center">
        <div>
          <p>
            Showing {data?.from} to {data?.to} of {data?.total} entries
          </p>
        </div>
        <Pagination
          currentPage={data?.pagination?.current_page}
          totalPages={data?.pagination?.last_page}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PowerUsagePage;
