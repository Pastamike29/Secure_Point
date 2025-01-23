import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TextField,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
} from '@mui/material';
import DashboardLayout from '../../Components/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

interface ApplicationDetails {
  "Application Name": string;
  "Application Number": string;
  "Application Contact": string;
  Department: string;
  Chief: string;
  "Finding Issues Count": number;
}

interface RiskRatingGroup {
  _id: string;
  applications: {
    applicationName: string;
    applicationDetails: ApplicationDetails;
    totalFindings: number;
  }[];
  totalFindings: number;
  "Total Findings": number;
  "Total Applications Scanned": number;
}

export default function LowRisk() {
  const [riskRatings, setRiskRatings] = useState<RiskRatingGroup[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<RiskRatingGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  const fetchApplicationsByRisk = async () => {
    try {
      const response = await fetch('http://localhost:5000/getApplicationByRiskRating');
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();

      const lowRiskData = data.data
        .filter((item: RiskRatingGroup) => item._id.toLowerCase() === 'low')
        .map((item) => ({
          ...item,
          "Total Applications Scanned": item.applications.length,
          "Total Findings": item.totalFindings,
        }));

      setRiskRatings(lowRiskData);
      setFilteredApplications(lowRiskData);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicationsByRisk();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredData = riskRatings.map((group) => ({
      ...group,
      applications: group.applications.filter((app) => {
        const { applicationDetails } = app;
        return (
          (applicationDetails["Application Name"]?.toLowerCase().includes(query)) ||
          (applicationDetails["Application Number"]?.toLowerCase().includes(query)) ||
          (applicationDetails["Application Contact"]?.toLowerCase().includes(query)) ||
          (applicationDetails["Department"]?.toLowerCase().includes(query)) ||
          (applicationDetails["Chief"]?.toLowerCase().includes(query))
        );
      }),
    }));

    setFilteredApplications(filteredData);
  };

  const handleRowClick = (applicationName: string) => {
    const encodedAppName = encodeURIComponent(applicationName);
    navigate(`/Overview/ApplicationIssues/${encodedAppName}`);
  };

  if (loading) {
    return <Typography align="center" variant="h6" sx={{ marginTop: '20px' }}>Loading...</Typography>;
  }

  if (error) {
    return <Typography align="center" color="error" variant="h6" sx={{ marginTop: '20px' }}>Error: {error}</Typography>;
  }

  return (
    <DashboardLayout title="Low Risk Applications">
      <Box sx={{ padding: '32px', backgroundColor: '#333333', minHeight: '100vh' }}>
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card elevation={4} sx={{ p: 2, borderRadius: '12px', backgroundColor: '#424242' }}>
              <CardContent>
                <Typography variant="h6" color="textPrimary" sx={{ color: '#ffffff' }}>
                  Total Applications Scanned
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#90caf9' }}>
                  {riskRatings.length > 0 ? riskRatings[0]["Total Applications Scanned"] || 'N/A' : 'N/A'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={4} sx={{ p: 2, borderRadius: '12px', backgroundColor: '#424242' }}>
              <CardContent>
                <Typography variant="h6" color="textPrimary" sx={{ color: '#ffffff' }}>
                  Total Findings
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#e57373' }}>
                  {riskRatings.length > 0 ? riskRatings[0]["Total Findings"] || 'N/A' : 'N/A'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mb: 4 }}>
          <TextField
            label="Search Applications"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              backgroundColor: '#424242',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#616161',
                },
                '&:hover fieldset': {
                  borderColor: '#90caf9',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1e88e5',
                },
              },
              input: { color: '#ffffff' },
              label: { color: '#ffffff' },
            }}
          />
        </Box>

        {filteredApplications.map((group) => (
          <Box key={group._id} sx={{ marginBottom: '24px' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
              {group._id.toUpperCase()} RISK APPLICATIONS
            </Typography>
            <TableContainer component={Paper} sx={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: '#424242', mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#616161' }}>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#ffffff' }}>Application Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#ffffff' }}>Application Number</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#ffffff' }}>Application Contact</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#ffffff' }}>Department</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#ffffff' }}>Chief</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#ffffff' }}>Total Finding Issues</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {group.applications.map((app, index) => {
                    const applicationDetails = app.applicationDetails;

                    return (
                      <TableRow
                        sx={{
                          cursor: 'pointer',
                          transition: 'background-color 0.3s ease',
                          '&:hover': {
                            backgroundColor: '#616161',
                          },
                        }}
                        key={app.applicationName + index}
                        onClick={() => handleRowClick(app.applicationName)}
                      >
                        <TableCell sx={{ color: '#ffffff' }}>{applicationDetails["Application Name"] || 'N/A'}</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>{applicationDetails["Application Number"] || 'N/A'}</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>{applicationDetails["Application Contact"] || 'N/A'}</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>{applicationDetails["Department"] || 'N/A'}</TableCell>
                        <TableCell sx={{ color: '#ffffff' }}>{applicationDetails["Chief"] || 'N/A'}</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: app.totalFindings > 10 ? '#e57373' : '#81c784' }}>
                          {app.totalFindings || 'N/A'}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))}
      </Box>
    </DashboardLayout>
  );
}
