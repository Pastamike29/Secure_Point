import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import DashboardLayout from '../../../Components/DashboardLayout'; // Import your DashboardLayout

// Define the type for a vulnerability
interface Vulnerability {
  vulnerabilityName: string;
  severity: string;
  input_date: string;
  expire_date: string;
  status: string;
}

const Issue1 = () => {
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]); // Explicitly define the type for state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Define the type of the error state

  // Fetch vulnerabilities from the API
  useEffect(() => {
    const fetchVulnerabilities = async () => {
      try {
        const response = await fetch('http://localhost:5000/application/vulnerabilities'); // Change to your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch vulnerabilities');
        }
        const data: Vulnerability[] = await response.json(); // Ensure the data has the correct type
        setVulnerabilities(data); // Set the fetched data to state
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchVulnerabilities();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <DashboardLayout title="Application 1">
      <Typography variant="h6" sx={{ mb: 2 }}>Vulnerabilities List</Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Vulnerability Name</strong></TableCell>
                <TableCell><strong>Severity</strong></TableCell>
                <TableCell><strong>Input Date</strong></TableCell>
                <TableCell><strong>Expire Date</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vulnerabilities.map((vuln, index) => (
                <TableRow key={index} sx={{ '&:hover': { backgroundColor: 'rgba(20, 50, 200, 0.4)' } }}>
                  <TableCell>{vuln.vulnerabilityName}</TableCell>
                  <TableCell>{vuln.severity}</TableCell>
                  <TableCell>{new Date(vuln.input_date).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(vuln.expire_date).toLocaleDateString()}</TableCell>
                  <TableCell>{vuln.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DashboardLayout>
  );
};

export default Issue1;
