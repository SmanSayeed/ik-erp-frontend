import React, { useEffect, useState } from "react";
import Modal from "../../ui/Modal";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClientsTable from "../../Molecules/ClientsTable/ClientsTable";
import EditClientForm from "../../Molecules/EditClientForm/EditClientForm";
// import Filters from "../../Molecules/Filters/Filters";
 // Adjust import path
import {
  useGetClientsListQuery,
  useUpdateClientInfoMutation,
  useSoftDeleteClientMutation,
} from "../../../services/adminManagesClientsApi";

const ClientsListPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [emailVerified, setEmailVerified] = useState("");
  const [orderBy, setOrderBy] = useState("created_at");
  const [orderDirection, setOrderDirection] = useState("desc");
  const [perPage, setPerPage] = useState(10);
  const [selectedClient, setSelectedClient] = useState(null);

  const { data, isLoading, error, refetch } = useGetClientsListQuery({
    keyword,
    status,
    email_verified_at: emailVerified,
    role,
    order_by: orderBy,
    order_direction: orderDirection,
    per_page: perPage,
    page,
  });

  const [updateClientInfo] = useUpdateClientInfoMutation();
  const [softDeleteClient] = useSoftDeleteClientMutation();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication and role
  }, [auth, navigate]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setSelectedClient(null);
    setModalOpen(false);
  };

  const handleEdit = (client) => {
    setSelectedClient(client);
    openModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await softDeleteClient(id).unwrap();
        toast.success("Client soft deleted successfully!");
        refetch();
      } catch (err) {
        toast.error("Failed to delete client.");
      }
    }
  };

  const handleSubmitEdit = async (updatedClient) => {
    try {
      const res = await updateClientInfo({
        id: selectedClient.id,
        data: updatedClient, // Send the entire updatedClient object
      }).unwrap();
      toast.success(res?.message || "Client updated successfully!");
      closeModal();
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update client.");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading clients: {error.message}</p>;

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:justify-between mb-4">
        <Input
          placeholder="Search by keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="mb-2 md:mb-0 md:w-1/3"
        />
      </div>

      <ClientsTable data={data} onEdit={handleEdit} onDelete={handleDelete} />

      <div className="flex justify-end mt-4">
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="mr-2"
        >
          Previous
        </Button>
        <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
      </div>

      {selectedClient && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Edit Client">
          <EditClientForm client={selectedClient} onSubmit={handleSubmitEdit} />
        </Modal>
      )}
    </div>
  );
};

export default ClientsListPage;
