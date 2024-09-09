import React, { useState } from "react";
import { useGetDevicesQuery, useCreateDeviceMutation, useUpdateDeviceMutation, useDeleteDeviceMutation } from "../../../services/deviceApi";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { toast } from "react-toastify";
import Modal from "../../ui/modal";
import DeviceTable from "../../Molecules/DeviceTable/DeviceTable";
import EditDeviceForm from "../../Molecules/EditDeviceForm/EditDeviceForm";
import CreateDeviceForm from "../../Molecules/CreateDeviceFrom/CreateDeviceFrom";

const DeviceList = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const { data, isLoading, error, refetch } = useGetDevicesQuery();
  const [createDevice] = useCreateDeviceMutation();
  const [updateDevice] = useUpdateDeviceMutation();
  const [deleteDevice] = useDeleteDeviceMutation();

  const openEditModal = (device) => {
    setSelectedDevice(device);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedDevice(null);
    setEditModalOpen(false);
  };

  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => setCreateModalOpen(false);

  const handleEdit = async (updatedDevice) => {
    try {
      const res = await updateDevice({
        id: selectedDevice.id,
        data: updatedDevice,
      }).unwrap();
      toast.success(res?.message || "Device updated successfully!");
      closeEditModal();
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update device.");
    }
  };

  const handleCreate = async (newDevice) => {
    try {
      const res = await createDevice(newDevice).unwrap();
      toast.success(res?.message || "Device created successfully!");
      closeCreateModal();
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create device.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this device?")) {
      try {
        await deleteDevice(id).unwrap();
        toast.success("Device deleted successfully!");
        refetch();
      } catch (err) {
        toast.error("Failed to delete device.");
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading devices: {error.message}</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <Input placeholder="Search by keyword" className="w-1/3" />
        <Button onClick={openCreateModal}>Add New Device</Button>
      </div>

      <DeviceTable data={data} onEdit={openEditModal} onDelete={handleDelete} />

      {selectedDevice && (
        <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Device">
          <EditDeviceForm device={selectedDevice} onSubmit={handleEdit} />
        </Modal>
      )}

      <Modal isOpen={isCreateModalOpen} onClose={closeCreateModal} title="Create Device">
        <CreateDeviceForm onSubmit={handleCreate} />
      </Modal>
    </div>
  );
};

export default DeviceList;
