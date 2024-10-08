import PropTypes from 'prop-types';
import { Button } from '../../ui/button';

export default function CustomButton({
  type,
  label,
  isLoading,
  onClick,
  disabled
}) {
  return (
    <Button
    type={type}
    className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
    onClick={onClick}
    disabled={disabled || isLoading}>
 {isLoading ? 'Loading...' : label}
    </Button>
    // <button
    //   type={type}
    //   className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
    //   onClick={onClick}
    //   disabled={disabled || isLoading}
    // >
    //   {isLoading ? 'Loading...' : label}
    // </button>
  );
}

CustomButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

