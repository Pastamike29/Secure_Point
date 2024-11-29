import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DashboardLayout from '../../../Components/DashboardLayout';

interface FindingIssue {
  "Scope": string;
  "Finding Issue": string;
  "Description": string;
  "Recommendation": string;
  "Risk Rating": string;
  "Found Date": string;
  "Overdue Date": string;
  "Overdue": string;
  "Status": string;
}

export default function ApplicationIssues() {
  const { applicationName } = useParams(); // Get the application name from URL
  const [findingIssues, setFindingIssues] = useState<FindingIssue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFindingIssues = async () => {
      if (applicationName) {
        try {
          const response = await fetch(`http://localhost:5000/getFindingIssuesForApp/${applicationName}`);
          if (!response.ok) throw new Error('Failed to fetch finding issues');
          const data = await response.json();
          setFindingIssues(data.data || []);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Unknown error occurred');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFindingIssues();
  }, [applicationName]); // Refetch data if applicationName changes

  if (loading) {
    return <Typography align="center" variant="h6" sx={{ marginTop: '20px' }}>Loading...</Typography>;
  }

  if (error) {
    return <Typography align="center" color="error" variant="h6" sx={{ marginTop: '20px' }}>Error: {error}</Typography>;
  }

  if (findingIssues.length === 0) {
    return <Typography align="center" variant="h6" sx={{ marginTop: '20px' }}>No finding issues found for this application.</Typography>;
  }

  return (
    <DashboardLayout title="Finding Issues">
      <Box sx={{ padding: '16px' }}>
        <Typography variant="h5" sx={{ marginBottom: '16px' }}>
           Application {applicationName}
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Scope</strong></TableCell>
                <TableCell><strong>Finding Issue</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Recommendation</strong></TableCell>
                <TableCell><strong>Risk Rating</strong></TableCell>
                <TableCell><strong>Found Date</strong></TableCell>
                <TableCell><strong>Overdue Date</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {findingIssues.map((issue, index) => (
                <TableRow key={index}>
                  <TableCell>{issue.Scope}</TableCell>
                  <TableCell>{issue["Finding Issue"]}</TableCell>
                  <TableCell>{issue.Description}</TableCell>
                  <TableCell>{issue.Recommendation}</TableCell>
                  <TableCell>{issue["Risk Rating"]}</TableCell>
                  <TableCell>{issue["Found Date"]}</TableCell>
                  <TableCell>{issue["Overdue Date"]}</TableCell>
                  <TableCell>{issue.Status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </DashboardLayout>
  );
}
