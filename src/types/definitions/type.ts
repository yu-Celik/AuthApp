export type FormState = {
    errors?: FormErrors
    success?: boolean | string
    user?: {
        id: string;
        username: string | null;
        email: string | null;
    };
    message?: string;
    _formErrors?: string[]
};

export type User = {
    id: string;
    username: string | null;
    email: string | null;
    password: string;
    emailVerified: Date | null;
    image: string | null;
    role: UserRole
};

export type UserRole = "ADMIN" | "USER"


export type FormErrors = {
    username?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
}
