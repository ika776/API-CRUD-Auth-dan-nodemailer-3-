const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("freshvo", "postgres", "admin", {
    host: "localhost",
    port: 5432,
    dialect: 'postgres',
    logging:false,
    dialectOptions:{
      dateStrings: true,
      typeCast: true,
    },
    timezone: '+07:00'
  });

module.exports =  sequelize;