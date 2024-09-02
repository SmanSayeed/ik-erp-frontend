import React from 'react';
import { useGetProfileQuery } from '../../../services/usersApi';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import {Skeleton} from '../../ui/skeleton';

export default function ClientProfile() {
  const { id } = useParams(); // Get the user ID from the URL (if viewing another user's profile)
  const { user } = useSelector((state) => state.auth); // Get the authenticated user's info

  const { data, error, isLoading } = useGetProfileQuery(id);

  if (isLoading) {
    return <Skeleton className="h-48" />;
  }

  if (error) {
    return <div>Error loading profile</div>;
  }

  const profileData = data?.data || user?.user;

  return (
    <div className="max-w-lg mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{profileData.name}</CardTitle>
          <CardDescription>{profileData.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p><strong>Role:</strong> {profileData.role}</p>
            <p><strong>Status:</strong> {profileData.status ? 'Active' : 'Inactive'}</p>
            <p><strong>Email Verified:</strong> {profileData.email_verified_at ? 'Yes' : 'No'}</p>
            <p><strong>Created At:</strong> {new Date(profileData.created_at).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
