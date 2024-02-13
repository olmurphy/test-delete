import { merge } from "lodash";

// import all resolvers
import { resolvers as UserResolvers } from "./User/resolvers";
import { loadTypeDefsFromDir } from "../utilities/loadSchemas";

export const resolvers = merge({}, 
    UserResolvers,
);

export const typeDefs = [
    ...loadTypeDefsFromDir(__dirname) // import all typeDefs contained in *.graphql
]
