const os = require('os');

module.exports = {
  env: 'localhost',

  /**
   * PostgreSQL configuration for Sequelize.
   * More info: https://sequelize.org/v5/manual/getting-started.html#setting-up-a-connection
   */
  // database: {
  //   username: 'postgres',
  //   dialect: 'postgres',
  //   password: '',
  //   database: 'development',
  //   host: 'localhost',
  //   logging: console.log,
  // },

  /**
   * MySQL configuration for Sequelize.
   * More info: https://sequelize.org/v5/manual/getting-started.html#setting-up-a-connection
   */

  database: {
    username: 'e3tgvs3anc6afyys',
    dialect: 'mysql',
    password: 'hbe29w1dw42x68zk',
    database: 'c1of6exzcl4rorpe',
    host: 'spvunyfm598dw67v.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    logging: console.log,
  },

  /**
   * Secret used to Sign the JWT (Authentication) tokens.
   */
  authJwtSecret: '<place a generated random value here>',

  /**
   * Directory where uploaded files are saved.
   * Default to temp.
   */
  uploadDir: os.tmpdir(),

  /**
   * Configuration to allow email sending used on:
   * backend/src/services/shared/email/emailSender.js
   *
   * More info: https://nodemailer.com
   */
  email: {
    from: '<insert your email here>',
    host: null,
    auth: {
      user: null,
      pass: null,
    },
  },

  /**
   * Client URL used when sending emails.
   */
  clientUrl: '<insert client url here>',

  /**
   * When this email is set, all requests will automatically authenticate using this email.
   * Useful for testing purposes.
   */
  userAutoAuthenticatedEmailForTests:
    '<insert your email here>',
};
