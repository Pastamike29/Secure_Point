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
  Card,
  CardContent,
  Grid,
  Button
} from '@mui/material';
import DashboardLayout from '../../Components/DashboardLayout';
import { useNavigate } from 'react-router-dom';

interface ApplicationDetails {
  "Application Name": string;
  Details: {
    "Application Number": string;
    "Application Contact": string;
    Department: string;
    Chief: string;
    "Total Vulnerabilities": number;
  };
}

export default function ApplicationRiskTable() {
  const [applications, setApplications] = useState<ApplicationDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getFindingIssuesGroupedByApplication');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const groupedData = data.data.map((item: any) => ({
          "Application Name": item.applicationName || 'N/A',
          Details: {
            "Application Number": item.applicationNumber || 'N/A',
            "Application Contact": item.applicationContact || 'N/A',
            Department: item.department || 'N/A',
            Chief: item.chief || 'N/A',
            "Total Vulnerabilities": item.findingIssues.length,
          },
        }));

        setApplications(groupedData);
        setLoading(false);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError('Failed to fetch data: ' + err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  const handleRowClick = (applicationName: string) => {
    const encodedAppName = encodeURIComponent(applicationName);
    navigate(`/Overview/ApplicationIssues/${encodedAppName}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredApplications = applications.filter((app) => {
    const { "Application Name": appName, Details } = app;
    return (
      appName.toLowerCase().includes(searchQuery) ||
      Details["Application Number"].toLowerCase().includes(searchQuery) ||
      Details["Application Contact"].toLowerCase().includes(searchQuery) ||
      Details.Department.toLowerCase().includes(searchQuery) ||
      Details.Chief.toLowerCase().includes(searchQuery)
    );
  });

  const totalApplicationsScanned = filteredApplications.length;
  const totalFindings = filteredApplications.reduce(
    (total, app) => total + app.Details["Total Vulnerabilities"],
    0
  );

  return (
    <DashboardLayout title='Finding Issue Applications'>
      <Box>
        {/* Totals Section */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card elevation={4} sx={{ p: 2, borderRadius: '12px', backgroundColor: '#424242' }}>
              <CardContent>
                <Typography variant="h6" color="textPrimary" sx={{ color: '#ffffff' }}>
                  Total Applications Scanned
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#90caf9' }}>
                  {totalApplicationsScanned}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={4} sx={{ p: 2, borderRadius: '12px', backgroundColor: '#424242' }}>
              <CardContent>
                <Typography variant="h6" color="primary" sx={{ color: '#ffffff' }}>
                  Total Findings
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#e57373' }}>
                  {totalFindings}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>


        {/* Search and Table */}
        <Box sx={{ mb: 4 }}>
          <TextField
            label="Search Applications"
            variant="outlined"
            size="medium"
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

        {filteredApplications.length === 0 ? (
          <Typography sx={{ color: '#ffffff' }}>No applications match your search.</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: '#424242' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#616161' }}>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#ffffff' }}>Application Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#ffffff' }}>Application Number</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#ffffff' }}>Application Contact</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#ffffff' }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#ffffff' }}>Chief</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#ffffff' }}>Total Vulnerabilities</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredApplications.map((app, index) => (
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
                    onClick={() => handleRowClick(app["Application Name"])}
                  >
                    <TableCell sx={{ color: '#ffffff' }}>{app["Application Name"]}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{app.Details["Application Number"]}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{app.Details["Application Contact"]}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{app.Details.Department}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{app.Details.Chief}</TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 'bold',
                        color: app.Details["Total Vulnerabilities"] > 10 ? '#e57373' : '#81c784',
                      }}
                    >
                      {app.Details["Total Vulnerabilities"]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

      </Box>
    </DashboardLayout>
  );
}
