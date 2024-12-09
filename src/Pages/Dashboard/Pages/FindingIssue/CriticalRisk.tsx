import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, TextField, IconButton } from '@mui/material';
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

export default function CriticalRisk() {
  const [riskRatings, setRiskRatings] = useState<RiskRatingGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const navigate = useNavigate();

  // Fetch data from the backend
  const fetchApplicationsByRisk = async () => {
    try {
      const response = await fetch('http://localhost:5000/getApplicationByRiskRating');
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      console.log(data); // Log the entire response data for debugging

      // Filter data to only include 'critical' risk
      const criticalRiskData = data.data.filter((item: RiskRatingGroup) => item._id.toLowerCase() === 'critical');
      setRiskRatings(criticalRiskData);
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

  // Handle row click navigation
  const handleRowClick = (applicationName: string) => {
    const encodedAppName = encodeURIComponent(applicationName);
    navigate(`/Overview/ApplicationIssues/${encodedAppName}`);
  };

  // Handle search bar input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Filtered applications based on search term
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

  return (
    <DashboardLayout title="Finding Issues">
      <Box sx={{ padding: '16px' }}>
        {/* Search bar at the top right */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ width: 300 }}
            InputProps={{
              endAdornment: (
                <IconButton sx={{ padding: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Box>

        {filteredApplications.map((group) => (
          <Box key={group._id} sx={{ marginBottom: '24px' }}>
            <Box sx={{ alignItems: 'center', mb: '24px' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {(group._id || 'Unknown Risk Rating').toUpperCase()} RISK APPLICATIONS
              </Typography>

              <Box sx={{ mt: 3, gap: '16px', alignItems: 'center' }}>
                <Typography>
                  <strong>Total Applications Scanned:</strong> {group.applications.length || 'N/A'}
                </Typography>
                <Typography>
                  <strong>Total Findings:</strong> {group.totalFindings || 'N/A'}
                </Typography>
              </Box>
            </Box>

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
                        const applicationDetails = app.applicationDetails;

                        return (
                          <TableRow
                            sx={{ cursor: 'pointer' }}
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
