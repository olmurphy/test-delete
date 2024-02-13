export type NewUser = {
    name: string;
    surname: string;
    email: string;
}

export type User = {
    userId: string
} & NewUser;