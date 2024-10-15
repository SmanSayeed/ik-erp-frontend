import { useEffect, useState } from "react";
import { useGetNodesQuery } from "../../../services/nodesApi"; // Adjust path to match your project structure
import { useGetClientsFromNodeJsQuery } from "../../../services/clientsApi";
import { useGetChildClientsQuery } from "../../../services/childClientsApi";
import { useParams } from "react-router-dom";

export default function ClientNodesComponent(){ 
  const {client_remotik_id} = useParams();
  const [filters, setFilters] = useState({
    mesh_name: client_remotik_id,
    node_name: "",
    client_remotik_id: "",
    child_client_remotik_id: "",
  });

  
  // Query to fetch nodes with filters
  const { data, error, isLoading } = useGetNodesQuery(filters);

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
      setChildClientsData([]); // Clear child clients if no client is selected
    }
  }, [childClients]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Handle form submission (filters are already handled by the useEffect)
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClear = () => {
    setFilters({
      mesh_name: "",
      node_name: "",
      client_remotik_id: "",
      child_client_remotik_id: "",
    });
    setChildClientsData([]); // Clear child client options as well
  };
  

  const style = "w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Node Data</h1>

      {/* Search Filters */}
      <form onSubmit={handleSubmit} className="flex flex-wrap justify-center gap-4 mb-6">
       

        {/* Child Client Dropdown (disabled if no client is selected) */}
       {childClientLoading ? "Loading..." : 
     <select
     name="child_client_remotik_id"
     onChange={handleInputChange}
     className={`${style}`}
   >
     <option value="">Select Child Client</option>
     {Array.isArray(childClientsData) &&
       childClientsData.length > 0 &&
       childClientsData.map((client, index) => (
         <option key={index} value={client.name}>
           {client.name}
         </option>
       ))}
   </select>
}


        <input
          type="text"
          name="mesh_name"
          value={filters.mesh_name}
          placeholder="Filter by Mesh"
          onChange={handleInputChange}
          className={style}
        />
        <input
          type="text"
          name="node_name"
          value={filters.node_name}
          placeholder="Filter by Node"
          onChange={handleInputChange}
          className={style}
        />
        <button type="submit" className="w-full md:w-1/4 px-6 py-2 bg-indigo-500 text-white font-semibold rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Search
        </button>
        <button
  type="button"
  onClick={handleClear}
  className="w-full md:w-1/4 px-6 py-2 bg-gray-300 text-black font-semibold rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
>
  Clear
</button>

      </form>

      {/* Display Loading, Error, and Data */}
      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">Error fetching data: {error.message}</p>}

      {nodesData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-100 border-b text-left text-xs font-semibold uppercase tracking-wider">ID</th>
                <th className="py-3 px-6 bg-gray-100 border-b text-left text-xs font-semibold uppercase tracking-wider">Client Remotik ID</th>
                <th className="py-3 px-6 bg-gray-100 border-b text-left text-xs font-semibold uppercase tracking-wider">Child Client Remotik ID</th>
                <th className="py-3 px-6 bg-gray-100 border-b text-left text-xs font-semibold uppercase tracking-wider">Mesh Name</th>
                <th className="py-3 px-6 bg-gray-100 border-b text-left text-xs font-semibold uppercase tracking-wider">Node Name</th>
              </tr>
            </thead>
            <tbody>
              {nodesData.map((node) => (
                <tr key={node.node_name} className="hover:bg-gray-50">
                  <td className="py-3 px-6 border-b">{node.id}</td>
                  <td className="py-3 px-6 border-b">
                    {node.client_remotik_id}
                    <span className="m-2">{node.is_child_node ? `(${node.child_client_remotik_id})` : ""}</span>
                  </td>
                  <td className="py-3 px-6 border-b">
                    <span className="m-2">{node.is_child_node ? `${node.child_client_remotik_id}` : "NA"}</span>
                  </td>
                  <td className="py-3 px-6 border-b">{node.mesh_name}</td>
                  <td className="py-3 px-6 border-b">{node.node_name || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};


