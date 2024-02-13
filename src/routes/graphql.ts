import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { Router } from 'express';
import { resolvers, typeDefs } from "../graphql/index";

export const router = Router();

export type myContext = { [key: string]: string}

const localSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export type graphqlErrorFormat = {
    code?: string,
    message: string
}

export const apollo = new ApolloServer<myContext>({
    schema: localSchema,
    cache: 'bounded',
    introspection: true,
    formatError: error => {
        return {
            message: error.message,
            code: error.extensions?.code
        };
    }
});

const startServer = async () => {

    await apollo.start();

    router.use('/graphql', expressMiddleware(apollo));
};

startServer();
