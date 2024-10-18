import ClientSelectInput from "../Clients/ClientSelectInput/ClientSelectInput";

const NodeSearchFilters = ({
    filters,
    setFilters,
    clients,
    isLoadingClients,
    childClients,
    childClientLoading,
    handleInputChange,
    handleClear,
  }) => {
    return (
      <form className="flex flex-wrap justify-center gap-2 mb-6">
        {/* Client Select */}
        <ClientSelectInput
          name="client_remotik_id"
          value={filters.client_remotik_id}
          onChange={handleInputChange}
          options={clients?.data}
          isLoading={isLoadingClients}
          label="Client"
        />
  
        {/* Child Client Select */}
        <ClientSelectInput
          name="child_client_remotik_id"
          value={filters.child_client_remotik_id}
          onChange={handleInputChange}
          options={childClients?.map((client) => client.client_remotik_id)}
          isLoading={childClientLoading}
          label="Child Client"
        />
  
        <div className="w-full md:w-1/4 px-4">
          <input
            type="text"
            name="mesh_name"
            value={filters.mesh_name}
            placeholder="Filter by Mesh"
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
  
        <div className="w-full md:w-1/5 px-2">
          <input
            type="text"
            name="node_name"
            value={filters.node_name}
            placeholder="Filter by Node"
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
  
        {/* Search and Clear Buttons */}
     
        <button
          type="button"
          onClick={handleClear}
          className="w-full md:w-1/5 px-6 py-2 bg-gray-300 text-black font-semibold rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Clear
        </button>
      </form>
    );
  };

  export default NodeSearchFilters
  