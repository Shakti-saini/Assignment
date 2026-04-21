const { Sequelize } = require('sequelize');
const configs = require('../config');

let sequelize = null;

const dbRes = {
  sequelize: null,

  getContext: async function () {
    sequelize = new Sequelize(
      configs.db.database,
      configs.db.user,
      configs.db.password,
      {
        host: configs.db.db_host,
        port: configs.db.db_port,
        dialect: 'postgres',
        logging: false, // set true for SQL logs
        pool: {
          max: 7,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      }
    );

    try {
      await sequelize.authenticate();
      console.log('✅ Database connected successfully');
      this.sequelize = sequelize;
      return sequelize;
    } catch (error) {
      console.error('❌ Unable to connect:', error);
      throw error;
    }
  },

  destroyContext: async function () {
    if (sequelize) {
      await sequelize.close();
      console.log('🔌 Connection closed');
    }
  },
};

module.exports = dbRes;