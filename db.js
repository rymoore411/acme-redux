const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_redux_db');

const Product = conn.define('product', {

  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },

  name: Sequelize.STRING
});

const syncAndSeed = async ()=> {
  await conn.sync({force: true});
  await Product.create({name: 'Ryan'});
  await Product.create({name: 'Ted'});
}

module.exports = {
  syncAndSeed,
  models: {
    Product
  }
}
