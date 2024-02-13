import { GraphQLError } from 'graphql';
import { User, NewUser } from "../graphql/User/types";
import { GenericResponse } from "../graphql/types";
import { UserTable } from "../mock/users";
import { Status } from './../graphql/types';
import { v4 as uuidv4 } from 'uuid';

export function getAllUsers(): GenericResponse<User[]> {
    return {
        status: Status.success,
        data: UserTable
    };
}

export function getUserById(userId: string): GenericResponse<User> {
    const user: User | undefined = UserTable.find(user => user.userId = userId);

    if (!user) {
        throw new GraphQLError("Not Found");
    }

    return {
        status: Status.success,
        data: user
    };
}

export function updateUser(updatedUser: User): GenericResponse<User> {
    let user: User | undefined = UserTable.find(user => user.userId = updatedUser.userId);

    if (!user) {
        throw new GraphQLError("Not Found");
    }

    user = updatedUser;

    return {
        status: Status.success,
        data: user
    }
}

export function deleteUser(userId: string): GenericResponse<string> {
    const index = UserTable.findIndex(user => user.userId === userId);

    if (index === -1) {
        throw new GraphQLError("Not Found");
    }

    UserTable.splice(index, 1);

    return {
        status: Status.success,
        data: "successfully deleted"
    }
}

export function addUser(newUser: NewUser): GenericResponse<User> {
    const index = UserTable.findIndex(user => user.email === newUser.email);

    console.log(index);

    if (index !== -1) {
        throw new GraphQLError("Already Exists");
    }

    const userId = uuidv4();

    const addedUser = {
        userId,
        ...newUser
    }

    UserTable.push(addedUser);

    return {
        status: Status.success,
        data: addedUser
    }
}