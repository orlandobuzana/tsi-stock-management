/**
 * List of Roles available for the Users.
 */
class Roles {
  static get values() {
    return {
      owner: 'owner',
      editor: 'editor',
      viewer: 'viewer',
      auditLogViewer: 'auditLogViewer',
      iamSecurityReviewer: 'iamSecurityReviewer',
      entityEditor: 'entityEditor',
      entityViewer: 'entityViewer',
      locationEditor: 'locationEditor',
      locationViewer: 'locationViewer',
      productEditor: 'productEditor',
      productViewer: 'productViewer',
    };
  }
}

module.exports = Roles;
