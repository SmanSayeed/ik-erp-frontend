// src/components/Atoms/SidebarImage.jsx

import PropTypes from 'prop-types';
function SidebarImage({ imageUrl }) {
  return (
    <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}>
      {/* Background image */}
    </div>
  );
}

SidebarImage.propTypes = {
    imageUrl: PropTypes.string.isRequired,
  };
export default SidebarImage;
