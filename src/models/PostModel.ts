import * as Sequelize from 'sequelize'
import { BaseModelInterface } from '../interfaces/BaseModelInterface';
import { ModelsInterface } from '../interfaces/ModelsInterface';

//interface dos atributos
export interface PostAttributes {
    id?: number;
    title?: string;
    content?: string;
    photo?: string;
    author?: number; //no schema graphql vai ser um tipo User
    createdAt?: string;
    updatedAt?: string;
}

//interface da instancia
export interface PostInstance extends Sequelize.Instance<PostAttributes>{}

//o model implementa o base model e o sequelize, com a instancia e os atributos
export interface PostModel extends BaseModelInterface, Sequelize.Model<PostInstance, PostAttributes>{}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): PostModel => {
    const Post: PostModel = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        photo: {
            type: DataTypes.BLOB({
                length: 'long'
            }),
            allowNull: false
        } //não define os campos que são automáticos do sequelize
    }, {
        tableName: 'posts'
    });

    //associar com o user model
    Post.associate = (models: ModelsInterface): void => {
        //um post pertence a um usuário
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'author',
                name: 'author'
            }
        })
    }

    return Post;
}