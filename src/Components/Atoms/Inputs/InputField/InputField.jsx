import PropTypes from 'prop-types';

function InputField({ label, id, type = 'text', value, onChange, onBlur, error }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={`w-full p-2 border border-gray-300 rounded ${error ? 'border-red-500' : ''}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string, // default is 'text', so not required
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    error: PropTypes.string,
  };
  

export default InputField;
