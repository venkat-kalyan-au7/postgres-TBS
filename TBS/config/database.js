const Sequelize = require("sequelize");
import chalk from "chalk"
const sequelize = new Sequelize(
    'postgres://postgres:123456@localhost:5432/TBS')


sequelize.sync();

sequelize.authenticate().then(() => {
  console.log(chalk.bold.greenBright("Database connected succesfully"));
}).catch(err => console.log(`Error: ${err.message}`));

module.exports = sequelize;