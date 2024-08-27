import PropTypes from 'prop-types';
import InputField from '../../Atoms/InputField/InputField';
import SelectField from '../../Atoms/SelectField/SelectField'; // Create this component
import CustomButton from '../../Atoms/CustomButton/CustomButton';

// function EditUserForm({ name, setName, email, setEmail, role, setRole, status, setStatus, errors, handleSubmit, isLoading }) {
  function EditUserForm({ user,onSubmit }) {
    
  const roles = ['admin', 'client', 'service_provider'];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-gray-300 rounded-lg shadow-md">
      <InputField
        label="Name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />
      <InputField
        label="Email"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        disabled // Email should not be editable
      />
      <SelectField
        label="Role"
        id="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        options={roles.map(role => ({ value: role, label: role }))}
        error={errors.role}
      />
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="status">
          Status
        </label>
        <select
          id="status"
          className={`w-full p-2 border border-gray-300 rounded ${errors.status ? 'border-red-500' : ''}`}
          value={status}
          onChange={(e) => setStatus(e.target.checked)}
        >
          <option value={true}>Active</option>
          <option value={false}>Inactive</option>
        </select>
        {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
      </div>
      <CustomButton label="Save Changes" isLoading={isLoading} />
    </form>
  );
}

EditUserForm.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  setRole: PropTypes.func.isRequired,
  status: PropTypes.bool.isRequired,
  setStatus: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    status: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default EditUserForm;
