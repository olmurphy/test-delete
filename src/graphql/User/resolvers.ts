import { addUser, deleteUser, getAllUsers, getUserById, updateUser } from "../../services/userService";
import { GenericResponse, Status } from "../types";
import { User } from "./types";

export const resolvers = {
    Query: {
        getAllUsers: (): GenericResponse<User[]> => getAllUsers(),
        getUserById: (_parent: unknown, args: { userId: string }): GenericResponse<User> => getUserById(args.userId)
    },

    Mutation: {
        updateUser: (_parent: unknown, args: { user: User }): GenericResponse<User> => updateUser(args.user),
        deleteUser: (_parent: unknown, args: { userId: string }): GenericResponse<string> => deleteUser(args.userId),
        addUser: (_parent: unknown, args: { user: User }): GenericResponse<User> => addUser(args.user)
    }
}