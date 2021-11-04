import { makeExecutableSchema } from "graphql-tools";
import { merge } from 'lodash';
import { Query } from "./query";
import { Mutation } from "./mutation";

import { userTypes } from "./resources/user/user.schema";
import { postTypes } from "./resources/post/post.schema";
import { commentTypes } from "./resources/comment/comment.schema";
import { commentResolvers } from "./resources/comment/comment.resolvers";
import { postResolvers } from "./resources/post/post.resolvers";
import { userResolvers } from "./resources/user/user.resolvers";

//junta os campos iguais de cada um dos arquivos mesclando-os
const resolvers = merge(
    commentResolvers,
    postResolvers,
    userResolvers
);

//criando schemas de forma modular
const SchemaDefinition = `
    type Schema {
        query: Query
        mutation: Mutation
    }
`;

export default makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        Query,
        Mutation,
        userTypes, //puxa os tipos do usuário
        postTypes,
        commentTypes
    ],
    resolvers
});