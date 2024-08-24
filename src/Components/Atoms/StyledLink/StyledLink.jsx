// src/components/Atoms/StyledLink.jsx
import { Link } from 'react-router-dom';

const StyledLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="text-blue-500 hover:text-blue-700 font-semibold transition-colors duration-300"
    >
      {children}
    </Link>
  );
};

export default StyledLink;
