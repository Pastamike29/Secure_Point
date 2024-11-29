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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getFindingIssuesGroupedByApplication');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Group the data by application name and aggregate vulnerabilities
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

        setApplications(groupedData); // Set the grouped data to the state
        setLoading(false);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError('Failed to fetch data: ' + err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  const handleRowClick = (applicationName: string) => {
    const encodedAppName = encodeURIComponent(applicationName); // Encode the application name
    navigate(`/ApplicationIssues/${encodedAppName}`);
  };

  // Calculate Total Applications Scanned and Total Findings
  const totalApplicationsScanned = applications.length;
  const totalFindings = applications.reduce((total, app) => total + app.Details["Total Vulnerabilities"], 0);

  return (
    <DashboardLayout>
      <Box sx={{ padding: '16px' }}>
        <Typography variant="h4" gutterBottom>
          Finding Issue Applications
        </Typography>

        {/* Total Applications Scanned and Total Findings */}
        <Box sx={{ marginBottom: '16px' }}>
          <Typography variant="h6">Total Applications Scanned: {totalApplicationsScanned}</Typography>
          <Typography variant="h6">Total Findings: {totalFindings}</Typography>
        </Box>

        {applications.length === 0 ? (
          <Typography>No applications available.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Application Name</TableCell>
                  <TableCell>Application Number</TableCell>
                  <TableCell>Application Contact</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Chief</TableCell>
                  <TableCell>Total Vulnerabilities</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications
                  .sort((a, b) =>
                    (a["Application Name"] || '').toLowerCase().localeCompare((b["Application Name"] || '').toLowerCase()) // Safely handle null/undefined
                  )
                  .map((app, index) => (
                    <TableRow
                      key={index}
                      hover
                      sx={{
                        cursor: 'pointer',
                        opacity: 1,
                        transition: 'opacity 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.08)',
                          opacity: 0.7,
                        },
                      }}
                      onClick={() => handleRowClick(app["Application Name"])}
                    >
                      <TableCell>{app["Application Name"] || 'N/A'}</TableCell>
                      <TableCell>{app.Details["Application Number"] || 'N/A'}</TableCell>
                      <TableCell>{app.Details["Application Contact"] || 'N/A'}</TableCell>
                      <TableCell>{app.Details.Department || 'N/A'}</TableCell>
                      <TableCell>{app.Details.Chief || 'N/A'}</TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 'bold',
                          color: app.Details["Total Vulnerabilities"] > 10 ? 'red' : 'inherit',
                        }}
                      >
                        {app.Details["Total Vulnerabilities"] ?? 'N/A'}
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
