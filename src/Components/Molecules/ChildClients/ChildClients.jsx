import { Link } from "react-router-dom";
import { useGetChildClientsQuery } from "../../../services/childClientsApi"; // Import the query hook
import routes from "../../../routes/routes";
import StyledLink from "../../Atoms/StyledLink/StyledLink";


export default function ChildClients({ client_remotik_id }) {
  // Use the query to get child clients based on seller's client_remotik_id
  console.log('client_remotik_id - ',client_remotik_id);
  const { data: childClients, error, isLoading } = useGetChildClientsQuery(client_remotik_id);

  return (
    <div className="max-w-lg mx-auto p-4 my-2">
      <h2 className="my-2 font-bold text-lg">Clients</h2>
      
      {/* Loading and Error States */}
      {isLoading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-500"></div> {/* Loading spinner */}
        </div>
      )}
      {error && (
        <div className="text-red-500">Error fetching child clients. Please try again later.</div>
      )}

      {/* Table for displaying child clients */}
      {childClients && childClients.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="font-bold p-2 border-b border-gray-200 text-left">Client Name</th>
                <th className="font-bold p-2 border-b border-gray-200 text-left">Create Profile</th>
              </tr>
            </thead>
            <tbody>
              {childClients.map((client) => (
                <tr key={client.meshid} className="hover:bg-gray-50">
                  <td className="p-2 border-b border-gray-200">{client.name}</td>
                  <td className="p-2 border-b border-gray-200">
                    <StyledLink className='ml-2 btn border-t-cyan-500 ' to={routes.childClientProfile.link(client_remotik_id,client.name)}>Profile</StyledLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No child clients found */}
      {childClients && childClients.length === 0 && (
        <div className="text-gray-500 mt-4">No child clients found.</div>
      )}
    </div>
  );
}
