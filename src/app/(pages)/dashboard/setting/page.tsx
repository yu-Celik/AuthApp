"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormInput } from "@/components/ui/form-input";
import { Form } from "@/components/ui/form";
import { SignupFormSchema } from "@/app/libs/schemas/signup";
import SubmitButton from "@/app/components/auth/submit-button";
import { useUpdateProfile } from "@/app/hooks/use-update-profile";
import useCurrentUser from "@/app/hooks/use-current-user";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const UsernameSchema = z.object({
    username: SignupFormSchema.shape.username,
});

const PasswordSchemaWithCurrent = z.object({
    currentPassword: SignupFormSchema.shape.password,
    newPassword: SignupFormSchema.shape.password,
    confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
});

const PasswordSchemaWithoutCurrent = z.object({
    newPassword: SignupFormSchema.shape.password,
    confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
});
function Page() {
    const { isOAuthUser, hasPassword } = useCurrentUser();
    const { toast } = useToast();
    const { isPending, updateUserUsername, updateUserPassword } = useUpdateProfile({
        onSuccess: () => {
            usernameForm.reset();
            passwordForm.reset();
            setIsConfirmDialogOpen(false);
        },
        onError: (error: any) => {
            toast({
                title: "Erreur",
                description: "Une erreur est survenue lors de la mise à jour du profil",
                duration: 5000,
                variant: "error",
                role: "alert",
            });
            setIsConfirmDialogOpen(false);
        }
    });

    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState<'username' | 'password' | null>(null);
    const [formData, setFormData] = useState<any>(null);

    const usernameForm = useForm({
        resolver: zodResolver(UsernameSchema),
        defaultValues: {
            username: "",
        },
        mode: "onBlur",
    });

    const passwordForm = useForm({
        resolver: zodResolver(isOAuthUser && !hasPassword ? PasswordSchemaWithoutCurrent : PasswordSchemaWithCurrent),
        defaultValues: isOAuthUser && !hasPassword
            ? { newPassword: "", confirmPassword: "" }
            : { currentPassword: "", newPassword: "", confirmPassword: "" },
        mode: "onBlur",
        criteriaMode: 'all'
    });

    const handleUsernameSubmit = (data: any) => {
        setCurrentAction('username');
        setFormData(data);
        setIsConfirmDialogOpen(true);
    };

    const handlePasswordSubmit = (data: any) => {
        setCurrentAction('password');
        setFormData(data);
        setIsConfirmDialogOpen(true);
    };

    const handleConfirm = async () => {
        if (currentAction === 'username') {
            await updateUserUsername(formData);
        } else if (currentAction === 'password') {
            if (isOAuthUser && !hasPassword) {
                // Pour les utilisateurs OAuth, nous n'avons pas besoin du mot de passe actuel
                await updateUserPassword({ newPassword: formData.newPassword });
            } else {
                await updateUserPassword(formData);
            }
        }
    };

    return (
        <>
            <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full md:max-w-[450px]">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                        Paramètres du compte
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="username" className="space-y-4">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="username">Nom d&apos;utilisateur</TabsTrigger>
                            <TabsTrigger value="password">Mot de passe</TabsTrigger>
                        </TabsList>
                        <TabsContent value="username">
                            <Form {...usernameForm}>
                                <form onSubmit={usernameForm.handleSubmit(handleUsernameSubmit)} className="space-y-4">
                                    <FormInput
                                        control={usernameForm.control}
                                        name="username"
                                        label="Nouveau nom d'utilisateur"
                                        placeholder="Entrez votre nouveau nom d'utilisateur"
                                        aria-required="true"
                                        autoComplete="username"
                                        margin="md"
                                    />
                                    <SubmitButton
                                        text="Mettre à jour le nom d'utilisateur"
                                        loadingText="Mise à jour..."
                                        isLoading={isPending}
                                    />
                                </form>
                            </Form>
                        </TabsContent>
                        <TabsContent value="password">
                            <Form {...passwordForm}>
                                <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
                                    {(!isOAuthUser || hasPassword) && (
                                        <FormInput
                                            control={passwordForm.control}
                                            name="currentPassword"
                                            label="Mot de passe actuel"
                                            type="password"
                                            placeholder="Entrez votre mot de passe actuel"
                                            aria-required="true"
                                            autoComplete="current-password"
                                            margin="md"
                                        />
                                    )}
                                    <FormInput
                                        control={passwordForm.control}
                                        name="newPassword"
                                        label="Nouveau mot de passe"
                                        type="password"
                                        placeholder="Entrez votre nouveau mot de passe"
                                        aria-required="true"
                                        autoComplete="new-password"
                                        margin="md"
                                    />
                                    <FormInput
                                        control={passwordForm.control}
                                        name="confirmPassword"
                                        label="Confirmer le nouveau mot de passe"
                                        type="password"
                                        placeholder="Confirmez votre nouveau mot de passe"
                                        aria-required="true"
                                        autoComplete="new-password"
                                        margin="md"
                                    />
                                    <SubmitButton
                                        text={hasPassword ? "Mettre à jour le mot de passe" : "Définir un mot de passe"}
                                        loadingText="Mise à jour..."
                                        isLoading={isPending}
                                    />
                                </form>
                            </Form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmer la mise à jour</DialogTitle>
                        <DialogDescription>
                            {currentAction === 'username'
                                ? "Êtes-vous sûr de vouloir mettre à jour votre nom d'utilisateur ?"
                                : "Êtes-vous sûr de vouloir mettre à jour votre mot de passe ?"}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>Annuler</Button>
                        <Button onClick={handleConfirm} disabled={isPending}>
                            {isPending ? "Mise à jour..." : "Confirmer"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Page;