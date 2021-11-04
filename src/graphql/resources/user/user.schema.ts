//tipos, querys e mutations pro recurso user
const userTypes = `
    # User definition type
    type User {
        #comment id
        id: ID!
        name: String!
        email: String!
        photo: String
        createdAt: String!
        updatedAt: String!
        posts(first: Int, offset: Int): [ Post! ]!
    }

    # Quando o usuário for criar uma conta, vai pedir esses campos
    input UserCreateInput {
        name: String!
        email: String!
        password: String!
    }

    # Quando o usuário for alterar a conta
    input UserUpdateInput {
        name: String!
        email: String!
        photo: String!
    }

    # Quando for atualizar a senha
    input UserUpdatePasswordInput {
        password: String!
    }
`;

const userQueries = `
    # Retorna uma lista de usuários não nula (limit e offset, paginação baseada em slice)
    users(first: Int, offset: Int): [ User! ]!
    user(id: ID!): User
`;

const userMutations = `
    # Recebe o parametro criado acima
    createUser(input: UserCreateInput!): User
    updateUser(id: ID!, input: UserUpdateInput!): User
    updateUserPassword(id: ID!, input: UserUpdatePasswordInput!): Boolean
    deleteUser(id: ID!): Boolean
`;

export {
    userTypes,
    userQueries,
    userMutations
}