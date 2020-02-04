import Permissions from 'security/permissions';
import { i18n } from 'i18n';
const permissions = Permissions.values;

const privateRoutes = [
  {
    path: '/',
    icon: 'home',
    label: i18n('home.menu'),
    menu: {
      exact: true,
    },
    loader: () => import('view/home/HomePage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/profile',
    loader: () => import('view/auth/ProfileFormPage'),
    permissionRequired: null,
    exact: true,
    menu: false,
  },

  {
    path: '/iam',
    loader: () => import('view/iam/list/IamPage'),
    permissionRequired: permissions.iamRead,
    exact: true,
    icon: 'user-add',
    label: i18n('iam.menu'),
    menu: true,
  },
  {
    path: '/iam/new',
    loader: () => import('view/iam/new/IamNewPage'),
    menu: false,
    permissionRequired: permissions.iamCreate,
    exact: true,
  },
  {
    path: '/iam/importer',
    loader: () =>
      import('view/iam/importer/IamImporterPage'),
    menu: false,
    permissionRequired: permissions.iamImport,
    exact: true,
  },
  {
    path: '/iam/:id/edit',
    loader: () => import('view/iam/edit/IamEditPage'),
    menu: false,
    permissionRequired: permissions.iamEdit,
    exact: true,
  },
  {
    path: '/iam/:id',
    loader: () => import('view/iam/view/IamViewPage'),
    menu: false,
    permissionRequired: permissions.iamRead,
    exact: true,
  },

  {
    path: '/audit-logs',
    icon: 'file-search',
    label: i18n('auditLog.menu'),
    loader: () => import('view/auditLog/AuditLogPage'),
    menu: true,
    permissionRequired: permissions.auditLogRead,
  },

  {
    path: '/settings',
    icon: 'setting',
    label: i18n('settings.menu'),
    loader: () => import('view/settings/SettingsFormPage'),
    permissionRequired: permissions.settingsEdit,
    menu: true,
  },

  {
    path: '/location',
    loader: () => import('view/location/list/LocationListPage'),
    permissionRequired: permissions.locationRead,
    exact: true,
    icon: 'right',
    label: i18n('entities.location.menu'),
    menu: true,
  },
  {
    path: '/location/new',
    loader: () => import('view/location/form/LocationFormPage'),
    menu: false,
    permissionRequired: permissions.locationCreate,
    exact: true,
  },
  {
    path: '/location/importer',
    loader: () =>
      import('view/location/importer/LocationImporterPage'),
    menu: false,
    permissionRequired: permissions.locationImport,
    exact: true,
  },
  {
    path: '/location/:id/edit',
    loader: () => import('view/location/form/LocationFormPage'),
    menu: false,
    permissionRequired: permissions.locationEdit,
    exact: true,
  },
  {
    path: '/location/:id',
    loader: () => import('view/location/view/LocationViewPage'),
    menu: false,
    permissionRequired: permissions.locationRead,
    exact: true,
  },

  {
    path: '/product',
    loader: () => import('view/product/list/ProductListPage'),
    permissionRequired: permissions.productRead,
    exact: true,
    icon: 'right',
    label: i18n('entities.product.menu'),
    menu: true,
  },
  {
    path: '/product/new',
    loader: () => import('view/product/form/ProductFormPage'),
    menu: false,
    permissionRequired: permissions.productCreate,
    exact: true,
  },
  {
    path: '/product/importer',
    loader: () =>
      import('view/product/importer/ProductImporterPage'),
    menu: false,
    permissionRequired: permissions.productImport,
    exact: true,
  },
  {
    path: '/product/:id/edit',
    loader: () => import('view/product/form/ProductFormPage'),
    menu: false,
    permissionRequired: permissions.productEdit,
    exact: true,
  },
  {
    path: '/product/:id',
    loader: () => import('view/product/view/ProductViewPage'),
    menu: false,
    permissionRequired: permissions.productRead,
    exact: true,
  },
];

const publicRoutes = [
  {
    path: '/auth/signin',
    loader: () => import('view/auth/SigninPage'),
  },
  {
    path: '/auth/signup',
    loader: () => import('view/auth/SignupPage'),
  },
  {
    path: '/auth/forgot-password',
    loader: () => import('view/auth/ForgotPasswordPage'),
  },
];

const emptyPermissionsRoutes = [
  {
    path: '/auth/empty-permissions',
    loader: () => import('view/auth/EmptyPermissionsPage'),
  },
];

const emailUnverifiedRoutes = [
  {
    path: '/auth/email-unverified',
    loader: () => import('view/auth/EmailUnverifiedPage'),
  },
];

const simpleRoutes = [
  {
    path: '/auth/password-reset',
    loader: () => import('view/auth/PasswordResetPage'),
  },
  {
    path: '/auth/verify-email',
    loader: () => import('view/auth/VerifyEmailPage'),
  },
  {
    path: '/403',
    loader: () => import('view/shared/errors/Error403Page'),
  },
  {
    path: '/500',
    loader: () => import('view/shared/errors/Error500Page'),
  },
  {
    path: '**',
    loader: () => import('view/shared/errors/Error404Page'),
  },
];

export default {
  privateRoutes,
  publicRoutes,
  emptyPermissionsRoutes,
  emailUnverifiedRoutes,
  simpleRoutes,
};
