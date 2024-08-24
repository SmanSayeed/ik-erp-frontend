import PropTypes from 'prop-types';

export default function Button({
  type,
  label,
  isLoading,
  onClick,
  disabled
}) {
  return (
    <button
      type={type}
      className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? 'Loading...' : label}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  type: 'submit'
};