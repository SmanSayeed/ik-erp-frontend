import { useSelector } from 'react-redux';
import { useLazyGetSellerInfoQuery } from '@/services/clientsApi';
import { useEffect, useState } from 'react';

const useSellerData = (clientId) => {
  const seller = useSelector((state) => state.auth.seller);
  const [getSellerInfo, { data: fetchedSeller, isFetching, isError }] = useLazyGetSellerInfoQuery();
  const [sellerData, setSellerData] = useState(seller);

  useEffect(() => {
    if (!seller && clientId) {
      getSellerInfo(clientId);
    }
  }, [seller, clientId, getSellerInfo]);

  useEffect(() => {
    if (fetchedSeller) {
      setSellerData(fetchedSeller);
    }
  }, [fetchedSeller]);

  return { sellerData, isFetching, isError };
};

export default useSellerData;
