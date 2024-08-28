// src/components/Filters/Filters.jsx
import React from 'react';
import CustomSelectInput from '../../Atoms/CustomSelectInput/CustomSelectInput';
const Filters = ({
  role,
  setRole,
  status,
  setStatus,
  emailVerified,
  setEmailVerified,
  orderBy,
  setOrderBy,
  orderDirection,
  setOrderDirection,
}) => {
  const roleOptions = [
    { value: '', label: 'Filter by Role' },
    { value: 'admin', label: 'Admin' },
    { value: 'client', label: 'Client' },
    { value: 'service_provider', label: 'Service Provider' },
  ];

  const statusOptions = [
    { value: '', label: 'Filter by Status' },
    { value: 'true', label: 'Active' },
    { value: 'false', label: 'Inactive' },
  ];

  const emailVerifiedOptions = [
    { value: '', label: 'Filter by Email Verified' },
    { value: 'true', label: 'Verified' },
    { value: 'false', label: 'Not Verified' },
    { value: '', label: 'No Preference' },
  ];

  const orderByOptions = [
    { value: 'created_at', label: 'Order by Created At' },
    { value: 'name', label: 'Order by Name' },
  ];

  const orderDirectionOptions = [
    { value: 'desc', label: 'Descending' },
    { value: 'asc', label: 'Ascending' },
  ];

  return (
    <div className="flex flex-col md:flex-row md:justify-between mb-4 space-y-2 md:space-y-0 md:space-x-2">
      <CustomSelectInput
        value={role}
        onChange={setRole}
        options={roleOptions}
        placeholder="Filter by Role"
      />

      <CustomSelectInput
        value={status}
        onChange={setStatus}
        options={statusOptions}
        placeholder="Filter by Status"
      />

      <CustomSelectInput
        value={emailVerified}
        onChange={setEmailVerified}
        options={emailVerifiedOptions}
        placeholder="Filter by Email Verified"
      />

      <CustomSelectInput
        value={orderBy}
        onChange={setOrderBy}
        options={orderByOptions}
        placeholder="Order by"
      />

      <CustomSelectInput
        value={orderDirection}
        onChange={setOrderDirection}
        options={orderDirectionOptions}
        placeholder="Direction"
      />
    </div>
  );
};

export default Filters;
