import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config';
const basename = path.basename(module.filename);
const db = {};
const { host, database, username, password } = config.mysql;
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'mysql',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',

  },
});

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
