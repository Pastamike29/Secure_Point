import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Card, 
  CardContent, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Box 
} from '@mui/material';
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000/getApplicationsByMonthYear');
      const data = response.data.data;

      const filteredData = data
        .filter((item: ApplicationData) => item.year === selectedYear)
        .map((item: ApplicationData) => ({
          name: item.month,
          App: item.totalApplicationsScanned,
        }));

      const sortedData = filteredData.sort((a, b) => monthOrder[a.name] - monthOrder[b.name]);

      setChartData(sortedData);
    };

    fetchData();
  }, [selectedYear]);

  const handleYearChange = (event: SelectChangeEvent<unknown>) => {
    const year = Number(event.target.value);
    setSelectedYear(year);
  };

  return (
    <Card elevation={4} sx={{ borderRadius: 10, backgroundColor: '#121212', p: 3 }}>
      <CardContent>
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', mb: 3, color: '#ffffff' }}
        >
          Application Scanning Trends
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
          <LineChart
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
              cursor={{ stroke: '#8884d8', strokeWidth: 2 }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: 10,
                color: '#bdbdbd',
                fontSize: 14,
              }}
            />
            <Line
              type="monotone"
              dataKey="App"
              stroke="url(#colorGradient)"
              strokeWidth={3}
              dot={{ r: 5, fill: '#ffffff', stroke: '#8884d8', strokeWidth: 2 }}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8e44ad" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#3498db" stopOpacity={0.8} />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LineCharts;
