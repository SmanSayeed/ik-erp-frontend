import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';


export default function SellerProfileCard({sellerData}) {
  return (
    <>
     
        <div className="max-w-lg mx-auto p-4 my-2">
          <h2 className="my-2 font-bold">Seller Profile</h2>
          <Card>
            <CardHeader>
              <CardTitle>{sellerData.company_name}</CardTitle>
          
            </CardHeader>
            <CardContent>
              <div>
                <p><strong>Company Address:</strong> {sellerData.company_address || 'N/A'}</p>
                {/* <p><strong>Company Logo:</strong> {sellerData.company_logo || 'N/A'}</p> */}
                <p><strong>KVK Number:</strong> {sellerData.company_kvk_number || 'N/A'}</p>
                <p><strong>Iban Number:</strong> {sellerData.company_iban_number || 'N/A'}</p>
                <p><strong>Vat Number:</strong> {sellerData.company_vat_number || 'N/A'}</p>
                <p><strong>Status:</strong> {sellerData.status ? 'Active' : 'Inactive'}</p>
                <p><strong>Created At:</strong> {new Date(sellerData.created_at).toLocaleDateString()}</p>
                <p><strong>Updated At:</strong> {new Date(sellerData.updated_at).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      
    </>
  )
}
