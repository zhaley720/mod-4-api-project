'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: 'userId',});
      Booking.belongsTo(models.Spot, { foreignKey: 'spotId',});  
  
    }
  }
  Booking.init({
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        cannotBeBeforeNow(value) {
          if (value < new Date()) {
            throw new Error("startDate cannot be in the past");
          }
        },
      },
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        cannotBeBeforeStartDate(value) {
          if (value <= this.startDate) {
            throw new Error("endDate cannot be on or before startDate");
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Booking",
  }
);
return Booking;
};
