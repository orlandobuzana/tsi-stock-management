const moment = require('moment');

/**
 * Location database model.
 * See https://sequelize.org/v5/manual/models-definition.html to learn how to customize it.
 */
module.exports = function(sequelize, DataTypes) {
  const location = sequelize.define(
    'location',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      locationName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      locationDescription: {
        type: DataTypes.TEXT,
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

  location.associate = (models) => {


    models.location.hasMany(models.file, {
      as: 'licationImg',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.location.getTableName(),
        belongsToColumn: 'licationImg',
      },
    });

    models.location.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.location.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return location;
};
