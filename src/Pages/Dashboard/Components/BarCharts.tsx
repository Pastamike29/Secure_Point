import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';
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
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
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

      filteredData.sort(
        (a, b) => monthNames.indexOf(a.name) - monthNames.indexOf(b.name)
      );

      setChartData(filteredData);
    };

    fetchData();
  }, [selectedYear]);

  return (
    <Card elevation={4} sx={{ borderRadius: 10, backgroundColor: '#121212', p: 3 }}>
      <CardContent>
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', mb: 3, color: '#ffffff' }}
        >
          Vulnerability Trends
        </Typography>

        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1" sx={{ color: '#bdbdbd' }}>
            Select a year to view data:
          </Typography>
          <FormControl variant="outlined" sx={{ minWidth: 150 }}>
            <InputLabel id="year-select-label" sx={{ color: '#bdbdbd' }}>Year</InputLabel>
            <Select
              labelId="year-select-label"
              value={selectedYear}
              onChange={handleYearChange}
              label="Year"
              sx={{ color: '#bdbdbd', '.MuiOutlinedInput-notchedOutline': { borderColor: '#bdbdbd' } }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: '#1e1e2f',
                    color: '#ffffff',
                  },
                },
              }}
            >
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2024}>2024</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2b2b3f" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: '#bdbdbd' }}
              axisLine={{ stroke: '#444444' }}
              tickLine={{ stroke: '#444444' }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#bdbdbd' }}
              axisLine={{ stroke: '#444444' }}
              tickLine={{ stroke: '#444444' }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e1e2f', borderRadius: 10, border: '1px solid #444', color: '#ffffff' }}
              cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: 10,
                color: '#bdbdbd',
                fontSize: 14,
              }}
            />
            <Bar
              dataKey="vulnerabilities"
              fill="url(#colorGradient)"
              barSize={40}
              radius={[8, 8, 0, 0]}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8e44ad" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#3498db" stopOpacity={0.8} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BarCharts;
