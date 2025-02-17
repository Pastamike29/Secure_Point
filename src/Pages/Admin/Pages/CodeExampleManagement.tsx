import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  InputAdornment,
} from '@mui/material';
import { UploadFile, Close, Edit, Delete, CloudDownload, Search } from '@mui/icons-material';
import AdminDashboardLayout from '../Component/AdminDashboardLayout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DOMPurify from 'dompurify'; // Import dompurify
import axios from 'axios';
import CodeExampleSearchBar from '../Component/CodeExampleSearchbar';


interface Vulnerability {
  _id?: string; // MongoDB ID
  owasp?: string;
  sub_issueName?: string;
  issueName?: string;
  description?: string;
  recommendation?: string;
}

export default function CodeExampleManagement() {
  const [openModal, setOpenModal] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [openManualModal, setOpenManualModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedVulnerability, setSelectedVulnerability] = useState<Vulnerability | null>(null);
  const [owasp, setOwasp] = useState('');
  const [sub_issueName, setSubIssueName] = useState('');
  const [issueName, setIssueName] = useState('');
  const [description, setDescription] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  //searchbar
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVulnerabilities, setFilteredVulnerabilities] = useState<Vulnerability[]>([]);

  // Handle Search Data Received from Search Bar
  const handleSearchResults = (results: Vulnerability[]) => {
    if (results.length > 0) {
      setFilteredVulnerabilities(results);
    } else {
      setFilteredVulnerabilities(vulnerabilities); // Reset to full data if search is cleared
    }
    setPage(0);
  };
  const paginatedVulnerabilities = filteredVulnerabilities.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const sanitizeInput = (input: string) => DOMPurify.sanitize(input);

  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'http://localhost:5000';

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFiles([]);
  };

  const handleOpenManualModal = () => {
    setOpenManualModal(true);
  };

  const handleCloseManualModal = () => {
    setOpenManualModal(false);
    resetManualForm();
  };

  const handleOpenEditModal = (vulnerability: Vulnerability) => {
    setSelectedVulnerability(vulnerability);
    setOwasp(vulnerability.owasp || '');
    setSubIssueName(vulnerability.sub_issueName || '');
    setIssueName(vulnerability.issueName || '');
    setDescription(vulnerability.description || '');
    setRecommendation(vulnerability.recommendation || '');
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedVulnerability(null);
    resetManualForm();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const validFiles = Array.from(selectedFiles).filter((file) =>
        file.name.endsWith('.csv')
      );
      if (validFiles.length > 0) {
        setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      } else {
        toast.error('Please select valid .CSV files.');
      }
    }
  };

  const handleFileRemove = (fileToRemove: File) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  const handleConfirmUpload = () => {
    if (files.length === 0) {
      toast.error('No files selected. Please select files.');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });

    fetch(`${API_BASE_URL}/uploadVulCodeExample`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to upload files');
        }
        return response.json();
      })
      .then(() => {
        toast.success('Files uploaded successfully!');
        setFiles([]);
        setOpenModal(false);
        fetchVulnerabilities(); // Refresh vulnerabilities
      })
      .catch((error) => {
        console.error('File upload failed:', error);
        toast.error('Failed to upload files. Please try again.');
      });
  };

  const handleManualSubmit = () => {
    // Sanitize inputs
    const sanitizedOwasp = sanitizeInput(owasp);
    const sanitizedSubIssueName = sanitizeInput(sub_issueName);
    const sanitizedIssueName = sanitizeInput(issueName);
    const sanitizedDescription = sanitizeInput(description);
    const sanitizedRecommendation = sanitizeInput(recommendation);

    const manualData = {
      owasp: sanitizedOwasp,
      issueName: sanitizedIssueName,
      sub_issueName: sanitizedSubIssueName,
      description: sanitizedDescription,
      recommendation: sanitizedRecommendation,
    };

    fetch('http://localhost:5000/vulnerabilities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([manualData]),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add vulnerability manually');
        }
        return response.json();
      })
      .then(() => {
        toast.success('Vulnerability added successfully!');
        resetManualForm();
      })
      .catch((error) => {
        console.error('Manual addition failed:', error);
        toast.error('Failed to add vulnerability. Please try again.');
      });
  };


  const handleEditSubmit = () => {
    // Sanitize inputs
    const sanitizedOwasp = sanitizeInput(owasp);
    const sanitizedSubIssueName = sanitizeInput(sub_issueName);
    const sanitizedIssueName = sanitizeInput(issueName);
    const sanitizedDescription = sanitizeInput(description);
    const sanitizedRecommendation = sanitizeInput(recommendation);

    const updatedData = {
      owasp: sanitizedOwasp,
      issueName: sanitizedIssueName,
      sub_issueName: sanitizedSubIssueName,
      description: sanitizedDescription,
      recommendation: sanitizedRecommendation,
    };


    // Handle PUT request
    fetch(`http://localhost:5000/vulnerabilities/${selectedVulnerability?._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update vulnerability');
        }
        return response.json();
      })
      .then(() => {
        toast.success('Vulnerability updated successfully!');
      })
      .catch((error) => {
        console.error('Update failed:', error);
        toast.error('Failed to update vulnerability. Please try again.');
      });
  };

  const handleDelete = (id: string) => {
    fetch(`${API_BASE_URL}/vulnerabilities/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete vulnerability');
        }
        return response.json();
      })
      .then(() => {
        toast.success('Vulnerability deleted successfully!');
        fetchVulnerabilities(); // Refresh vulnerabilities
      })
      .catch((error) => {
        console.error('Deletion failed:', error);
        toast.error('Failed to delete vulnerability. Please try again.');
      });
  };

  const resetManualForm = () => {
    setOwasp('');
    setIssueName('');
    setSubIssueName('');
    setDescription('');
    setRecommendation('');
  };


  const fetchVulnerabilities = async () => {
    setLoading(true);
    try {
      // Fetch data using the paginated API
      const response = await fetch(
        `${API_BASE_URL}/vulnerabilities_paginated?page=${page + 1}&limit=${rowsPerPage}`
      );
      const data = await response.json();

      if (!Array.isArray(data.data)) {
        toast.error('Invalid vulnerabilities response');
        return;
      }

      // Set vulnerabilities and update total count
      setVulnerabilities(data.data);
      setFilteredVulnerabilities(data.data); // Initialize filtered list with full data
      setTotalCount(data.total || 0); // Total count from the backend
    } catch (error) {
      console.error('Failed to fetch vulnerabilities:', error);
      toast.error('Failed to fetch vulnerabilities.');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchVulnerabilities();
  }, [page, rowsPerPage]);


  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/download-AddVul-CodeExample-template`, {
        responseType: "blob", // Ensure we receive the file as binary data
      });

      // Create a Blob from the file data
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a download link
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "AddVul_CodeExample_Template.xlsx";
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      toast.success("Excel template downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download Excel template.");
    }
  };


  return (
    <AdminDashboardLayout title="Code Example Management">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ width: '90%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="contained" onClick={handleOpenManualModal}>
                  Add Manually
                </Button>

                <Button variant="contained" startIcon={<UploadFile />} onClick={handleOpenModal}>
                  Upload CSV Files
                </Button>

                <Button variant="contained" color="primary" startIcon={<CloudDownload />} onClick={handleDownload}>
                  Download Excel Template
                </Button>

                {/* 🔹 Fixed Search Bar Alignment */}
                <CodeExampleSearchBar onSearch={handleSearchResults} />
              </Box>

              <Box mt={3}>
                {loading ? (
                  <Typography>Loading vulnerabilities...</Typography>
                ) : (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>OWASP</TableCell>
                          <TableCell>Issue Name</TableCell>
                          <TableCell>Sub Issue-Name</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>Recommendation</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredVulnerabilities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((vul) => (
                          <TableRow key={vul._id}>
                            <TableCell>{vul.owasp || 'N/A'}</TableCell>
                            <TableCell>{vul.issueName || 'N/A'}</TableCell>
                            <TableCell>{vul.sub_issueName || 'N/A'}</TableCell>
                            <TableCell>{vul.description || 'N/A'}</TableCell>
                            <TableCell>{vul.recommendation || 'N/A'}</TableCell>
                            <TableCell>
                              <IconButton
                                color="primary"
                                onClick={() => handleOpenEditModal(vul)}
                              >
                                <Edit />
                              </IconButton>
                              <IconButton
                                color="error"
                                onClick={() => handleDelete(vul._id!)}
                              >
                                <Delete />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 50]}
                      component="div"
                      count={filteredVulnerabilities.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={(_, newPage) => setPage(newPage)}
                      onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
                    />  
                  </TableContainer>
                )}
              </Box>

              {/* CSV Upload Modal */}
              <Dialog
                open={openModal}
                onClose={handleCloseModal}
                sx={{ '& .MuiDialog-paper': { width: '600px', maxWidth: '90%' } }}
              >
                <DialogTitle>
                  Upload CSV Files
                  <IconButton
                    aria-label="close"
                    onClick={handleCloseModal}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                  >
                    <Close />
                  </IconButton>
                </DialogTitle>
                <DialogContent>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadFile />}
                    fullWidth
                  >
                    Select Files
                    <input
                      type="file"
                      accept=".csv"
                      hidden
                      multiple
                      onChange={handleFileChange}
                    />
                  </Button>
                  <Box mt={2}>
                    {files.map((file) => (
                      <Box
                        key={file.name}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ mb: 1 }}
                      >
                        <Typography variant="body2">{file.name}</Typography>
                        <IconButton
                          onClick={() => handleFileRemove(file)}
                          color="error"
                          aria-label="remove file"
                        >
                          <Close />
                        </IconButton>
                      </Box>
                    ))}
                    {files.length === 0 && (
                      <Typography variant="body2" color="text.secondary">
                        No files selected.
                      </Typography>
                    )}
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseModal} color="secondary">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmUpload}
                    color="primary"
                    variant="contained"
                    disabled={files.length === 0}
                  >
                    Confirm Upload
                  </Button>
                </DialogActions>
              </Dialog>
              {/* Add Manually Modal */}
              <Dialog
                open={openManualModal}
                onClose={handleCloseManualModal}
                sx={{ '& .MuiDialog-paper': { width: '600px', maxWidth: '90%' } }}
              >
                <DialogTitle>Add Vulnerability Manually</DialogTitle>
                <DialogContent>
                  <TextField
                    fullWidth
                    label="OWASP YAER AND NAME *"
                    value={owasp}
                    onChange={(e) => setOwasp(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Issue Name *"
                    value={issueName}
                    onChange={(e) => setIssueName(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Sub Issue-Name *"
                    value={sub_issueName}
                    onChange={(e) => setSubIssueName(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Recommendation"
                    value={recommendation}
                    onChange={(e) => setRecommendation(e.target.value)}
                    margin="normal"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseManualModal} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={handleManualSubmit} color="primary" variant="contained">
                    Add Vulnerability
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Edit Modal */}
              <Dialog
                open={openEditModal}
                onClose={handleCloseEditModal}
                sx={{ '& .MuiDialog-paper': { width: '600px', maxWidth: '90%' } }}
              >
                <DialogTitle>Edit Vulnerability</DialogTitle>
                <DialogContent>
                  <TextField
                    fullWidth
                    label="OWASP"
                    value={owasp}
                    onChange={(e) => setOwasp(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Issue Name"
                    value={issueName}
                    onChange={(e) => setIssueName(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Sub Issue-Name"
                    value={sub_issueName}
                    onChange={(e) => setSubIssueName(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Recommendation"
                    value={recommendation}
                    onChange={(e) => setRecommendation(e.target.value)}
                    margin="normal"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseEditModal} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={handleEditSubmit} color="primary" variant="contained">
                    Save Changes
                  </Button>
                </DialogActions>
              </Dialog>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminDashboardLayout>
  );
}
