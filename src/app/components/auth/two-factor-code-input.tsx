import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { cn } from "@/libs/utils/core/cn";
import { Dot } from 'lucide-react';
import { InputProps } from "@/components/ui/input";

export const TwoFactorCodeInput = forwardRef<HTMLInputElement, InputProps>(
    ({ onChange, value = '', className, ...props }, ref) => {
        const [code, setCode] = useState(value.toString().split('').slice(0, 6));
        const inputs = useRef<(HTMLInputElement | null)[]>([]);

        useEffect(() => {
            if (value) {
                setCode(value.toString().split('').slice(0, 6));
            }
        }, [value]);

        const handleChange = (index: number, inputValue: string) => {
            // Si le code est déjà complet (6 chiffres), ne rien faire
            if (code.join('').length === 6 && inputValue.length > 0) {
                return;
            }

            // N'accepter que les chiffres
            if (!/^\d*$/.test(inputValue)) return;

            const newCode = [...code];
            newCode[index] = inputValue;
            setCode(newCode);

            if (onChange) {
                const event = {
                    target: {
                        name: props.name,
                        value: newCode.join('')
                    }
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(event);
            }

            // Move to next input if current is filled
            if (inputValue && index < 5) {
                inputs.current[index + 1]?.focus();
            }
        };

        const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Backspace' && !code[index] && index > 0) {
                inputs.current[index - 1]?.focus();
            }
        };

        const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').slice(0, 6);
            const newCode = pastedData.split('').slice(0, 6);
            setCode(newCode);
            if (onChange) {
                const event = {
                    target: {
                        name: props.name,
                        value: newCode.join('')
                    }
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(event);
            }
            // Focus sur le dernier champ rempli ou le premier vide
            const lastFilledIndex = newCode.findIndex(val => !val) - 1;
            const focusIndex = lastFilledIndex >= 0 ? lastFilledIndex : 5;
            inputs.current[focusIndex]?.focus();
        };

        return (
            <div className="flex items-center gap-2">
                {[0, 1].map((groupIndex) => (
                    <React.Fragment key={groupIndex}>
                        <div className="flex gap-2 flex-1">
                            {[0, 1, 2].map((index) => {
                                const inputIndex = groupIndex * 3 + index;
                                return (
                                    <input
                                        key={inputIndex}
                                        ref={(el: HTMLInputElement | null) => {
                                            inputs.current[inputIndex] = el;
                                            if (inputIndex === 0) {
                                                if (typeof ref === 'function') {
                                                    ref(el);
                                                } else if (ref) {
                                                    ref.current = el;
                                                }
                                            }
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="\d*"
                                        maxLength={1}
                                        value={code[inputIndex] || ''}
                                        onChange={(e) => handleChange(inputIndex, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(inputIndex, e)}
                                        onPaste={handlePaste}
                                        className={cn(
                                            "w-full h-12 text-center text-lg border rounded-md",
                                            "focus:outline-none focus:ring-2 focus:ring-primary",
                                            "bg-background text-foreground",
                                            className
                                        )}
                                        {...props}
                                    />
                                );
                            })}
                        </div>
                        {groupIndex === 0 && <Dot size={24} className='text-muted-foreground' />}
                    </React.Fragment>
                ))}
            </div>
        );
    }
);

TwoFactorCodeInput.displayName = 'TwoFactorCodeInput';