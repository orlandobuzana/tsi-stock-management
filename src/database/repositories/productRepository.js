const models = require('../models');
const SequelizeRepository = require('./sequelizeRepository');
const AuditLogRepository = require('./auditLogRepository');
const FileRepository = require('./fileRepository');
const lodash = require('lodash');
const SequelizeFilterUtils = require('../utils/sequelizeFilterUtils');

const Sequelize = models.Sequelize;
const Op = Sequelize.Op;

/**
 * Handles database operations for the Product.
 * See https://sequelize.org/v5/index.html to learn how to customize it.
 */
class ProductRepository {
  /**
   * Creates the Product.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  async create(data, options) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const record = await models.product.create(
      {
        ...lodash.pick(data, [
          'id',
          'productName',
          'productDescription',
          'productNotes',
          'productQt',
          'productPrice',
          'importHash',
          'updatedAt',
          'createdAt',
        ]),
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      {
        transaction,
      },
    );

    await record.setProductLocation(data.productLocation || null, {
      transaction,
    });

    await FileRepository.replaceRelationFiles(
      {
        belongsTo: models.product.getTableName(),
        belongsToColumn: 'productImg',
        belongsToId: record.id,
      },
      data.productImg,
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  /**
   * Updates the Product.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  async update(id, data, options) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    let record = await models.product.findByPk(id, {
      transaction,
    });

    record = await record.update(
      {
        ...lodash.pick(data, [
          'id',
          'productName',
          'productDescription',
          'productNotes',
          'productQt',
          'productPrice',
          'importHash',
          'updatedAt',
          'createdAt',
        ]),
        updatedById: currentUser.id,
      },
      {
        transaction,
      },
    );


    await record.setProductLocation(data.productLocation || null, {
      transaction,
    });

    await FileRepository.replaceRelationFiles(
      {
        belongsTo: models.product.getTableName(),
        belongsToColumn: 'productImg',
        belongsToId: record.id,
      },
      data.productImg,
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  /**
   * Deletes the Product.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async destroy(id, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    let record = await models.product.findByPk(id, {
      transaction,
    });

    await record.destroy({
      transaction,
    });

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      record,
      null,
      options,
    );
  }

  /**
   * Finds the Product and its relations.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  async findById(id, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const include = [
      {
        model: models.location,
        as: 'productLocation',
      },
    ];

    const record = await models.product.findByPk(id, {
      include,
      transaction,
    });

    return this._fillWithRelationsAndFiles(record, options);
  }

  /**
   * Counts the number of Products based on the filter.
   *
   * @param {Object} filter
   * @param {Object} [options]
   */
  async count(filter, options) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    return models.product.count(
      {
        where: filter,
      },
      {
        transaction,
      },
    );
  }

  /**
   * Finds the Products based on the query.
   * See https://sequelize.org/v5/manual/querying.html to learn how to
   * customize the query.
   *
   * @param {Object} query
   * @param {Object} query.filter
   * @param {number} query.limit
   * @param  {number} query.offset
   * @param  {string} query.orderBy
   * @param {Object} [options]
   *
   * @returns {Promise<Object>} response - Object containing the rows and the count.
   */
  async findAndCountAll(
    { filter, limit, offset, orderBy } = {
      filter: null,
      limit: 0,
      offset: 0,
      orderBy: null,
    },
    options,
  ) {
    let where = {};
    let include = [
      {
        model: models.location,
        as: 'productLocation',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: SequelizeFilterUtils.uuid(filter.id),
        };
      }

      if (filter.productLocation) {
        where = {
          ...where,
          ['productLocationId']: SequelizeFilterUtils.uuid(
            filter.productLocation,
          ),
        };
      }

      if (filter.productName) {
        where = {
          ...where,
          [Op.and]: SequelizeFilterUtils.ilike(
            'product',
            'productName',
            filter.productName,
          ),
        };
      }

      if (filter.productDescription) {
        where = {
          ...where,
          [Op.and]: SequelizeFilterUtils.ilike(
            'product',
            'productDescription',
            filter.productDescription,
          ),
        };
      }

      if (filter.productNotes) {
        where = {
          ...where,
          [Op.and]: SequelizeFilterUtils.ilike(
            'product',
            'productNotes',
            filter.productNotes,
          ),
        };
      }

      if (filter.productQtRange) {
        const [start, end] = filter.productQtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            productQt: {
              ...where.productQt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            productQt: {
              ...where.productQt,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.productPriceRange) {
        const [start, end] = filter.productPriceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            productPrice: {
              ...where.productPrice,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            productPrice: {
              ...where.productPrice,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let {
      rows,
      count,
    } = await models.product.findAndCountAll({
      where,
      include,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      order: orderBy
        ? [orderBy.split('_')]
        : [['createdAt', 'DESC']],
      transaction: SequelizeRepository.getTransaction(
        options,
      ),
    });

    rows = await this._fillWithRelationsAndFilesForRows(
      rows,
      options,
    );

    return { rows, count };
  }

  /**
   * Lists the Products to populate the autocomplete.
   * See https://sequelize.org/v5/manual/querying.html to learn how to
   * customize the query.
   *
   * @param {string} query
   * @param {number} limit
   */
  async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: SequelizeFilterUtils.uuid(query) },
          {
            [Op.and]: SequelizeFilterUtils.ilike(
              'product',
              'productName',
              query,
            ),
          },
        ],
      };
    }

    const records = await models.product.findAll({
      attributes: ['id', 'productName'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['productName', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.productName,
    }));
  }

  /**
   * Creates an audit log of the operation.
   *
   * @param {string} action - The action [create, update or delete].
   * @param {object} record - The sequelize record
   * @param {object} data - The new data passed on the request
   * @param {object} options
   */
  async _createAuditLog(action, record, data, options) {
    let values = {};

    if (data) {
      values = {
        ...record.get({ plain: true }),
        productImg: data.productImg,
      };
    }

    await AuditLogRepository.log(
      {
        entityName: 'product',
        entityId: record.id,
        action,
        values,
      },
      options,
    );
  }

  /**
   * Fills an array of Product with relations and files.
   *
   * @param {Array} rows
   * @param {Object} [options]
   */
  async _fillWithRelationsAndFilesForRows(rows, options) {
    if (!rows) {
      return rows;
    }

    return Promise.all(
      rows.map((record) =>
        this._fillWithRelationsAndFiles(record, options),
      ),
    );
  }

  /**
   * Fill the Product with the relations and files.
   *
   * @param {Object} record
   * @param {Object} [options]
   */
  async _fillWithRelationsAndFiles(record, options) {
    if (!record) {
      return record;
    }

    const output = record.get({ plain: true });

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    output.productImg = await record.getProductImg({
      transaction,
    });

    return output;
  }
}

module.exports = ProductRepository;
