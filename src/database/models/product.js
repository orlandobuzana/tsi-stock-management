const moment = require('moment');

/**
 * Product database model.
 * See https://sequelize.org/v5/manual/models-definition.html to learn how to customize it.
 */
module.exports = function(sequelize, DataTypes) {
  const product = sequelize.define(
    'product',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      productName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      productDescription: {
        type: DataTypes.TEXT,
      },
      productNotes: {
        type: DataTypes.STRING(255),
        validate: {

        }
      },
      productQt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {

        }
      },
      productPrice: {
        type: DataTypes.DECIMAL,
      },
      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );

  product.associate = (models) => {
    models.product.belongsTo(models.location, {
      as: 'productLocation',
      constraints: false,
    });

    models.product.hasMany(models.file, {
      as: 'productImg',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.product.getTableName(),
        belongsToColumn: 'productImg',
      },
    });

    models.product.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.product.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return product;
};
