import { cn } from "@/libs/utils/core/cn";

import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    // Ajoutez ici d'autres props spécifiques si nécessaire
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
    return (
        <div className="h-6 flex items-end">
            <div
                className={cn("animate-pulse rounded-md bg-muted", className)}
                {...props}
            />
        </div>
    );
};

// Ajout d'un commentaire pour l'accessibilité
// Ce composant Skeleton est utilisé pour indiquer le chargement du contenu.
// Il est important de fournir un texte alternatif ou un aria-label approprié
// lorsque ce composant est utilisé dans l'interface utilisateur.
