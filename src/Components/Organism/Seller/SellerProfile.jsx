import React from "react";
import { useSelector } from "react-redux";

import { Skeleton } from "../../ui/skeleton";
import { useClientGetProfileQuery } from "../../../services/clientsApi";
import SellerProfileCard from "../../Molecules/SellerProfileCard/SellerProfileCard";
import ChildClients from "../../Molecules/ChildClients/ChildClients";
import StyledLink from "../../Atoms/StyledLink/StyledLink";
import routes from "../../../routes/routes";
import { Button } from "../../ui/button";
export default function SellerProfile() {
  const { client } = useSelector((state) => state.auth);
  const { seller } = useSelector((state) => state.auth);
  console.log('client', client);
  // Fetch profile data including seller info
  const { data, error, isLoading } = useClientGetProfileQuery();

  if (isLoading) {
    return <Skeleton className="h-48" />;
  }

  if (error) {
    return <div>Error loading profile</div>;
  }

  const sellerData = seller;

  return (
    <>
      {client?.is_seller ?
         (
            <>
              <SellerProfileCard sellerData={sellerData} />
              <ChildClients client_remotik_id={client.client_remotik_id} />
            </>

          )
          :
          (
            <StyledLink to={routes.ClientBecomeASeller.link}>
              <Button>
              Become a seller
              </Button>
         
          </StyledLink>
          )
        }
    </>
  );
}
