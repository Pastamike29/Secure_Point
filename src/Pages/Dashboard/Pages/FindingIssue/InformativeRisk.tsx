import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
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

export default function InformativeRisk() {
  const [riskRatings, setRiskRatings] = useState<RiskRatingGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch data from the backend
  const fetchApplicationsByRisk = async () => {
    try {
      const response = await fetch('http://localhost:5000/getApplicationByRiskRating');
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();

      console.log(data); // Log the entire response data for debugging

      // Ensure that the response contains the expected structure
      const informativeRiskData = data.data.filter((item: RiskRatingGroup) => item._id.toLowerCase() === 'informative');
      setRiskRatings(informativeRiskData);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Run the fetch function once on component mount
  useEffect(() => {
    fetchApplicationsByRisk();
  }, []);

  // Loading or error state handling
  if (loading) {
    return (
      <Typography align="center" variant="h6" sx={{ marginTop: '20px' }}>
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography align="center" color="error" variant="h6" sx={{ marginTop: '20px' }}>
        Error: {error}
      </Typography>
    );
  }

  // Handle row click navigation
  const handleRowClick = (applicationName: string) => {
    const encodedAppName = encodeURIComponent(applicationName);
    navigate(`/Overview/ApplicationIssues/${encodedAppName}`);
  };

  return (
    <DashboardLayout title="Informative Risk Applications">
      <Box sx={{ padding: '16px' }}>
        {riskRatings.map((group) => (
          <Box key={group._id} sx={{ marginBottom: '24px' }}>
            <Typography variant="h5" sx={{ marginBottom: '12px', fontWeight: 'bold' }}>
              {group._id || 'Unknown Risk Rating'} Risk Applications
            </Typography>

            {/* Display total applications scanned and findings */}
            <Typography sx={{ marginBottom: '16px' }}>
              <strong>Total Applications Scanned:</strong> {group.applications.length || 'N/A'}
            </Typography>

            <Typography sx={{ marginBottom: '16px' }}>
              <strong>Total Findings:</strong> {group.totalFindings || 'N/A'}
            </Typography>

            {group.applications.length === 0 ? (
              <Typography>No applications available for this risk rating.</Typography>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Application Name</strong></TableCell>
                      <TableCell><strong>Application Number</strong></TableCell>
                      <TableCell><strong>Application Contact</strong></TableCell>
                      <TableCell><strong>Department</strong></TableCell>
                      <TableCell><strong>Chief</strong></TableCell>
                      <TableCell><strong>Total Finding Issues</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {group.applications
                      .sort((a, b) => b.totalFindings - a.totalFindings)
                      .map((app, index) => {
                        // Log each application to inspect its structure
                        console.log(app);

                        // Access applicationDetails (since it's nested in applications)
                        const applicationDetails = app.applicationDetails;

                        return (
                          <TableRow
                            sx={{
                              cursor: 'pointer',
                            }}
                            key={app.applicationName + index}
                            onClick={() => handleRowClick(app.applicationName)}
                          >
                            <TableCell>{applicationDetails["Application Name"] || 'N/A'}</TableCell>
                            <TableCell>{applicationDetails["Application Number"] || 'N/A'}</TableCell>
                            <TableCell>{applicationDetails["Application Contact"] || 'N/A'}</TableCell>
                            <TableCell>{applicationDetails["Department"] || 'N/A'}</TableCell>
                            <TableCell>{applicationDetails["Chief"] || 'N/A'}</TableCell>
                            <TableCell>
                              {app.totalFindings != null ? app.totalFindings : 'N/A'}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        ))}
      </Box>
    </DashboardLayout>
  );
}
