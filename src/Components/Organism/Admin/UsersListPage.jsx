import React, { useEffect, useState } from "react";
import {
  useGetUsersQuery,
  useEditUserMutation,
  useDeleteUserMutation,
} from "../../../services/usersApi";
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
  const [emailVerified, setEmailVerified] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data, isLoading, error, refetch } = useGetUsersQuery({
    keyword,
    status,
    email_verified_at: emailVerified,
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

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  useEffect(() => {
    // Check authentication and role
  }, [auth, navigate]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  const handleEdit = (user) => {
    setSelectedUser(user);
    openModal(); // Open modal when editing
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
            email_verified_at:'on'?true:false, 
            status:'on'?true:false 
        },
      }).unwrap();
      console.log("update res",res);
      toast.success(res?.message || "User updated successfully!");
      closeModal(); // Close modal after successful edit
      refetch(); // Refetch data after edit
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update user.");
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

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.data?.data.map((user, index) => (
                <tr key={user.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.status ? "Active" : "Inactive"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button onClick={() => handleEdit(user)} className="mr-2">Edit</Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={selectedUser.name}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                <Input
                  id="role"
                  name="role"
                  defaultValue={selectedUser.role}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Verified</label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="email_verified_at"
                    name="email_verified_at"
                    defaultChecked={selectedUser.email_verified_at}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="status"
                    name="status"
                    defaultChecked={selectedUser.status}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
              </div>
              <Button type="submit" className="mt-4">Save Changes</Button>
            </form>
          </Modal>
        )}
      </div>
    </>
  );
};

export default UsersListPage;
