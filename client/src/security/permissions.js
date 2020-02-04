import Roles from 'security/roles';
const roles = Roles.values;

class Permissions {
  static get values() {
    return {
      iamEdit: {
        id: 'iamEdit',
        allowedRoles: [
          roles.owner,
          roles.iamSecurityReviewer,
          roles.editor,
        ],
        allowedStorageFolders: ['user'],
      },
      iamCreate: {
        id: 'iamCreate',
        allowedRoles: [
          roles.owner,
          roles.iamSecurityReviewer,
          roles.editor,
        ],
      },
      iamImport: {
        id: 'iamImport',
        allowedRoles: [
          roles.owner,
          roles.iamSecurityReviewer,
          roles.editor,
        ],
      },
      iamRead: {
        id: 'iamRead',
        allowedRoles: [
          roles.owner,
          roles.iamSecurityReviewer,
          roles.editor,
          roles.viewer,
        ],
      },
      iamUserAutocomplete: {
        id: 'iamUserAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,


        ],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [roles.owner, roles.auditLogViewer, roles.viewer],
      },
      settingsEdit: {
        id: 'settingsEdit',
        allowedRoles: [roles.owner],
      },
      locationImport: {
        id: 'locationImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.locationEditor,
        ],
      },
      locationCreate: {
        id: 'locationCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.locationEditor,
        ],
        allowedStorageFolders: ['location'],
      },
      locationEdit: {
        id: 'locationEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.locationEditor,
        ],
        allowedStorageFolders: ['location'],
      },
      locationDestroy: {
        id: 'locationDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.locationEditor,
        ],
        allowedStorageFolders: ['location'],
      },
      locationRead: {
        id: 'locationRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.locationEditor,
          roles.locationViewer,
        ],
      },
      locationAutocomplete: {
        id: 'locationAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.locationEditor,
          roles.locationViewer,
          roles.productEditor,
          roles.productViewer,
        ],
      },

      productImport: {
        id: 'productImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.productEditor,
        ],
      },
      productCreate: {
        id: 'productCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.productEditor,
        ],
        allowedStorageFolders: ['product'],
      },
      productEdit: {
        id: 'productEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.productEditor,
        ],
        allowedStorageFolders: ['product'],
      },
      productDestroy: {
        id: 'productDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.productEditor,
        ],
        allowedStorageFolders: ['product'],
      },
      productRead: {
        id: 'productRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.productEditor,
          roles.productViewer,
        ],
      },
      productAutocomplete: {
        id: 'productAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.productEditor,
          roles.productViewer,

        ],
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

export default Permissions;
