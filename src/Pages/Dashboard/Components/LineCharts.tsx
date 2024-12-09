import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';

interface ApplicationData {
    month: string;
    totalApplicationsScanned: number;
    year: number;
}

const LineCharts: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState<number>(2023);
    const [chartData, setChartData] = useState<any[]>([]);

    // Map of month names to numbers (1 = January, 12 = December)
    const monthOrder: { [key: string]: number } = {
        "January": 1,
        "February": 2,
        "March": 3,
        "April": 4,
        "May": 5,
        "June": 6,
        "July": 7,
        "August": 8,
        "September": 9,
        "October": 10,
        "November": 11,
        "December": 12
    };

    // Fetch data from the backend based on selected year
    useEffect(() => {
        const fetchData = async () => {
                // Fetch data from the backend API
                const response = await axios.get('http://localhost:5000/getApplicationsByMonthYear');
                const data = response.data.data;

                // Filter data based on the selected year
                const filteredData = data
                    .filter((item: ApplicationData) => item.year === selectedYear)
                    .map((item: ApplicationData) => ({
                        name: item.month, // Keep month name as is
                        App: item.totalApplicationsScanned, // Map to the format used in the chart
                    }));

                // Sort the data by month order
                const sortedData = filteredData.sort((a, b) => monthOrder[a.name] - monthOrder[b.name]);

                setChartData(sortedData);
           
        };

        fetchData();
    }, [selectedYear]); // Run fetch whenever selected year changes

    // Handle the year change from the dropdown
    const handleYearChange = (event: SelectChangeEvent<unknown>) => {
        const year = Number(event.target.value); // Cast value to number
        setSelectedYear(year);
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Total Application Scanned
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

                {/* Line chart rendering the total applications scanned */}
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="name" 
                            tick={{ fill: "white" }}  // Change the font color of month names to white
                        />
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
