import { useEffect, useState } from "react";
import { useGetNodesQuery } from "@/services/nodesApi";
import { useGetChildClientsQuery } from "@/services/childClientsApi";
import { useParams } from "react-router-dom";
import ChildNodeSearchFilters from "@/Components/Molecules/Filters/ChildNodeSearchFilters";
import NodesTable from "@/Components/Molecules/Tables/NodesTable";

export default function ChildNodesComponent() {
  const { client_remotik_id } = useParams();
  const [filters, setFilters] = useState({
    mesh_name: "",
    node_name: "",
    child_client_remotik_id: "",
  });

  // Query to fetch nodes with filters
  const { data, error, isLoading } = useGetNodesQuery({ ...filters, client_remotik_id });

  const [nodesData, setNodesData] = useState([]);
  const [childClientsData, setChildClientsData] = useState([]);

  // Fetch child clients based on the selected client_remotik_id
  const { data: childClients, isLoading: childClientLoading } = useGetChildClientsQuery(client_remotik_id);

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
      child_client_remotik_id: "",
    });
    setChildClientsData([]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Child Node Data</h1>

      {/* Child Node Search Filters */}
      <ChildNodeSearchFilters
        filters={filters}
        setFilters={setFilters}
        childClients={childClientsData}
        childClientLoading={childClientLoading}
        handleInputChange={handleInputChange}
        handleClear={handleClear}
      />

      {/* Display Loading, Error, and Data */}
      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">Error fetching data: {error.message}</p>}
      {nodesData.length > 0 && <NodesTable nodesData={nodesData} />}
    </div>
  );
}
