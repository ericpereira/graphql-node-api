import { makeExecutableSchema } from "graphql-tools"

const users: any[] = [
    {
        id: 1,
        name: 'Eric Pereira',
        email: 'eric.pereira@hotmail.com'
    },
    {
        id: 2,
        name: 'Everton Assis',
        email: 'ericiclone@gmail.com'
    }
]

/*User - id unico, name e email não nulos*/
const typeDefs = `
    type User {
        id: ID!
        name: String!
        email: String!
    }
    
    type Query {
        allUsers: [User!]!
    }

    type Mutation {
        createUser(name: String!, email: String!): User
    }
`
//resolvers dos campos
const resolvers = {
    Query: { //buscar no banco
        allUsers: () => users
    },
    Mutation: {
        createUser: (parent, args) => {
            //adicionar no banco
            const newUser = Object.assign({ id: users.length + 1 }, args)
            users.push(newUser)
            return newUser
        }
    }
}

export default makeExecutableSchema({typeDefs, resolvers})