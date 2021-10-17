import * as Sequelize from "sequelize";
import { ModelsInterface } from "./ModelsInterface";

//como herda de models interface, a conexão vai vir com todos os atributos da classe
export interface DbConnection extends ModelsInterface {
    sequelize: Sequelize.Sequelize;
}