const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Assessee = sequelize.define("Assessee", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  pan: { type: DataTypes.STRING, unique: true },
  dob: DataTypes.DATEONLY,
  mobile: DataTypes.STRING,
  email: DataTypes.STRING,
  password_enc: DataTypes.STRING, // encrypted
  user_id: DataTypes.UUID,
});

module.exports = Assessee;