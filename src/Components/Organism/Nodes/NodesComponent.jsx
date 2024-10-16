import { useEffect, useState } from "react";
import { useGetNodesQuery } from "@/services/nodesApi";
import { useGetClientsFromNodeJsQuery } from "@/services/clientsApi";
import { useGetChildClientsQuery } from "@/services/childClientsApi";
import NodeSearchFilters from "@/Components/Molecules/Filters/NodeSearchFilters";
import NodesTable from "@/Components/Molecules/Tables/NodesTable";

export default function NodesComponent() {
  const [filters, setFilters] = useState({
    mesh_name: "",
    node_name: "",
    client_remotik_id: "",
    child_client_remotik_id: "",
  });

  // Query to fetch nodes with filters
  const { data, error, isLoading } = useGetNodesQuery(filters);
  const { data: clients, isLoading: isLoadingClients } = useGetClientsFromNodeJsQuery();

  const [nodesData, setNodesData] = useState([]);
  const [childClientsData, setChildClientsData] = useState([]);

  // Fetch child clients based on the selected client_remotik_id
  const { data: childClients, isLoading: childClientLoading, refetch: refetchChildClients } = useGetChildClientsQuery(
    filters.client_remotik_id,
    {
      skip: !filters.client_remotik_id,
    }
  );

  useEffect(() => {
    if (data) {
      setNodesData(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (childClients) {
      setChildClientsData(childClients);
    } else {
      setChildClientsData([]);
    }
  }, [childClients]);

  useEffect(() => {
    if (filters.client_remotik_id) {
      refetchChildClients();
    }
  }, [filters.client_remotik_id, refetchChildClients]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFilters({
      mesh_name: "",
      node_name: "",
      client_remotik_id: "",
      child_client_remotik_id: "",
    });
    setChildClientsData([]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Node Data</h1>

      {/* Search Filters Component */}
      <NodeSearchFilters
        filters={filters}
        setFilters={setFilters}
        clients={clients}
        isLoadingClients={isLoadingClients}
        childClients={childClientsData}
        childClientLoading={childClientLoading}
        handleInputChange={handleInputChange}
        handleClear={handleClear}
      />

      {/* Display Loading, Error, and Data */}
      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">Error fetching data: {error.message}</p>}
      {data && <NodesTable nodesData={nodesData} />}
    </div>
  );
}
