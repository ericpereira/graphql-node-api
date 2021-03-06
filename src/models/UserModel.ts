import * as Sequelize from 'sequelize'
import { BaseModelInterface } from '../interfaces/BaseModelInterface'
import { genSaltSync, hashSync, compareSync } from 'bcryptjs'

export interface UserAttributes {
    id?: number
    name?: string
    email?: string
    password?: string
    photo?: string
    createdAt?: string
    updatedAt?: string
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
    isPassword(encodedPassword: string, password: string): boolean //verifica se o password passado é o persistido no banco
}

//define a interface utilizada no model
export interface UserModel extends BaseModelInterface, Sequelize.Model<UserInstance, UserAttributes> {}

//retorna o model
export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): UserModel => {
    const User: UserModel =
        sequelize.define('User', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(128),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(128),
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING(128),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            photo: {
                type: DataTypes.BLOB({
                    length: 'long'
                }),
                allowNull: true
            }
        }, {
            tableName: 'users',
            hooks: {
                beforeCreate: (user: UserInstance, options: Sequelize.CreateOptions): void => { //antes de salvar o usuário, encripta a senha
                    const salt = genSaltSync() //valor randomico adicionado ao hash da senha
                    user.password = hashSync(user.password, salt)
                },
                beforeUpdate: (user: UserInstance, options: Sequelize.CreateOptions): void => { //antes de atualizar o usuário
                    //caso o campo de password estiver sendo alterado
                    if(user.changed('password')){
                        const salt = genSaltSync() //valor randomico adicionado ao hash da senha
                        user.password = hashSync(user.password, salt)
                    }
                }
            }
        })
    
    //implementa a função passada no prototype
    User.prototype.isPassword = (encodedPassword: string, password: string): boolean => {
        return compareSync(password, encodedPassword)
    }
    return User
}