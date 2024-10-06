export type FormState = {
    errors?: FormErrors
    success?: boolean | string
    twoFactorToken?: boolean
    user?: {
        id: string;
        username: string | null;
        email: string | null;
    };
    message?: string;
    _formErrors?: string[]
};

export type FormErrors = {
    username?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
    twoFactorCode?: string[];
}
