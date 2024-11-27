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
import axios from 'axios';



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


export default function Overview() {
  const [riskRatings, setRiskRatings] = useState({
    total: 0,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
  });

  const [selectedOption, setSelectedOption] = useState('Critical');
  const [totalApplicationsScanned, setTotalApplicationsScanned] = useState(0);
  const [totalVulnerabilities, setTotalVulnerabilities] = useState(0);

  const [vulnerabilitiesData, setVulnerabilitiesData] = useState<VulnerabilitiesData | null>(null);

  useEffect(() => {
    async function fetchRiskRatings() {
      try {
        const response = await axios.get("http://localhost:5000/getRiskRating");

        // Assuming response.data looks like:
        // { "Critical": 1, "High": 31, "Medium": 187, "Low": 140 }

        const riskData = response.data;
        const total =
          riskData.Critical + riskData.High + riskData.Medium + riskData.Low;

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

    async function fetchTotalVulnerabilities() {
      try {
        const response = await axios.get("http://localhost:5000/getTotalFindings");

        // The response from getTotalFindings should look like:
        // { "totalFindings": 1103 }

        if (response.data && response.data.totalFindings !== undefined) {
          console.log("Total Vulnerabilities:", response.data.totalFindings);
          setTotalVulnerabilities(response.data.totalFindings); // Set the total vulnerabilities
        }
      } catch (error) {
        console.error("Error fetching total vulnerabilities:", error);
      }
    }
    async function fetchVulnerabilities() {
      try {
        const response = await axios.get("http://localhost:5000/getTop5FindingIssuesByRiskRating");
        console.log("Vulnerabilities Data Response:", response.data); // Log response
        const data: VulnerabilitiesData = response.data;
        setVulnerabilitiesData(data);
      } catch (error) {
        console.error("Error fetching vulnerabilities:", error);
      }
    }


    console.log("vulnerabilitiesData:", vulnerabilitiesData);

    fetchRiskRatings();
    fetchVulnerabilities();
    fetchTotalVulnerabilities();  // Fetch total vulnerabilities from getTotalFindings
  }, []);
  const getPieData = (rating: string) => {
    const ratingLower = rating.toLowerCase();
    console.log(`Fetching data for: ${ratingLower}`);

    // Check if vulnerabilitiesData is not null
    if (!vulnerabilitiesData) {
      console.error("No vulnerabilities data available");
      return [{ name: "No Data", value: 0 }];
    }

    // Now TypeScript knows that vulnerabilitiesData is not null, so it's safe to access its properties
    const ratingData = vulnerabilitiesData.data.find(
      (data) => data.riskRating.toLowerCase() === ratingLower
    );

    console.log("Rating Data:", ratingData);

    // Check if the ratingData exists and contains topIssues
    if (ratingData && ratingData.topIssues && ratingData.topIssues.length > 0) {
      return ratingData.topIssues.map((vul) => ({
        name: vul.findingIssue,
        value: vul.findingCount,
      }));
    }

    // Return a fallback "No Data" entry if no data found
    return [{ name: "No Data", value: 0 }];
  };



  return (
    <DashboardLayout title="Dashboard Overview">
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
                    {riskRatings.total || "Loading..."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
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
