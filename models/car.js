module.exports = function(sequelize, DataTypes) {
    var Car = sequelize.define("Car", {
        vin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        make: {
            type: DataTypes.STRING,
            allowNull: false
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });

    Car.associate = function(models) {
        Car.belongsTo(models.Customer, {
            foreignKey: {
                allowNull: false
            }
        }),
        Car.hasMany(models.Service, {
            onDelete: "cascade"
        });
    };

    return Car;
}