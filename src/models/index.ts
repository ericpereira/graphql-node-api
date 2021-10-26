import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import { DbConnection } from '../interfaces/DbConnectionInterface';

//é necessário excluir o arquivo depois da leitura dos módulos
const basename: string = path.basename(module.filename);
const env: string = process.env.NODE_ENV || 'development';

//acessando o arquivo de configurações do sequelize
let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];
let db = null;

if(!db){
    db = {};

    //prepara a instância do sequelize
    const sequelize: Sequelize.Sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );

    fs
        .readdirSync(__dirname)
        .filter((file: string) => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        .forEach((file: string) => {
            //importar model do sequelize
            const model = sequelize.import(path.join(__dirname, file));
            db[model['name']] = model; //db.User = model
        });
    
    //carrega associações
    Object.keys(db).forEach((modelName: string) => {
        if(db[modelName].associate){
            db[modelName].associate(db);
        }
    });

    db['sequelize'] = sequelize; //sincroniza mysql com o sequelize
}

export default <DbConnection>db;