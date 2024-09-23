import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface DashboardCardProps {
    title: string;
    content: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, content }) => {
    return (
        <Card>
            <CardHeader>
                <h3>{title}</h3>
            </CardHeader>
            <CardContent>
                <p>{content}</p>
            </CardContent>
        </Card>
    );
};

export default DashboardCard;