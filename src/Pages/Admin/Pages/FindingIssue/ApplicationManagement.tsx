import React, { useState, useEffect } from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton,
    CircularProgress
} from '@mui/material';
import axios from 'axios';
import Papa from 'papaparse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from '../../../Dashboard/Components/DashboardLayout';
import CloseIcon from '@mui/icons-material/Close';

interface Application {
    id: string;
    applicationNumber: string;
    applicationName: string;
    totalVulnerabilities: number;
    applicationContact: string;
    scope: string;
    updated_at: string;
}

interface FileUploadProgress {
    file: File;
    progress: number;
    success: boolean | null;
}

export default function ApplicationManagement() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
    const [formData, setFormData] = useState({
        applicationNumber: '',
        applicationName: '',
        totalVulnerabilities: 0,
        applicationContact: '',
        scope: '',
    });
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadProgress, setUploadProgress] = useState<FileUploadProgress[]>([]);
    const [allUploadsCompleted, setAllUploadsCompleted] = useState(false);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await axios.get('http://localhost:5000/application');
            setApplications(response.data);
        } catch (error) {
            console.error('Error fetching applications:', error);
            toast.error('Error fetching applications');
        }
    };

    const handleOpenDialog = (application: Application | null = null) => {
        setSelectedApplication(application);
        setFormData(application ? {
            applicationNumber: application.applicationNumber,
            applicationName: application.applicationName,
            totalVulnerabilities: application.totalVulnerabilities,
            applicationContact: application.applicationContact,
            scope: application.scope
        } : {
            applicationNumber: '',
            applicationName: '',
            totalVulnerabilities: 0,
            applicationContact: '',
            scope: ''
        });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedApplication(null);
    };

    const handleSubmit = async () => {
        try {
            if (selectedApplication) {
                await axios.put(`http://localhost:5000/application/${selectedApplication.applicationNumber}`, formData);
                toast.success('Application updated successfully');
            } else {
                await axios.post('http://localhost:5000/application', formData);
                toast.success('Application created successfully');
            }
            fetchApplications();
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving application:', error);
            toast.error('Error saving application');
        }
    };

    const handleDelete = async (applicationNumber: string) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this application?');
        if (!isConfirmed) return;

        try {
            await axios.delete(`http://localhost:5000/application/${applicationNumber}`);
            toast.success('Application deleted successfully');
            fetchApplications();
        } catch (error) {
            console.error('Error deleting application:', error);
            toast.error('Error deleting application');
        }
    };

    const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
        setOpenConfirmDialog(true);
    };

    const handleRemoveFile = (fileToRemove: File) => {
        setSelectedFiles((prevFiles) => prevFiles.filter(file => file !== fileToRemove));
        setUploadProgress((prev) => prev.filter(progress => progress.file !== fileToRemove));
    };

    const handleConfirmUpload = () => {
        const newUploadProgress: FileUploadProgress[] = selectedFiles.map((file) => ({
            file,
            progress: 0,
            success: null,
        }));

        setUploadProgress(newUploadProgress);
        setAllUploadsCompleted(false);

        selectedFiles.forEach((file) => {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: async (result) => {
                    const data = result.data.map((row: any) => {
                        Object.keys(row).forEach((key) => {
                            if (row[key] === '') row[key] = null;
                        });
                        return row;
                    });

                    let successCount = 0;
                    let failureCount = 0;

                    for (const [index, row] of data.entries()) {
                        try {
                            await axios.post('http://localhost:5000/findingIssue', row);
                            successCount++;

                            const progressIndex = newUploadProgress.findIndex(
                                (upload) => upload.file === file
                            );

                            if (progressIndex !== -1) {
                                newUploadProgress[progressIndex].progress = Math.round(
                                    ((index + 1) / data.length) * 100
                                );
                                setUploadProgress([...newUploadProgress]);
                            }
                        } catch (error) {
                            console.error('Error uploading record:', error);
                            failureCount++;
                        }
                    }

                    fetchApplications();

                    const progressIndex = newUploadProgress.findIndex((upload) => upload.file === file);
                    if (progressIndex !== -1) {
                        newUploadProgress[progressIndex].success = successCount > 0;
                        newUploadProgress[progressIndex].progress = 100;
                    }

                    setUploadProgress([...newUploadProgress]);

                    if (successCount > 0) toast.success(`${successCount} records added successfully.`);
                    if (failureCount > 0) toast.error(`${failureCount} records failed to upload.`);

                    const allCompleted = newUploadProgress.every((upload) => upload.progress === 100);
                    setAllUploadsCompleted(allCompleted);
                },
                error: (error) => {
                    console.error('Error parsing CSV file:', error);
                    toast.error('Error parsing CSV file');
                },
            });
        });
    };

    return (
        <DashboardLayout title="Admin Management">
            <Box sx={{ padding: '16px' }}>
                <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
                    Add Application
                </Button>
                <Button
                    variant="contained"
                    component="label"
                    sx={{ float: 'right', marginLeft: '8px' }}
                >
                    Upload CSV
                    <input type="file" hidden accept=".csv" onChange={handleFileSelection} multiple />
                </Button>

                <TableContainer component={Paper} sx={{ marginTop: '16px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Application Number</TableCell>
                                <TableCell>Application Name</TableCell>
                                <TableCell>Scope</TableCell>
                                <TableCell>Total Vulnerabilities</TableCell>
                                <TableCell>Application Contact</TableCell>
                                <TableCell>Updated At</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {applications.map((application) => (
                                <TableRow key={application.id}>
                                    <TableCell>{application.applicationNumber}</TableCell>
                                    <TableCell>{application.applicationName}</TableCell>
                                    <TableCell>{application.scope}</TableCell>
                                    <TableCell>{application.totalVulnerabilities}</TableCell>
                                    <TableCell>{application.applicationContact}</TableCell>
                                    <TableCell>{new Date(application.updated_at).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => handleOpenDialog(application)}
                                            sx={{ marginRight: '8px' }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleDelete(application.applicationNumber)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
                    <DialogTitle>Confirm File Upload</DialogTitle>
                    <DialogContent>
                        {selectedFiles.map((file) => (
                            <Box key={file.name} display="flex" alignItems="center">
                                <span>{file.name}</span>
                                <IconButton onClick={() => handleRemoveFile(file)} color="error" size="small">
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenConfirmDialog(false)} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmUpload} color="primary">
                            Confirm Upload
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>{selectedApplication ? 'Edit Application' : 'Add Application'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Application Number"
                            value={formData.applicationNumber}
                            onChange={(e) => setFormData({ ...formData, applicationNumber: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Application Name"
                            value={formData.applicationName}
                            onChange={(e) => setFormData({ ...formData, applicationName: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Scope"
                            value={formData.scope}
                            onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Total Vulnerabilities"
                            type="number"
                            value={formData.totalVulnerabilities}
                            onChange={(e) => setFormData({ ...formData, totalVulnerabilities: Number(e.target.value) })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Contact"
                            value={formData.applicationContact}
                            onChange={(e) => setFormData({ ...formData, applicationContact: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            {selectedApplication ? 'Update' : 'Create'}
                        </Button>
                    </DialogActions>
                </Dialog>

                <ToastContainer />
            </Box>
        </DashboardLayout>
    );
}
