import React from 'react';

const ChildNodeSearchFilters = ({
  filters,
  setFilters,
  childClients,
  childClientLoading,
  handleInputChange,
  handleClear,
}) => {
  return (
    <form className="flex flex-wrap justify-center gap-2 mb-6">
      {/* Child Client Select */}
      {childClientLoading ? (
        <p>Loading Child Clients...</p>
      ) : (
        <div className="w-full md:w-1/4 px-4">
          <select
            name="child_client_remotik_id"
            value={filters.child_client_remotik_id}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Child Client</option>
            {childClients?.map((client, index) => (
              <option key={index} value={client.name}>
                {client.client_remotik_id}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Mesh Name Filter */}
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

      {/* Node Name Filter */}
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

      {/* Clear Button */}
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

export default ChildNodeSearchFilters;
