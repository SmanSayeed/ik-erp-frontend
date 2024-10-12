import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Skeleton } from '../../ui/skeleton';
import { useClientGetProfileQuery } from '../../../services/clientsApi';

export default function ClientProfile() {
  const { client } = useSelector((state) => state.auth); 
  const {seller} = useSelector((state) => state.auth);
  // Fetch profile data including seller info
  const { data, error, isLoading } = useClientGetProfileQuery();

  if (isLoading) {
    return <Skeleton className="h-48" />;
  }

  if (error) {
    return <div>Error loading profile</div>;
  }

  const profileData = data?.data?.client || client;
  const sellerData = seller;
  console.log("sellerData",sellerData);

  return (
    <>
      <div className="max-w-lg mx-auto p-4 my-2">
        <h2 className="my-2 font-bold">Client Info</h2>
        <Card>
          <CardHeader>
            <CardTitle>{profileData.name}</CardTitle>
            <CardDescription>{profileData.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <p><strong>Address:</strong> {profileData.address || 'N/A'}</p>
              <p><strong>Phone:</strong> {profileData.phone || 'N/A'}</p>
              <p><strong>VIP Status:</strong> {profileData.is_vip ? 'Yes' : 'No'}</p>
              <p><strong>VAT Slab:</strong> {profileData.vat_slab || 'N/A'}</p>
              <p><strong>GBS Information:</strong> {profileData.gbs_information || 'N/A'}</p>
              <p><strong>Status:</strong> {profileData.status ? 'Active' : 'Inactive'}</p>
              <p><strong>Created At:</strong> {new Date(profileData.created_at).toLocaleDateString()}</p>
              <p><strong>Updated At:</strong> {new Date(profileData.updated_at).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {client?.is_seller && (
        <div className="max-w-lg mx-auto p-4 my-2">
          <h2 className="my-2 font-bold">Client As Seller Info</h2>
          <Card>
            <CardHeader>
              <CardTitle>{sellerData.company_name}</CardTitle>
          
            </CardHeader>
            <CardContent>
              <div>
                <p><strong>Company Address:</strong> {sellerData.company_address || 'N/A'}</p>
                {/* <p><strong>Company Logo:</strong> {sellerData.company_logo || 'N/A'}</p> */}
                <p><strong>KVK Number:</strong> {sellerData.company_kvk_number || 'N/A'}</p>
                <p><strong>Status:</strong> {sellerData.status ? 'Active' : 'Inactive'}</p>
                <p><strong>Created At:</strong> {new Date(sellerData.created_at).toLocaleDateString()}</p>
                <p><strong>Updated At:</strong> {new Date(sellerData.updated_at).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
