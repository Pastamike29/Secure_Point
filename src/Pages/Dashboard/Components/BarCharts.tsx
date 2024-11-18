// TotalVulnerabilitiesChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

const VulnerabilityData = [
    { name: 'Jan', vulnerabilities: 240 },
    { name: 'Feb', vulnerabilities: 221 },
    { name: 'Mar', vulnerabilities: 229 },
    { name: 'Apr', vulnerabilities: 200 },
    { name: 'May', vulnerabilities: 218 },
    { name: 'Jun', vulnerabilities: 250 },
    { name: 'Jul', vulnerabilities: 210 },
    { name: 'Aug', vulnerabilities: 310 },
    { name: 'Sep', vulnerabilities: 400 },
    { name: 'Oct', vulnerabilities: 420 },
    { name: 'Nov', vulnerabilities: 400 },
    { name: 'Dec', vulnerabilities: 300 },
];

const BarCharts: React.FC = () => {
    return (
        <Card sx={{ml:3.9}}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Total Vulnerabilities
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={VulnerabilityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="vulnerabilities" fill="#82ca9d" barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default BarCharts;
