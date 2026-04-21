const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');
module.exports = function () {
  const users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },
    role_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: false,
    },
   
  }, {
    tableName: 'users',
  });

  users.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    // delete values.password;
    return values;
  };
  return users;
};
