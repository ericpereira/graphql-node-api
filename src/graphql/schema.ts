import { makeExecutableSchema } from "graphql-tools"
import { Query } from "./query";
import { Mutation } from "./mutation";

import { userTypes } from "./resources/user/user.schema";
import { postTypes } from "./resources/post/post.schema";
import { commentTypes } from "./resources/comment/comment.schema";

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
    ]
});