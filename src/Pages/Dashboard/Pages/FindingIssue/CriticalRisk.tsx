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
} from '@mui/material';
import DashboardLayout from '../../Components/DashboardLayout';
import { useNavigate } from 'react-router-dom';

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

export default function CriticalRisk() {
  const [riskRatings, setRiskRatings] = useState<RiskRatingGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicationsByRisk = async () => {
      try {
        const response = await fetch('http://localhost:5000/getApplicationByRiskRating');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();

        console.log('API Response:', data); // Debugging the API response

        const criticalRiskData = data.data
          .filter((item: RiskRatingGroup) => item._id?.toLowerCase() === 'critical')
          .map((item) => ({
            ...item,
            "Total Findings": item.totalFindings,
            "Total Applications Scanned": item.applications.length,
          }));

        setRiskRatings(criticalRiskData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };


    fetchApplicationsByRisk();
  }, []);


  const handleRowClick = (applicationName: string) => {
    const encodedAppName = encodeURIComponent(applicationName);
    navigate(`/Overview/ApplicationIssues/${encodedAppName}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredApplications = riskRatings.map(group => ({
    ...group,
    applications: group.applications.filter(app => {
      const { applicationDetails } = app;
      return (
        (applicationDetails["Application Name"]?.toLowerCase() || '').includes(searchQuery) ||
        (applicationDetails["Application Number"]?.toLowerCase() || '').includes(searchQuery) ||
        (applicationDetails["Application Contact"]?.toLowerCase() || '').includes(searchQuery) ||
        (applicationDetails["Department"]?.toLowerCase() || '').includes(searchQuery) ||
        (applicationDetails["Chief"]?.toLowerCase() || '').includes(searchQuery)
      );
    })
  }));

  if (loading) {
    return <Typography align="center" variant="h6" sx={{ marginTop: '20px' }}>Loading...</Typography>;
  }

  if (error) {
    return <Typography align="center" color="error" variant="h6" sx={{ marginTop: '20px' }}>Error: {error}</Typography>;
  }

  return (
    <DashboardLayout title="Critical Risk Applications">
      <Box sx={{ padding: '32px', backgroundColor: '#333333', minHeight: '100vh' }}>
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card elevation={4} sx={{ p: 2, borderRadius: '12px', backgroundColor: '#424242' }}>
              <CardContent>
                <Typography variant="h6" color="textPrimary" sx={{ color: '#ffffff' }}>Total Applications Scanned</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#90caf9' }}>
                  {riskRatings[0]?.["Total Applications Scanned"] || 'N/A'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={4} sx={{ p: 2, borderRadius: '12px', backgroundColor: '#424242' }}>
              <CardContent>
                <Typography variant="h6" color="textPrimary" sx={{ color: '#ffffff' }}>Total Findings</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#e57373' }}>
                  {riskRatings[0]?.["Total Findings"] || 'N/A'}
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
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#ffffff' }}>Total Findings</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {group.applications.map((app, index) => (
                    <TableRow
                      key={index}
                      hover
                      sx={{
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                          backgroundColor: '#616161',
                        },
                      }}
                      onClick={() => handleRowClick(app.applicationName)}
                    >
                      <TableCell sx={{ color: '#ffffff' }}>{app.applicationDetails["Application Name"] || 'N/A'}</TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>{app.applicationDetails["Application Number"] || 'N/A'}</TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>{app.applicationDetails["Application Contact"] || 'N/A'}</TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>{app.applicationDetails.Department || 'N/A'}</TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>{app.applicationDetails.Chief || 'N/A'}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: app.totalFindings > 10 ? '#e57373' : '#81c784' }}>
                        {app.totalFindings || 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))}

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(-1)}
            sx={{ borderRadius: '8px', padding: '10px 20px' }}
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </DashboardLayout>
  );
}