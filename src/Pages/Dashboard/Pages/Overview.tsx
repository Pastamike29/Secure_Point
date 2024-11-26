import React, { useEffect, useState } from 'react';
import {
     LineChart,
     Line,
     BarChart,
     Bar,
     PieChart,
     Pie,
     Cell,
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
     Grid,
     MenuItem,
     Select,
     FormControl,
     InputLabel,
} from '@mui/material';
import DashboardLayout from '../Components/DashboardLayout';
import BarCharts from '../Components/BarCharts';
import LineCharts from '../Components/LineCharts';
import TotalsNumberFetch from '../../HomePage/Components/TotalsNumberFetch';
import axios from 'axios';

// Data for pie chart
const pieDataOptions = {
     option1: [
          { name: 'Broken Access Control', value: 290 },
          { name: 'SQL Injection', value: 120 },
          { name: 'Command Injection', value: 2340 },
          { name: 'Cross Site Request Forgery', value: 3232 },
          { name: 'Session Fixation', value: 3232 },
     ],
     option2: [
          { name: 'SQL Injection', value: 600 },
          { name: 'Directory Traversal', value: 200 },
          { name: 'Cross Site Request Forgery', value: 100 },
          { name: 'File Upload Vulnerability', value: 300 },
          { name: 'Priviledge Escalation', value: 30 },
     ],
     option3: [
          { name: 'Priviledge Escalation', value: 500 },
          { name: 'User Enumeration', value: 10 },
          { name: 'SQL Injection', value: 5 },
          { name: 'Broken Access Control', value: 200 },
          { name: 'Unencrypted Data', value: 200 },
     ],
     option4: [
          { name: 'Broken Access Control', value: 20 },
          { name: 'Command Injection', value: 100 },
          { name: 'Directory Traversal', value: 100 },
          { name: 'User Enumeration', value: 20 },
          { name: 'Weak Session', value: 20 },
     ],
};

// Dashboard component with cards and charts
export default function Overview() {

     const [riskRatings, setRiskRatings] = useState({
          total: 0,
          critical: 0,
          high: 0,
          medium: 0,
          low: 0,
        });
      
     const [selectedOption, setSelectedOption] = useState('option1');

     useEffect(() => {
          async function fetchRiskRatings() {
            try {
              const response = await axios.get("http://localhost:5000/getRiskRating");
        
              // Assuming response.data looks like:
              // { "Critical": 1, "High": 31, "Medium": 187, "Low": 140 }
              
              const riskData = response.data;
              const total = riskData.Critical + riskData.High + riskData.Medium + riskData.Low;
        
              // Set the state with the calculated total and other risk levels
              setRiskRatings({
                total: total,
                critical: riskData.Critical,
                high: riskData.High,
                medium: riskData.Medium,
                low: riskData.Low,
              });
            } catch (error) {
              console.error("Error fetching risk ratings:", error);
            }
          }
        
          fetchRiskRatings();
        }, []);
        
      
        return (
          <DashboardLayout title="Dashboard Overview">
            <Grid container spacing={3.5}>
              {/* First row: Total Vulnerabilities, Total App */}
              <Grid item xs={12} md={8}>
                <Grid container spacing={3.5}>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Total Vulnerabilities
                        </Typography>
                        <Typography variant="h4">{riskRatings.total || "Loading..."}</Typography>
                        </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Total Application Scanned
                        </Typography>
                        <Typography variant="h4">3,249</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
      
                {/* Second row */}
                <Grid item xs={12} sx={{ marginTop: 3.5 }}>
                  <Grid container spacing={3.5}>
                    <Grid item xs={12}>
                      <Card sx={{ height: "100%" }}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Top 5 Vulnerabilities
                          </Typography>
                          {/* Dropdown for selecting pie chart data */}
                          <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <Select
                              labelId="pie-chart-select-label"
                              value={selectedOption}
                              onChange={(e) => setSelectedOption(e.target.value)}
                            >
                              <MenuItem value="Critical">Critical</MenuItem>
                              <MenuItem value="High">High</MenuItem>
                              <MenuItem value="Medium">Medium</MenuItem>
                              <MenuItem value="Low">Low</MenuItem>
                            </Select>
                          </FormControl>
                          <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                              <Pie
                                data={[
                                  { name: "Critical", value: riskRatings.critical },
                                  { name: "High", value: riskRatings.high },
                                  { name: "Medium", value: riskRatings.medium },
                                  { name: "Low", value: riskRatings.low },
                                ]}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                fill="#8884d8"
                              >
                                {/* Randomized colors for each segment */}
                                {["#FF0000", "#FF4500", "#FFA500", "#00FF00"].map(
                                  (color, index) => (
                                    <Cell key={`cell-${index}`} fill={color} />
                                  )
                                )}
                              </Pie>
                              <Tooltip />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
      
              {/* Right side: Critical, High, Medium, Low */}
              <Grid item xs={12} md={4}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Critical
                    </Typography>
                    <Typography variant="h4">{riskRatings.critical}</Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      High
                    </Typography>
                    <Typography variant="h4">{riskRatings.high}</Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Medium
                    </Typography>
                    <Typography variant="h4">{riskRatings.medium}</Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Low
                    </Typography>
                    <Typography variant="h4">{riskRatings.low}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
      
            {/* Charts */}
            <Grid container spacing={4} sx={{ marginTop: 4 }}>
              <Grid item xs={12}>
                <LineCharts />
              </Grid>
              <Grid item xs={12}>
                <BarCharts />
              </Grid>
            </Grid>
          </DashboardLayout>
        );
      }