export type User = {
    id: string;
    username: string | null;
    email: string | null;
    password: string;
    emailVerified: Date | null;
    image: string | null;
    role: UserRole
    isTwoFactorEnabled: boolean;
    hasPassword: boolean;
};

export type UserRole = "ADMIN" | "USER"
