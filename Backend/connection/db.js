const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    'ecommerce', 
    'root', 
    'temporal', 
    {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});


sequelize.authenticate()
 .then(() => { console.log('Conexión exitosa a la base de datos'); })
 .catch((error) => { console.log('Error de conexión: ', error); });

module.exports = sequelize;