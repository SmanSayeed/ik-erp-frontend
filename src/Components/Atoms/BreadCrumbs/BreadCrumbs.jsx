
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BreadCrumbs = () => {
  const location = useLocation();

  // Split the pathname into an array of path segments, filtering out empty segments
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Function to check if a path segment is dynamic (e.g., user-profile/:id)
  const isDynamicSegment = (segment) => /^\d+$/.test(segment); // Adjust this logic based on your dynamic segment pattern (e.g., IDs are numbers)

  return (
    <nav className="flex text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {/* <li className="inline-flex items-center">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
        </li> */}
        {pathnames.map((value, index) => {
          // Reconstruct the URL for this breadcrumb segment
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          // If this is the last segment, or if it's dynamic, don't make it a link
          const isLast = index === pathnames.length - 1;
          const isDynamic = isDynamicSegment(value);

          return (
            <li key={to} className="inline-flex items-center">
              {index>0 &&<span className="mx-2">/</span>}
              {isLast || isDynamic ? (
                <span className="text-gray-500 capitalize">{value}</span>
              ) : (
                <Link
                  to={to}
                  className="text-gray-600 hover:text-gray-900 capitalize"
                >
                  {value}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
