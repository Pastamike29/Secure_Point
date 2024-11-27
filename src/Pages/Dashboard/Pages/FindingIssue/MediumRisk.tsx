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
  "Finding Issues Count": number;
}

interface RiskRatingGroup {
  _id: string; // Risk Rating
  applications: ApplicationDetails[];
  "Total Applications Scanned": number;
  "Total Findings": number;
}

export default function MediumRisk() {
  const [riskRatings, setRiskRatings] = useState<RiskRatingGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplicationsByRisk = async () => {
    try {
      const response = await fetch('http://localhost:5000/getApplicationByRiskRating');
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      const mediumRiskData = data.data.filter((item: RiskRatingGroup) => item._id === 'Medium');
      setRiskRatings(mediumRiskData);
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
        {riskRatings.map((group) => (
          <Box key={group._id} sx={{ marginBottom: '24px' }}>
            <Typography variant="h5" sx={{ marginBottom: '12px', fontWeight: 'bold' }}>
              {group._id || 'Unknown Risk Rating'} Risk Applications
            </Typography>
            <Typography sx={{ marginBottom: '8px' }}>
              <strong>Total Applications Scanned:</strong> {group["Total Applications Scanned"] || 'N/A'}
            </Typography>
            <Typography sx={{ marginBottom: '16px' }}>
              <strong>Total Findings:</strong> {group["Total Findings"] || 'N/A'}
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
                      .sort((a, b) => b["Finding Issues Count"] - a["Finding Issues Count"])
                      .map((app, index) => (
                        <TableRow key={index}>
                          <TableCell>{app["Application Name"] || 'N/A'}</TableCell>
                          <TableCell>{app.Details["Application Number"] || 'N/A'}</TableCell>
                          <TableCell>{app.Details["Application Contact"] || 'N/A'}</TableCell>
                          <TableCell>{app.Details.Department || 'N/A'}</TableCell>
                          <TableCell>{app.Details.Chief || 'N/A'}</TableCell>
                          <TableCell>{app["Finding Issues Count"] || 'N/A'}</TableCell>
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
