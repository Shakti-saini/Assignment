const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

module.exports = function () {
  const email_logs = sequelize.define('email_logs', {
    
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },

    to_emails: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    cc_emails: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    bcc_emails: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING(50), // SUCCESS / FAILED
      allowNull: false,
    },

    error_message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

  }, {
    tableName: 'email_logs',
    timestamps: true, // createdAt, updatedAt
  });

  email_logs.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
  };

  return email_logs;
};