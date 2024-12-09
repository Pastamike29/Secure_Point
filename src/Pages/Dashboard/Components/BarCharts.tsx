import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material';


interface VulnerabilityData {
    month: string;
    totalFindings: number;
    year: number;
}

const BarCharts: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState<number>(2023);
    const [chartData, setChartData] = useState<any[]>([]);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const handleYearChange = (event: SelectChangeEvent<number>) => {
        setSelectedYear(Number(event.target.value));
    };


    useEffect(() => {
        const fetchData = async () => {
                const response = await axios.get('http://localhost:5000/getApplicationsByMonthYear');
                const data = response.data.data;

                const filteredData = data
                    .filter((item: VulnerabilityData) => item.year === selectedYear)
                    .map((item: VulnerabilityData) => ({
                        name: item.month,
                        vulnerabilities: item.totalFindings,
                    }));

                // Ensure chronological order by sorting
                filteredData.sort((a, b) => monthNames.indexOf(a.name) - monthNames.indexOf(b.name));

                setChartData(filteredData);
          
        };

        fetchData();
    }, [selectedYear]);

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Total Vulnerabilities
                </Typography>

                <Box sx={{ mb: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="select-year-label">Year</InputLabel>
                        <Select
                            labelId="select-year-label"
                            value={selectedYear} // Ensure this is a number
                            onChange={handleYearChange}
                            label="Year"
                        >
                            <MenuItem value={2023}>2023</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fill: "white" }} />
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
