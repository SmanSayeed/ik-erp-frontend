const routes = {
  dashboard: {
    link: '/dashboard',
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
  userDashboard: {
    link: '/user/dashboard',
    title: 'User Dashboard',
  },
  userDashboardProfile: (userId) => ({
    link: `/user/dashboard/profile/${userId}`,
    title: `User Profile ${userId}`,
  }),
  userDashboardEditProfile: {
    link: '/user/dashboard/edit-profile',
    title: 'Edit Profile',
  },
  userDashboardResetPassword: {
    link: '/user/dashboard/reset-password',
    title: 'Reset Password',
  },
  adminDashboard: {
    link: '/dashboard',
    title: 'Admin Dashboard',
  },
  adminDashboardProfile: (userId) => ({
    link: `/dashboard/profile/${userId}`,
    title: `Admin Profile ${userId}`,
  }),
  adminDashboardUserProfile: (userId) => ({
    link: `/dashboard/users/${userId}`,
    title: `Admin User Profile ${userId}`,
  }),
  adminDashboardUsers: {
    link: '/dashboard/users',
    title: 'Users',
  },
  adminDashboardEditProfile: {
    link: '/dashboard/edit-profile',
    title: 'Edit Profile',
  },
  adminDashboardResetPassword: {
    link: '/dashboard/reset-password',
    title: 'Reset Password',
  },
};

export default routes;
