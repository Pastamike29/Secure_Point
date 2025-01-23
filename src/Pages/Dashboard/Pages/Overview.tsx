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
  Box,
  Divider,
} from '@mui/material';
import DashboardLayout from '../Components/DashboardLayout';
import BarCharts from '../Components/BarCharts';
import LineCharts from '../Components/LineCharts';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

interface TopIssue {
  findingCount: number;
  findingIssue: string;
}

interface Vulnerability {
  riskRating: string;
  topIssues: TopIssue[];
}

interface VulnerabilitiesData {
  data: Vulnerability[];
  status: string;
}

interface RiskRatingSummary {
  Critical: number;
  High: number;
  Medium: number;
  Low: number;
  Informative: number;
}

export default function Overview() {
  const [riskRatings, setRiskRatings] = useState<RiskRatingSummary>({
    Critical: 0,
    High: 0,
    Medium: 0,
    Low: 0,
    Informative: 0,
  });

  const [selectedOption, setSelectedOption] = useState('Critical');
  const [totalApplicationsScanned, setTotalApplicationsScanned] = useState(0);
  const [totalVulnerabilities, setTotalVulnerabilities] = useState(0);
  const navigate = useNavigate();

  const [vulnerabilitiesData, setVulnerabilitiesData] = useState<VulnerabilitiesData | null>(null);
  useEffect(() => {
    async function fetchTotalApplicationsScanned() {
      try {
        const response = await axios.get("http://localhost:5000/getTotalApplicationsScanned");
        setTotalApplicationsScanned(response.data.totalApplicationsScanned || 0);
      } catch (error) {
        console.error("Error fetching total applications scanned:", error);
      }
    }

    async function fetchTotalVulnerabilities() {
      try {
        const response = await axios.get('http://localhost:5000/getTotalFindings');
        const { totalFindings, riskRatingSummary } = response.data;
        setRiskRatings(riskRatingSummary);
        setTotalVulnerabilities(totalFindings);
      } catch (error) {
        console.error('Error fetching total findings:', error);
        setRiskRatings({
          Critical: 0,
          High: 0,
          Medium: 0,
          Low: 0,
          Informative: 0,
        });
        setTotalVulnerabilities(0);
      }
    }

    async function fetchVulnerabilities() {
      try {
        const response = await axios.get("http://localhost:5000/getTop5FindingIssuesByRiskRating");
        const data: VulnerabilitiesData = response.data;
        setVulnerabilitiesData(data);
      } catch (error) {
        console.error("Error fetching vulnerabilities:", error);
      }
    }

    fetchTotalApplicationsScanned();
    fetchVulnerabilities();
    fetchTotalVulnerabilities();
  }, []);

  const getPieData = (rating: string) => {
    const ratingData = vulnerabilitiesData?.data.find(
      (data) => data.riskRating.toLowerCase() === rating.toLowerCase()
    );
    return ratingData?.topIssues.map((vul) => ({
      name: vul.findingIssue,
      value: vul.findingCount,
    })) || [{ name: "No Data", value: 0 }];
  };

  return (
    <DashboardLayout title="FINDING ISSUE OVERVIEW">
      <Grid container spacing={4} >
        <Grid item xs={12} md={8}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Card elevation={3} sx={{ p: 2, borderRadius: 3, backgroundColor: '#2b2b3f' }}>
                <CardContent>
                  <Typography variant="h6" color="white" gutterBottom>
                    Total Applications Scanned
                  </Typography>
                  <Typography variant="h3" color="primary">
                    {totalApplicationsScanned || "Loading..."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  backgroundColor: '#2b2b3f',
                  color:'white',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
                onClick={() => navigate('/Overview/ApplicationIssues')}
              >
                <CardContent>
                  <Typography variant="h6" color="white" gutterBottom>
                    Total Vulnerabilities
                  </Typography>
                  <Typography variant="h3" color="secondary">
                    {totalVulnerabilities || "Loading..."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 4 }}>
            <Card elevation={3} sx={{ borderRadius: 3, backgroundColor: '#2b2b3f' }}>
              <CardContent>
                <Typography variant="h6" color="white" gutterBottom>
                  Top 5 Vulnerabilities
                </Typography>
                <Divider sx={{ my: 2, borderColor: '#444' }} />
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <Select
                    labelId="pie-chart-select-label"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    sx={{
                      color: '#ffffff',
                    }}
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
                      data={getPieData(selectedOption)}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {getPieData(selectedOption).map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={[
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#4BC0C0',
                          ][index % 4]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ borderRadius: 3, backgroundColor: '#2b2b3f', p: 2 }}>
            {['Critical', 'High', 'Medium', 'Low', 'Informative'].map((label, index) => {
              const bgColor = {
                Critical: '#FF6384',
                High: '#FF9F40',
                Medium: '#FFCD56',
                Low: '#4BC0C0',
                Informative: '#949494',
              }[label];

              return (
                <CardContent
                  key={index}
                  sx={{
                    backgroundColor: bgColor,
                    color: '#fff',
                    borderRadius: 2,
                    mb: 2,
                    p: 2,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  <Link
                    to={`ApplicationIssues/${label}Risk`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {label}
                    </Typography>
                    <Typography variant="h4">
                      {riskRatings[label as keyof RiskRatingSummary] || 0}
                    </Typography>
                  </Link>
                </CardContent>
              );
            })}
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mt: 4 }}>
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
