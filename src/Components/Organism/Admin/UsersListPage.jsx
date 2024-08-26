import React, { useEffect, useState } from 'react';
import { useGetUsersQuery, useEditUserMutation, useDeleteUserMutation } from '../../../services/usersApi';
import { Table } from "@/components/ui/table";
import Modal from '../../ui/modal';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";// Adjust imports based on actual Shadcn UI components
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UsersListPage = () => {
    const [isModalOpen, setModalOpen] = useState(false);

  
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [emailVerified, setEmailVerified] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data, isLoading, error } = useGetUsersQuery({
    keyword,
    status,
    email_verified_at: emailVerified,
    role,
    order_by: 'name',
    order_direction: 'asc',
    per_page: perPage,
    page,
  });

  const [editUser] = useEditUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setSelectedUser(null)
    setModalOpen(false);}

    useEffect(() => {
      console.log("data ",data);
    }, [data])
    


//   useEffect(() => {
//     if (!auth?.isAuthenticated || auth.user.role !== 'admin') {
//       navigate('/'); // Redirect to login page if not authenticated or not an admin
//     }
//   }, [auth, navigate]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;


  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      toast.success('User deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete user.');
    }
  };

  const handleSubmitEdit = async (updatedUser) => {
    try {
      await editUser({ id: selectedUser.id, data: updatedUser }).unwrap();
      toast.success('User updated successfully!');
      setSelectedUser(null); // Close modal
    } catch (err) {
      toast.error('Failed to update user.');
    }
  };

  return (
    <>
    
      <div className="p-4">
      <div className="flex justify-between mb-4">
        <Input placeholder="Search by keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        {/* Add more filters like Role, Status, etc. */}
      </div>

      <Table data={data?.data} columns={['Name', 'Email', 'Role', 'Status', 'Actions']}>
        {/* Render table rows */}
        {data?.data.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.status ? 'Active' : 'Inactive'}</td>
            <td>
              <Button onClick={() => handleEdit(user)}>Edit</Button>
              <Button variant="destructive" onClick={() => handleDelete(user.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </Table>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <Button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>Previous</Button>
        <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
      </div>

      {/* Edit User Modal */}
      {selectedUser && (
        <>
          <Modal isOpen={isModalOpen} onClose={closeModal} title="Edit User">
       {/* Form for editing user */}
       <form onSubmit={(e) => { e.preventDefault(); handleSubmitEdit(e.target.values); }}>
            <Input name="name" defaultValue={selectedUser.name} />
            <Input name="email" defaultValue={selectedUser.email} />
            {/* Other fields... */}
            <Button type="submit">Save Changes</Button>
          </form>
      </Modal>
        </>
      )}
    </div>
    </>
  
  );
};

export default UsersListPage;
