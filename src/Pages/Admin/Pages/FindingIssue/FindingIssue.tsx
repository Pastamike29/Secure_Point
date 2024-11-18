import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, CircularProgress, Snackbar, TextField, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Upload, ArrowBack, ArrowForward } from '@mui/icons-material';
import axios from 'axios';
import AdminDashboardLayout from '../../Component/AdminDashboardLayout';
import DynamicTable from './DynamicTable';

interface FindingIssue {
    _id: string;
    applicationNumber: string;
    applicationName: string;
    scope?: string;
    applicationContact?: string;
    department?: string;
    chief?: string;
    riskRating?: string;
    status?: string;
    findingIssue?: string;
    description?: string;
    recommendation?: string;
    foundDate?: string;
    overdueStatus?: string;
    fixedCriteria?: string;
    overdueDate?: string;
    pentester?: string;
    testingScope?: string;
    remark?: string;
    noOpenOfGRC?: string;
    remarkGRC?: string;
    updated_at?: string;
}

const FindingIssue: React.FC = () => {
    const [issues, setIssues] = useState<FindingIssue[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [toastOpen, setToastOpen] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchField, setSearchField] = useState('applicationNumber');
    const [lastUploadedFile, setLastUploadedFile] = useState<File | null>(null);
    const limit = 10;

    const fetchFindingIssues = async (page: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:5000/findingIssue?page=${page}&limit=${limit}`);
            setIssues(response.data.finding_issues);
            setTotalPages(response.data.total_pages);
        } catch (err: any) {
            const message = err.response?.data?.error || 'An error occurred';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFindingIssues(page);
    }, [page]);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            return;
        }
        const file = event.target.files[0];

        if (lastUploadedFile && lastUploadedFile.name === file.name && lastUploadedFile.size === file.size) {
            setToastMessage('You have already uploaded this file. Please select a different file.');
            setToastOpen(true);
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            setUploadProgress(0);
            await axios.post('http://localhost:5000/uploadFindingIssues', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const progress = progressEvent?.total
                        ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        : 0;
                    setUploadProgress(progress);
                },
            });
            setLastUploadedFile(file);
            setToastMessage('File uploaded successfully!');
            setToastOpen(true);
        } catch (error) {
            setToastMessage('Error uploading file');
            setToastOpen(true);
        }
    };

    const handleToastClose = () => {
        setToastOpen(false);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage(prevPage => prevPage - 1);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const selectedValue = event.target.value;
        setSearchField(selectedValue); // Update the searchField with the selected value
    };

    const filteredIssues = issues.filter((issue) => {
        const fieldValue = issue[searchField as keyof FindingIssue] || ''; // Get the field's value

        // Perform case-insensitive matching based on the selected field
        return fieldValue.toLowerCase().includes(searchQuery.toLowerCase());
    });



    return (
        <AdminDashboardLayout title='Finding Issue Management'>


            <Select
                value={searchField}
                onChange={handleSelectChange} // Use the corrected handler here
                sx={{ marginBottom: '16px', marginLeft: '16px' }}
            >
                <MenuItem value="applicationNumber">Application Number</MenuItem>
                <MenuItem value="applicationName">Application Name</MenuItem>
                <MenuItem value="applicationContact">Application Contact</MenuItem>
                <MenuItem value="department">Department</MenuItem>
                <MenuItem value="chief">Chief</MenuItem>
                <MenuItem value="riskRating">Risk Rating</MenuItem>
                <MenuItem value="status">Status</MenuItem>
                <MenuItem value="findingIssue">Finding Issue</MenuItem>
                <MenuItem value="description">Description</MenuItem>
                <MenuItem value="recommendation">Recommendation</MenuItem>
                <MenuItem value="foundDate">Found Date</MenuItem>
                <MenuItem value="pentester">Pentester</MenuItem>
                <MenuItem value="testingScope">Testing Scope</MenuItem>
            </Select>

            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ marginBottom: '16px' }}
            />

            <Select
                value={searchField}
                onChange={handleSelectChange}
                sx={{ marginBottom: '16px', marginLeft: '16px' }}
            >
                <MenuItem value="applicationNumber">Application Number</MenuItem>
                <MenuItem value="applicationName">Application Name</MenuItem>
                <MenuItem value="applicationContact">Application Contact</MenuItem>
                <MenuItem value="department">Department</MenuItem>
                <MenuItem value="chief">Chief</MenuItem>
                <MenuItem value="riskRating">Risk Rating</MenuItem>
                <MenuItem value="status">Status</MenuItem>
                <MenuItem value="findingIssue">Finding Issue</MenuItem>
                <MenuItem value="description">Description</MenuItem>
                <MenuItem value="recommendation">Recommendation</MenuItem>
                <MenuItem value="foundDate">Found Date</MenuItem>
                <MenuItem value="pentester">Pentester</MenuItem>
                <MenuItem value="testingScope">Testing Scope</MenuItem>
            </Select>

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <DynamicTable issues={filteredIssues} />
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={page === 1}
                    onClick={handlePreviousPage}
                    startIcon={<ArrowBack />}
                >
                    Previous
                </Button>
                <Typography variant="body1">{`Page ${page} of ${totalPages}`}</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={page === totalPages}
                    onClick={handleNextPage}
                    endIcon={<ArrowForward />}
                >
                    Next
                </Button>
            </div>

            <Snackbar
                open={toastOpen}
                autoHideDuration={6000}
                onClose={handleToastClose}
                message={toastMessage}
            />
        </AdminDashboardLayout>
    );
};

export default FindingIssue;
