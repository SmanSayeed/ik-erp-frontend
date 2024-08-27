import React, { useEffect, useState } from "react";
import { useGetUsersQuery, useEditUserMutation, useDeleteUserMutation } from "../../../services/usersApi";
import Modal from "../../ui/modal"; // Update import based on your actual modal path
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Adjust imports based on actual Shadcn UI components
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UsersTable from "../../Molecules/UsersTable/UsersTable";
import EditUserForm from "../../Molecules/EditUserForm/EditUserForm";

const UsersListPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data, isLoading, error, refetch } = useGetUsersQuery({
    keyword,
    status,
    // email_verified_at: emailVerified,
    role,
    order_by: "created_at",
    order_direction: "desc",
    per_page: perPage,
    page,
  });

  const [editUser] = useEditUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication and role
  }, [auth, navigate]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    openModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("User deleted successfully!");
        refetch(); // Refetch data after deletion
      } catch (err) {
        toast.error("Failed to delete user.");
      }
    }
  };

  const handleSubmitEdit = async (updatedUser) => {
    try {
      const { name, role, email_verified_at, status } = updatedUser;
      const res = await editUser({
        id: selectedUser.id,
        data: { 
            name, 
            role, 
            email_verified_at: email_verified_at === "on" ? true : false, 
            status: status === "on" ? true : false 
        },
      }).unwrap();
      toast.success(res?.message || "User updated successfully!");
      closeModal();
      refetch(); // Refetch data after edit
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update user.");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Search by keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        {/* Add more filters like Role, Status, etc. */}
      </div>

      <UsersTable data={data} onEdit={handleEdit} onDelete={handleDelete} />

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

      {selectedUser && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Edit User">
          <EditUserForm user={selectedUser} onSubmit={handleSubmitEdit} />
        </Modal>
      )}
    </div>
  );
};

export default UsersListPage;
