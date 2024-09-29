"use client"
import React, { useMemo } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/libs/utils/core/cn";
import { CheckCircle2, XCircle } from 'lucide-react';
import { passwordCriteria } from '@/app/libs/definitions/signup';

type MarginSize = 'none' | 'sm' | 'md' | 'lg';

type FormInputProps<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    helperText?: string;
    inputComponent?: React.ComponentType<InputProps>;
    margin?: MarginSize;
} & Omit<InputProps, 'name'>;

const marginClasses: Record<MarginSize, string> = {
    none: '',
    sm: 'mb-2',
    md: 'mb-4',
    lg: 'mb-6',
};

export const FormInput = <T extends FieldValues>({
    control,
    name,
    label,
    helperText,
    inputComponent: InputComponent = Input,
    margin = 'md',
    ...props
}: FormInputProps<T>) => {
    const { field, fieldState } = useController({ name, control });

    const validCriteria = useMemo(() =>
        name === 'password' ? passwordCriteria.map(criterion => criterion.test(field.value)) : []
        , [name, field.value]);


    return (
        <FormField
            control={control}
            name={name}
            render={() => (
                <FormItem className={cn('w-full', marginClasses[margin])}>
                    <FormLabel htmlFor={name}>{label}</FormLabel>
                    <FormControl>
                        <InputComponent
                            id={name}
                            aria-invalid={!!fieldState.error}
                            aria-describedby={`${name}-description ${name}-error`}
                            {...field}
                            {...props}
                        />
                    </FormControl>

                    {helperText && <FormDescription id={`${name}-description`}>{helperText}</FormDescription>}

                    {/* { Pour les critères de mot de passe pendant le signup } */}
                    {fieldState.error?.types?.custom && field.name !== 'confirmPassword' && (
                        <ul id={`${name}-criteria`} className="mt-2 font-medium space-y-1 text-muted-foreground text-sm">
                            {passwordCriteria.map((criterion, index) => (
                                <li key={index} className="flex items-center">
                                    {validCriteria[index] ? (
                                        <CheckCircle2 className="w-4 h-4 mr-2 text-accent" />
                                    ) : (
                                        <XCircle className="w-4 h-4 mr-2 text-destructive" />
                                    )}
                                    {criterion.label}
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* { Pour les erreurs de validation } */}
                    {!fieldState.error?.types?.custom && (
                        <FormMessage id={`${name}-error`} />
                    )}

                    {/* { Pour les erreurs de confirmation de mot de passe } */}
                    {field.name === 'confirmPassword' && (
                        <FormMessage id={`${name}-error`} />
                    )}



                </FormItem>
            )}
        />
    );
};