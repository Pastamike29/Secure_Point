import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, TextField } from '@mui/material';
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
  const [filteredApplications, setFilteredApplications] = useState<ApplicationDetails[]>([]);
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

      console.log(data); // Debug response data

      // Filter data for "Informative" risk group
      const informativeRiskData = data.data.filter((item: RiskRatingGroup) => item._id.toLowerCase() === 'informative');
      setRiskRatings(informativeRiskData);

      // Flatten the applications for easier search
      const allApplications = informativeRiskData.flatMap((group) =>
        group.applications.map((app) => app.applicationDetails)
      );
      setFilteredApplications(allApplications);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Filter applications based on search query
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter applications by checking if any field matches the search query
    const allApplications = riskRatings.flatMap((group) =>
      group.applications.map((app) => app.applicationDetails)
    );

    const filtered = allApplications.filter((app) =>
      Object.values(app).some((value) =>
        value && value.toString().toLowerCase().includes(query)
      )
    );

    setFilteredApplications(filtered);
  };

  useEffect(() => {
    fetchApplicationsByRisk();
  }, []);

  // Handle loading or error states
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

  // Navigate to the application details page
  const handleRowClick = (applicationName: string) => {
    const encodedAppName = encodeURIComponent(applicationName);
    navigate(`/Overview/ApplicationIssues/${encodedAppName}`);
  };

  return (
    <DashboardLayout title="Informative Risk Applications">
      <Box sx={{ padding: '16px' }}>
        {/* Title and Search Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Informative Risk Applications
          </Typography>
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ width: '300px' }}
          />
        </Box>

        {/* Results Table */}
        {filteredApplications.length === 0 ? (
          <Typography sx={{ marginTop: '16px' }}>
            No applications match your search query.
          </Typography>
        ) : (
          <TableContainer component={Paper} sx={{ marginTop: '24px' }}>
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
                {filteredApplications.map((app, index) => (
                  <TableRow
                    key={index}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleRowClick(app["Application Name"])}
                  >
                    <TableCell>{app["Application Name"] || 'N/A'}</TableCell>
                    <TableCell>{app["Application Number"] || 'N/A'}</TableCell>
                    <TableCell>{app["Application Contact"] || 'N/A'}</TableCell>
                    <TableCell>{app.Department || 'N/A'}</TableCell>
                    <TableCell>{app.Chief || 'N/A'}</TableCell>
                    <TableCell>{app["Finding Issues Count"] || '0'}</TableCell>
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
