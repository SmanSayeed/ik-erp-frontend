import { useEffect, useState } from "react";
import { useGetNodesQuery } from "@/services/nodesApi";
import { useGetChildClientsQuery } from "@/services/childClientsApi";
import { useParams } from "react-router-dom";
import ChildNodeSearchFilters from "@/Components/Molecules/Filters/ChildNodeSearchFilters";
import NodesTable from "@/Components/Molecules/Tables/NodesTable";
import Pagination from "../../Atoms/Pagination/Pagination"; // Import Pagination component

export default function ChildNodesComponent() {
  const { client_remotik_id } = useParams();
  const [filters, setFilters] = useState({
    mesh_name: "",
    node_name: "",
    child_client_remotik_id: "",
  });

  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [itemsPerPage, setItemsPerPage] = useState(10); // State for items per page

  // Query to fetch nodes with filters and pagination
  const { data, error, isLoading } = useGetNodesQuery({
    ...filters,
    client_remotik_id,
    page: currentPage, // Add current page to the query
    per_page: itemsPerPage, // Use itemsPerPage state
  });

  const [nodesData, setNodesData] = useState([]);
  const [childClientsData, setChildClientsData] = useState([]);

  // Fetch child clients based on the selected client_remotik_id
  const { data: childClients, isLoading: childClientLoading } = useGetChildClientsQuery(client_remotik_id);

  useEffect(() => {
    if (data) {
      setNodesData(data.data.data); // Adjust according to your API response structure
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

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (numItems) => {
    setItemsPerPage(numItems);
    setCurrentPage(1); // Reset to first page when items per page changes
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
      {nodesData.length > 0 && (
        <>
          <NodesTable nodesData={nodesData} />
          <Pagination
            currentPage={currentPage}
            totalPages={data?.data?.last_page} // Use total pages from response
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange} // Pass handler to Pagination
            itemsPerPage={itemsPerPage} // Pass items per page state
            setItemsPerPage={setItemsPerPage}
            perPageArray={[10, 25, 50, 100]}
          />
          <div className="text mt-4">
            <p>Total Nodes: {data?.data?.total}, Total Pages: {data?.data?.last_page}</p>
          </div>
        </>
      )}
    </div>
  );
}
