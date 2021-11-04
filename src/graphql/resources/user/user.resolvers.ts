import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";
import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { UserInstance } from "../../../models/UserModel";
import { handleError } from "../../../utils/utils";

export const userResolvers = {
    User: { //implementa o resolver para o campo posts (resolver não trivial)
        posts: (user, { first = 10, offset = 0}, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
            return db.Post
                .findAll({
                    where: { author: user.get('id') }, //user.get('id') linguagem do sequelize, em outras seria user.id
                    limit: first,
                    offset: offset
                })
                .catch(handleError);
        },
    },

    Query: {
        users: (parent, { first = 10, offset = 0}, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
            //vai resolver essa query, faz o select e retorna a list de usuários
            //se tivesse trabalhando com mongo era só fazer a chamada aqui
            return db.User
                .findAll({
                    limit: first,
                    offset: offset
                })
                .catch(handleError);
        },

        user: (parent, {id}, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.User
                .findById(id)
                .then((user: UserInstance) => {
                    if(!user) throw new Error(`User with id ${id} not found!`);
                    return  user;
                })
                .catch(handleError);
        }
    },

    //precisa implementar todas as mutatiosn do arquito user.schema.ts
    Mutation: {
        createUser: (parent, {input}, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .create(input, { transaction: t });
            })
            .catch(handleError);
        },

        updateUser: (parent, {id, input}, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findById(id)
                    .then((user: UserInstance) => {
                        if(!user) throw new Error(`User with id ${id} not found!`);

                        return user.update(input, { transaction: t });
                    });
            })
            .catch(handleError);
        },

        updateUserPassword: (parent, {id, input}, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findById(id)
                    .then((user: UserInstance) => {
                        if(!user) throw new Error(`User with id ${id} not found!`);

                        return user.update(input, { transaction: t })
                            .then((user: UserInstance) => !!user); //retorna a negação da negação do valor truthy
                    });
            })
            .catch(handleError);
        },

        deleteUser: (parent, {id}, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findById(id)
                    .then((user: UserInstance) => {
                        if(!user) throw new Error(`User with id ${id} not found!`);

                        return user.destroy({transaction: t})
                            .then(user => !!user);
                    });
            })
            .catch(handleError);
        },
    }
};

//{db}: {db: DbConnection} - faz a desestruturação do
//terceiro argumento e diz q ele é do tipo DbConnection