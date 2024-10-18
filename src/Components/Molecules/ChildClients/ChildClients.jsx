import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetChildClientsQuery } from "../../../services/childClientsApi"; // Import the query hook
import routes from "../../../routes/routes";
import StyledLink from "../../Atoms/StyledLink/StyledLink";
import Spinner from "../../Atoms/Loader/Spinner";
import { Button } from "../../ui/button";

export default function ChildClients({ client_remotik_id }) {
  // Fetch child clients based on the client_remotik_id
  const { data, error, isLoading } = useGetChildClientsQuery(client_remotik_id);
  
  // State for child client data
  const [childClients, setChildClientsData] = useState([]);

  // Effect to update state when data is fetched
  useEffect(() => {
    console.log("child ",data);
    if (data) {
      setChildClientsData(data); // Set the 'data' array inside the response
    }
  }, [data]);

  return (
    <div className="max-w-lg mx-auto p-4 my-2">
      <h2 className="my-2 font-bold text-lg">Clients</h2>
      
      {/* Loading and Error States */}
      {isLoading && (
        <div className="flex justify-center items-center">
          <Spinner />
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
                <th className="font-bold p-2 border-b border-gray-200 text-left">Email</th>
                <th className="font-bold p-2 border-b border-gray-200 text-left"> Profile</th>
               
              </tr>
            </thead>
            <tbody>
              {childClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 my-3">
                  <td className="p-2 border-b border-gray-200">{client.name}</td>
                  <td className="p-2 border-b border-gray-200">{client.email || "N/A"}</td>
                  <td className="p-2 border-b border-gray-200 flex gap-4">
                    <StyledLink className="ml-2 btn border-t-cyan-500" to={routes.childClientProfile.link(client_remotik_id, client.name)}>
                      Profile
                    </StyledLink>
                    <StyledLink className="ml-2 btn border-t-cyan-500" to={routes.updateChildClient.link(client_remotik_id,client.client_remotik_id)}>
        Edit 
        </StyledLink>
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
