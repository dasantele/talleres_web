const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Client extends Model {}

Client.init(
  {
    mesage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ts: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "Client",
  }
);

Client.sync();

module.exports = Client;