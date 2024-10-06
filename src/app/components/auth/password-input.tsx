import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SignupFormSchema } from '@/app/libs/schemas/signup';
import { z } from 'zod';

interface PasswordInputProps {
    value: string;
    onChange: (value: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange }) => {
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

    const validatePassword = (password: string) => {
        try {
            SignupFormSchema.shape.password.parse(password);
            setPasswordErrors([]);
        } catch (e) {
            if (e instanceof z.ZodError) {
                setPasswordErrors(e.errors.map(error => error.message));
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
        validatePassword(newValue);
    };

    return (
        <>
            <Label htmlFor="password">Mot de passe</Label>
            <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                value={value}
                onChange={handleChange}
                aria-required="true"
            />
            {passwordErrors.length > 0 && (
                <ul className="text-sm text-red-500 list-disc list-inside" role="alert">
                    {passwordErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default PasswordInput;