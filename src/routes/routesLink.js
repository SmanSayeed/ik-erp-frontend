

const routes = {
  userDashboard: {
    link: '/user/dashboard',
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
  // -------------- User -----------------
  userDashboardProfile: {
    link: `/user/profile`,
    title: `User Profile`,
  },
  userDashboardEditProfile: {
    link: '/user/edit-profile',
    title: 'Edit Profile',
  },
  userDashboardResetPassword: {
    link: '/user/reset-password',
    title: 'Reset Password',
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
  adminDashboardUserProfile: (userId) => ({
    link: `/admin/users/${userId}`,
    title: `Admin User Profile ${userId}`,
  }),
  adminDashboardUsers: {
    link: '/admin/users',
    title: 'Users',
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
