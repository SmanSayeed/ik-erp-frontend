// src/Components/Pages/Dashboard.jsx

import { useSelector } from "react-redux";
import { useGetChildClientsQuery } from "../../services/childClientsApi";
import Spinner from "../Atoms/Loader/Spinner";
import { useGetNodesQuery } from "../../services/nodesApi";
import { useGetChildClientInvoicesListQuery } from "../../services/invoicesApi";
import { Link } from "react-router-dom";
import routes from "../../routes/routes";

function ClientDashboardPage() {

  const {client} = useSelector((state) => state.auth);
  const { data: clientsData, isLoading: loadingClients } = useGetChildClientsQuery(client.client_remotik_id);
  const { data: nodesData, isLoading: loadingNodes } = useGetNodesQuery({client_remotik_id: client.client_remotik_id});
  const { data: invoicesData, isLoading: loadingInvoices } = useGetChildClientInvoicesListQuery({client_remotik_id: client.client_remotik_id});

  const totalNodes = (nodesData && nodesData?.data && nodesData?.data?.total) || 0;

  console.log("invoices ",invoicesData);
  const totalInvoices =(invoicesData && invoicesData?.data && invoicesData?.data?.pagination && invoicesData?.data?.pagination?.total) || 0;

  const totalClients = clientsData?.length || 0;

  return (
    <div className="p-4">
    <h2 className="text-2xl font-bold p-2 shadow-md rounded bg-white text-center">
      Welcome to the Dashboard
    </h2>
    <div className="flex flex-wrap justify-center gap-4 mt-4">

      {/* Total Clients Card */}
      <div className="w-full md:w-1/3 p-4">
        <div className="flex flex-col items-center justify-center p-6 border rounded-lg shadow-md bg-blue-100">
          <h3 className="text-xl font-semibold">Total Clients</h3>
          <p className="text-3xl font-bold">{loadingClients ? <Spinner /> : totalClients}</p>
          <Link to={routes.ClientSellerProfile.link} className="mt-2 text-blue-500 hover:underline">
            View Clients
          </Link>
        </div>
      </div>

      {/* Total Invoices Card */}
      <div className="w-full md:w-1/3 p-4">
        <div className="flex flex-col items-center justify-center p-6 border rounded-lg shadow-md bg-green-100">
          <h3 className="text-xl font-semibold">Total Invoices</h3>
          <p className="text-3xl font-bold">{loadingInvoices ? <Spinner /> : totalInvoices}</p>
          <Link to={routes.ClientInvoices.link(client.client_remotik_id)} className="mt-2 text-green-500 hover:underline">
            View Invoices
          </Link>
        </div>
      </div>

      {/* Total Nodes Card */}
      <div className="w-full md:w-1/3 p-4">
        <div className="flex flex-col items-center justify-center p-6 border rounded-lg shadow-md bg-yellow-100">
          <h3 className="text-xl font-semibold">Total Nodes</h3>
          <p className="text-3xl font-bold">{loadingNodes ? <Spinner /> : totalNodes}</p>
          <Link to={routes.clientNodes.link(client.client_remotik_id)} className="mt-2 text-yellow-500 hover:underline">
            View Nodes
          </Link>
        </div>
      </div>

    </div>
  </div>
  );
}

export default ClientDashboardPage;
