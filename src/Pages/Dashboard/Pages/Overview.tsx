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



// Define the structure of the data returned by the API

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
        console.log('Total Findings API Response:', response.data);

        const { totalFindings, riskRatingSummary } = response.data;
        setRiskRatings(riskRatingSummary);
        setTotalVulnerabilities(totalFindings);
      } catch (error) {
        console.error('Error fetching total findings:', error);
        // Set default values if the fetch fails
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
        console.log("Vulnerabilities Data Response:", response.data); // Log the response
        const data: VulnerabilitiesData = response.data;
        setVulnerabilitiesData(data);
      } catch (error) {
        console.error("Error fetching vulnerabilities:", error);
      }
    }


    console.log("vulnerabilitiesData:", vulnerabilitiesData);

    fetchTotalApplicationsScanned();
    fetchVulnerabilities();
    fetchTotalVulnerabilities();  // Fetch total vulnerabilities from getTotalFindings
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
    <DashboardLayout title="Finding Issues Overview">
      <Grid container spacing={3.5}>
        {/* First row: Total Application Scanned */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3.5}>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total Application Scanned
                  </Typography>
                  <Typography variant="h4">
                    {totalApplicationsScanned || "Loading..."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
                onClick={() => navigate('/Overview/ApplicationIssues')}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total Vulnerabilities
                  </Typography>
                  <Typography variant="h4">
                    {totalVulnerabilities || "Loading..."} {/* Display total vulnerabilities */}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Second row: Pie Chart for Vulnerabilities */}
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
                    <ResponsiveContainer width="100%" height={320}>
                      <PieChart>
                        <Pie
                          data={getPieData(selectedOption)} // Ensure this returns the correct data
                          dataKey="value"
                          nameKey="name"
                          outerRadius={100}
                          fill="#8884d8"
                        >
                          {getPieData(selectedOption).length > 0 ? (
                            getPieData(selectedOption).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={["#FF0000", "#FF4500", "#FFA500", "#00FF00"][index]} />
                            ))
                          ) : (
                            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                              No Data Available
                            </text>
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

        {/* Right side: Critical, High, Medium, Low, Informative */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            {['Critical', 'High', 'Medium', 'Low', 'Informative'].map((label, index) => {
              const bgColor = {
                Critical: 'rgba(255, 0, 0, 0.1)',
                High: 'rgba(255, 69, 0, 0.1)',
                Medium: 'rgba(255, 165, 0, 0.1)',
                Low: 'rgba(0, 255, 0, 0.1)',
                Informative: 'rgba(128, 128, 128, 0.1)',
              }[label];

              const hoverBgColor = {
                Critical: 'rgba(255, 0, 0, 0.2)',
                High: 'rgba(255, 69, 0, 0.2)',
                Medium: 'rgba(255, 165, 0, 0.2)',
                Low: 'rgba(0, 255, 0, 0.2)',
                Informative: 'rgba(128, 128, 128, 0.2)',
              }[label];

              return (
                <CardContent
                  key={index}
                  sx={{
                    backgroundColor: bgColor,
                    borderRadius: '4px',
                    marginBottom: 1.2,
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: hoverBgColor,
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

      {/* Charts */}
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        <Grid item xs={12}>
          <LineCharts />
        </Grid>
        <Grid item xs={12}>
          <BarCharts />
        </Grid>
      </Grid>
    </DashboardLayout >
  );
}