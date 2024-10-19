const NodesTable = ({ nodesData }) => {
    return (
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
            {nodesData.map((node,index) => (
              <tr key={node.id} className="hover:bg-gray-50">
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
    );
  };
  

  export default NodesTable