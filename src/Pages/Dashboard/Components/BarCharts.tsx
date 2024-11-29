import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel, Box, SelectChangeEvent } from '@mui/material';
import axios from 'axios';

interface VulnerabilityData {
    month: string;
    totalFindings: number;
    year: number;
}

const BarCharts: React.FC = () => {
    // State to hold the selected year
    const [selectedYear, setSelectedYear] = useState<number>(2023);
    // State to hold the chart data
    const [chartData, setChartData] = useState<any[]>([]);

    // Array of month names in order for sorting purposes
    const monthNames = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];
    
    // Handle the year change from the dropdown
    const handleYearChange = (event: SelectChangeEvent<string | number>) => {
        setSelectedYear(Number(event.target.value));
    };

    // Fetch data from backend when component mounts or when year changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getApplicationsByMonthYear');
                const data = response.data.data;

                // Filter data based on the selected year
                const filteredData = data
                    .filter((item: VulnerabilityData) => item.year === selectedYear)
                    .map((item: VulnerabilityData) => ({
                        name: item.month, // Keep month name as is
                        vulnerabilities: item.totalFindings,
                    }));

                // Sort data by month in chronological order
                filteredData.sort((a, b) => monthNames.indexOf(a.name) - monthNames.indexOf(b.name));

                setChartData(filteredData);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, [selectedYear]); // Run fetch whenever selected year changes

    return (
        <Card sx={{ ml: 3.9 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Total Vulnerabilities
                </Typography>

                {/* Dropdown menu for selecting year */}
                <Box sx={{ mb: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="select-year-label">Year</InputLabel>
                        <Select
                            labelId="select-year-label"
                            value={selectedYear}
                            onChange={handleYearChange}
                            label="Year"
                        >
                            <MenuItem value={2023}>2023</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Chart to display vulnerabilities based on selected year */}
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="name" 
                            tick={{ fill: "white" }}  // Change the font color of month names to white
                        />
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
