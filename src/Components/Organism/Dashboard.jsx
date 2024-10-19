// src/Components/Pages/Dashboard.jsx

import React from 'react';
import { useGetClientsFromNodeJsQuery } from '../../services/clientsApi';
import { useGetNodesQuery } from '../../services/nodesApi';
import { useGetDevicesQuery } from '../../services/deviceApi';
import { Link } from 'react-router-dom';
import routes from '../../routes/routes';
import Spinner from '../Atoms/Loader/Spinner';
import { useGetInvoicesListQuery } from '../../services/invoicesApi';

function Dashboard() {
  const { data: clientsData, isLoading: loadingClients } = useGetClientsFromNodeJsQuery();
  const { data: nodesData, isLoading: loadingNodes } = useGetNodesQuery();
  const { data: invoicesData, isLoading: loadingInvoices } = useGetInvoicesListQuery();
console.log("nodes ",nodesData);
  const totalNodes = (nodesData && nodesData?.data && nodesData?.data?.total) || 0;

  const totalInvoices =(invoicesData && invoicesData?.data && invoicesData?.data?.pagination && invoicesData?.data?.pagination?.total) || 0;

  const totalClients = clientsData?.data?.length || 0;

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
            <Link to={routes.adminDashboardClients.link} className="mt-2 text-blue-500 hover:underline">
              View Clients
            </Link>
          </div>
        </div>

        {/* Total Invoices Card */}
        <div className="w-full md:w-1/3 p-4">
          <div className="flex flex-col items-center justify-center p-6 border rounded-lg shadow-md bg-green-100">
            <h3 className="text-xl font-semibold">Total Invoices</h3>
            <p className="text-3xl font-bold">{loadingInvoices ? <Spinner /> : totalInvoices}</p>
            <Link to={routes.adminInvoiceList.link} className="mt-2 text-green-500 hover:underline">
              View Invoices
            </Link>
          </div>
        </div>

        {/* Total Nodes Card */}
        <div className="w-full md:w-1/3 p-4">
          <div className="flex flex-col items-center justify-center p-6 border rounded-lg shadow-md bg-yellow-100">
            <h3 className="text-xl font-semibold">Total Nodes</h3>
            <p className="text-3xl font-bold">{loadingNodes ? <Spinner /> : totalNodes}</p>
            <Link to={routes.adminNodes.link} className="mt-2 text-yellow-500 hover:underline">
              View Nodes
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
