const { DataTypes } = require('sequelize');
const sq = require('../config/connection');

const masterUser = sq.define('masterUser', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(50)
    },
    password: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    emailToken:{
        type:DataTypes.STRING
    },
    isVerified:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    }


},
    {
        paranoid: true,
        freezeTableName: true
    });


module.exports = masterUser