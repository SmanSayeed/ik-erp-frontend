import React, { useEffect, useState } from "react";
import {
  useGetUsersQuery,
  useEditUserMutation,
  useDeleteUserMutation,
} from "../../../services/usersApi";
import { Table } from "@/components/ui/table";
import Modal from "../../ui/modal"; // Update import based on your actual modal path
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Adjust imports based on actual Shadcn UI components
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UsersListPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [emailVerified, setEmailVerified] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data, isLoading, error, refetch  } = useGetUsersQuery({
    keyword,
    status,
    email_verified_at: emailVerified,
    role,
    order_by: "name",
    order_direction: "asc",
    per_page: perPage,
    page,
  });

  const [editUser] = useEditUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  useEffect(() => {
    // if (!auth?.isAuthenticated || auth.user.role !== 'admin') {
    //  // navigate('/');
    //   // Redirect to login page if not authenticated or not an admin
    // }
  }, [auth, navigate]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  const handleEdit = (user) => {
    setSelectedUser(user);
    openModal(); // Open modal when editing
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted successfully!");
      refetch();
    } catch (err) {
      toast.error("Failed to delete user.");
    }
  };

  const handleSubmitEdit = async (updatedUser) => {
    try {
      await editUser({ id: selectedUser.id, data: updatedUser }).unwrap();
      toast.success("User updated successfully!");
      closeModal(); // Close modal after successful edit
    } catch (err) {
      toast.error("Failed to update user.");
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <Input
            placeholder="Search by keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          {/* Add more filters like Role, Status, etc. */}
        </div>

        <Table
          data={data?.data?.data}
          columns={["Name", "Email", "Role", "Status", "Actions"]}
        >
          {/* Render table rows */}
          <thead>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Email</td>
              <td>Role</td>
              <td>Status</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {data?.data?.data.map((user, index) => (
              <React.Fragment key={index}>
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.status ? "Active" : "Inactive"}</td>
                  <td>
                    <Button onClick={() => handleEdit(user)}>Edit</Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-end mt-4">
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
        </div>

        {/* Edit User Modal */}
        {selectedUser && (
          <Modal isOpen={isModalOpen} onClose={closeModal} title="Edit User">
            {/* Form for editing user */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const updatedUser = Object.fromEntries(formData.entries());
                handleSubmitEdit(updatedUser);
              }}
            >
              <Input name="name" defaultValue={selectedUser.name} />
              <Input name="email" defaultValue={selectedUser.email} />
              {/* Other fields... */}
              <Button type="submit">Save Changes</Button>
            </form>
          </Modal>
        )}
      </div>
    </>
  );
};

export default UsersListPage;
