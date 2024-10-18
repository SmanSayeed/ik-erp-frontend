import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Add useNavigate for redirection
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Skeleton } from '../../ui/skeleton';
import { useGetChildClientProfileQuery  } from '../../../services/childClientsApi'; // Import the RTK query hook
import SellerProfileCard from '../SellerProfileCard/SellerProfileCard'; // Assuming you have a SellerProfileCard for seller info
import routes from '../../../routes/routes';
import { Button } from '../../ui/button';

const ChildClientProfile = () => {
  const { client_remotik_id, child_client_remotik_id } = useParams(); // Extracting route params
  const navigate = useNavigate(); // For redirection

  // Fetch profile data with RTK Query
  const { data, error, isLoading } = useGetChildClientProfileQuery({ client_remotik_id, child_client_remotik_id });
console.log('data >>>>>>>>',data);
  // Redirect to the create page if no profile is found
  useEffect(() => {
    if (!isLoading && !data?.data) {
    
      navigate(routes.ClientRegisterChildClientPage.link(client_remotik_id,child_client_remotik_id));
    }
  }, [isLoading, data, navigate, client_remotik_id, child_client_remotik_id]);

  if (isLoading) {
    return <Skeleton className="h-48" />;
  }

  if (error) {
    return <div>Error loading profile</div>;
  }

  const profileData = data?.data; // Assuming the profile data is under data.data

  return (
    <>
      <div className="max-w-lg mx-auto p-4 my-2">
        <div className='flex justify-between items-center my-6'>
        <h2 className="my-2 font-bold">Client Info</h2>
        <Link to={routes.updateChildClient.link(client_remotik_id,child_client_remotik_id)}>
        <Button>
        Update Profile
        </Button>
      
        </Link>
        </div>
    

        <Card>
          <CardHeader>
            <CardTitle>{profileData?.name}</CardTitle>
            <CardDescription>{profileData?.email || "Email not provided"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <p><strong>Address:</strong> {profileData?.address || 'N/A'}</p>
              <p><strong>Phone:</strong> {profileData?.phone || 'N/A'}</p>
              <p><strong>VIP Status:</strong> {profileData?.is_vip ? 'Yes' : 'No'}</p>
              <p><strong>VAT Slab:</strong> {profileData?.vat_slab || 'N/A'}</p>
              <p><strong>GBS Information:</strong> {profileData?.gbs_information || 'N/A'}</p>
              <p><strong>Status:</strong> {profileData?.status ? 'Active' : 'Inactive'}</p>
              <p><strong>Created At:</strong> {new Date(profileData?.created_at).toLocaleDateString()}</p>
              <p><strong>Updated At:</strong> {new Date(profileData?.updated_at).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    
    </>
  );
};

export default ChildClientProfile;
