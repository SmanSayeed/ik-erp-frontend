

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
};

export default routes;