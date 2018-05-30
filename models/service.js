module.exports = function(sequelize, DataTypes) {
    var Service = sequelize.define("Service", {
        serviceType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mileage: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Service.associate = function(models) {
        Service.belongsTo(models.Car, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Service;
};