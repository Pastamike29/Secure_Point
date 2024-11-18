// TotalAppChart.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

const TotalAppData = [
    { name: 'Jan', App: 4000 },
    { name: 'Feb', App: 3000 },
    { name: 'Mar', App: 2000 },
    { name: 'Apr', App: 2780 },
    { name: 'May', App: 1890 },
    { name: 'Jun', App: 2390 },
    { name: 'Jul', App: 3490 },
    { name: 'Aug', App: 4200 },
    { name: 'Sep', App: 3900 },
    { name: 'Oct', App: 4100 },
    { name: 'Nov', App: 4500 },
    { name: 'Dec', App: 5000 },
];

const LineCharts: React.FC = () => {
    return (
        <Card sx={{ml:3.9}}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Total Application Scanned
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={TotalAppData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="App" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default LineCharts;

