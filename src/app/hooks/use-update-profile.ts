import { useTransition } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { updateUsername, updatePassword, setInitialPassword } from '@/app/libs/services/user/update-profile';
import useCurrentUser from '@/app/hooks/use-current-user';

type UpdateFunction = (data: any) => Promise<{ success: boolean; error?: string; message?: string }>;

interface UseProfileUpdateOptions {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export function useUpdateProfile(options: UseProfileUpdateOptions = {}) {
    const [isPending, startTransition] = useTransition();
    const { user, updateSession } = useCurrentUser();
    const { toast } = useToast();

    const handleUpdate = async (updateFn: UpdateFunction, data: any, successMessage: string) => {
        startTransition(async () => {
            try {
                const result = await updateFn(data);
                if (result.success) {
                    if (user) {
                        if ('username' in data) {
                            await updateSession({
                                username: data.username
                            });
                        }
                        if ('newPassword' in data) {
                            await updateSession({
                                hasPassword: true
                            });
                        }
                        toast({
                            title: "Mise à jour réussie",
                            description: successMessage,
                            duration: 3000,
                            variant: "success",
                            role: "status",
                        });
                    }
                    options.onSuccess?.();
                } else {
                    toast({
                        title: "Erreur",
                        description: result.error || "Une erreur est survenue lors de la mise à jour",
                        duration: 5000,
                        variant: "error",
                        role: "alert",
                    });
                    return;
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Une erreur inattendue est survenue";

                toast({
                    title: "Erreur",
                    description: errorMessage,
                    duration: 5000,
                    variant: "error",
                    role: "alert",
                });
                options.onError?.(errorMessage);
            }
        });
    };

    const updateUserUsername = async (data: { username: string }) => {
        await handleUpdate(
            (updateData) => updateUsername(updateData.username),
            data,
            "Votre nom d'utilisateur a été mis à jour avec succès."
        );
    };

    const updateUserPassword = async (data: { currentPassword?: string; newPassword: string }) => {
        const { currentPassword, newPassword } = data;
        if (user?.hasPassword) {
            if (!currentPassword) {
                toast({
                    title: "Erreur",
                    description: "Le mot de passe actuel est requis",
                    duration: 5000,
                    variant: "error",
                    role: "alert",
                });
                return;
            }

            await handleUpdate(
                (updateData) => updatePassword(updateData.currentPassword, updateData.newPassword),
                data,
                "Votre mot de passe a été mis à jour avec succès."
            );
        } else {
            await handleUpdate(
                (updateData) => setInitialPassword(updateData.newPassword),
                { newPassword },
                "Votre mot de passe a été défini avec succès."
            );
        }
    };

    return {
        isPending,
        updateUserUsername,
        updateUserPassword,
    };
}