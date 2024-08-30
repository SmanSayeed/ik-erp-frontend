// src/Components/Organism/NotFoundPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error('404 not valid page'); 
  }, [navigate]);

  return <div>404 - Page Not Found</div>;
};

export default NotFoundPage;
