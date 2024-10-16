

const routes = {
  ClientDashboard: {
    link: '/client/dashboard',
    title: 'Dashboard',
  },
  login: {
    link: '/login',
    title: 'Login',
  },
  register: {
    link: '/register',
    title: 'Register',
  },
  resetPasswordByEmail: {
    link: '/reset-password-by-email',
    title: 'Reset Password by Email',
  },
  forgotPassword: {
    link: '/forgot-password',
    title: 'Forgot Password',
  },
  verifyEmail: {
    link: '/verify-email',
    title: 'Verify Email',
  },
  // -------------- Client -----------------
  ClientDashboardProfile: {
    link: `/client/profile`,
    title: `Client Profile`,
  },
  ClientDashboardEditProfile: {
    link: '/client/edit-profile',
    title: 'Edit Profile',
  },
  ClientDashboardResetPassword: {
    link: '/client/reset-password',
    title: 'Reset Password',
  },
  ClientBecomeASeller:{
    link: '/client/become-seller',
    title: 'Become A Seller',
  },
  ClientSellerProfile:{
    link: '/client/seller-profile',
    title: 'Seller Profile',
  },
  ClientRegisterChildClientPage:{
    link: (client_remotik_id,child_client_remotik_id)=>`/client/create-child-client/${client_remotik_id}/${child_client_remotik_id}`,
    title: 'Seller Profile',
  },
  childClientProfile:{
    link: (client_remotik_id,child_client_remotik_id)=>`/client/child-client-profile/${client_remotik_id}/${child_client_remotik_id}`,
    title: 'Child Client Profile',
  },
  updateChildClient:{
    link: (client_remotik_id,child_client_remotik_id)=>`/client/update-child-client/${client_remotik_id}/${child_client_remotik_id}`,
    title: 'Update Child Client',
  },
  ClientInvoices:{
    link: (client_remotik_id)=>'/client/invoices/'+client_remotik_id,
    title: 'Invoices',
  },
  ClientCreateInvoice:{
    link:(client_remotik_id)=> '/client/create-invoice/'+client_remotik_id,
    title: 'Create Invoice',
  },
  ClientViewInvoice:{
    link: (invoice_id)=>'/client/view-invoice/'+invoice_id,
    title: 'View Invoice',
  },
  clientNodes:{
    link:(client_remotik_id)=>`/client/nodes/${client_remotik_id}`,
    title:' Nodes'
  },
  // --------------- Admin -----------------
  adminDashboard: {
    link: '/admin/dashboard',
    title: 'Admin Dashboard',
  },
  adminDashboardProfile: {
    link: `/admin/profile`,
    title: `Admin Profile`,
  },
  adminDashboardUserProfile: (clientId) => ({
    link: `/admin/users/${clientId}`,
    title: `Admin User Profile ${clientId}`,
  }),
  adminDashboardUsers: {
    link: '/admin/users',
    title: 'Users',
  },
  adminDashboardClientDevice: {
    link: '/admin/clients-devices',
    title: 'Clients Devices List',
  },
  adminDashboardClientProfile: (clientId) => ({
    link: `/admin/clients/${clientId}`,
    title: `Admin User Profile ${clientId}`,
  }),
  adminDashboardClients: {
    link: '/admin/clients',
    title: 'Clients',
  },
  adminDashboardEditProfile: {
    link: '/admin/edit-profile',
    title: 'Edit Profile',
  },
  adminDashboardResetPassword: {
    link: '/admin/reset-password',
    title: 'Reset Password',
  },
  deviceList:{
    link:'/admin/devices',
    title:'Device List'
  },
  adminInvoiceList:{
    link:'/admin/invoices',
    title:'Invoice List'
  },
  adminCreateInvoice:{
    link:'/admin/create-invoice',
    title:'Create Invoice'
  },
  adminEditInvoice:{
    link:(invoice_id)=>`/admin/edit-invoice/${invoice_id}`,
    title:'Edit Invoice'
  },
  adminViewInvoice:{
    link:(invoice_id)=>`/admin/view-invoice/${invoice_id}`,
    title:'View Invoice'
  },
  adminNodes:{
    link:`/admin/nodes`,
    title:' Nodes'
  },
};

export default routes;
