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

interface ApplicationDetails {
  "Application Name": string;
  Details: {
    "Application Number": string;
    "Application Contact": string;
    Department: string;
    Chief: string;
  };
  "Finding Issues Count": number; // New field
}

interface RiskRatingGroup {
  _id: string; // Risk Rating
  applications: ApplicationDetails[];
  "Total Applications Scanned": number;
  "Total Findings": number; // New field for total findings
}

export default function HighRisk() {
  const [riskRatings, setRiskRatings] = useState<RiskRatingGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplicationsByRisk = async () => {
    try {
      const response = await fetch('http://localhost:5000/getApplicationByRiskRating');
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      const highRiskData = data.data.filter((item: RiskRatingGroup) => item._id === 'High');
      setRiskRatings(highRiskData);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicationsByRisk();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <DashboardLayout title="Finding Issues">
      <Box sx={{ padding: '16px' }}>
        {riskRatings.map((group) => (
          <Box key={group._id} sx={{ marginBottom: '24px' }}>
            <Typography variant="h5" sx={{ marginBottom: '12px', fontWeight: 'bold' }}>
              {group._id || 'Unknown Risk Rating'} Risk Applications
            </Typography>
            <Typography sx={{ my: '16px' }}>
              Total Applications Scanned: {group["Total Applications Scanned"] || 'N/A'}
            </Typography>
            <Typography sx={{ marginBottom: '16px' }}>
              Total Findings: {group["Total Findings"] || 'N/A'}
            </Typography>
            {group.applications.length === 0 ? (
              <Typography>No applications available for this risk rating.</Typography>
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
                      <TableCell>Total Finding Issues</TableCell> {/* New column */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {group.applications
                      .sort((a, b) => b["Finding Issues Count"] - a["Finding Issues Count"])
                      .map((app, index) => (
                        <TableRow key={index}>
                          <TableCell>{app["Application Name"] || 'N/A'}</TableCell>
                          <TableCell>{app.Details["Application Number"] || 'N/A'}</TableCell>
                          <TableCell>{app.Details["Application Contact"] || 'N/A'}</TableCell>
                          <TableCell>{app.Details.Department || 'N/A'}</TableCell>
                          <TableCell>{app.Details.Chief || 'N/A'}</TableCell>
                          <TableCell>{app["Finding Issues Count"] || 'N/A'}</TableCell> {/* Render new field */}
                        </TableRow>
                      ))}
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
