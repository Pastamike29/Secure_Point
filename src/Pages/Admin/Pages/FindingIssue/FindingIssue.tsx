import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Snackbar, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, MenuItem } from '@mui/material';
import { ArrowBack, ArrowForward, Close, UploadFile } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AdminDashboardLayout from '../../Component/AdminDashboardLayout';
import DynamicTable from './DynamicTable';
import dayjs, { Dayjs } from 'dayjs'; // Import Dayjs for type definition


const FindingIssue: React.FC = () => {
    const [issues, setIssues] = useState<any[]>([]); // Define your data structure
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [inputValue, setInputValue] = useState<string>("1");  // Input field value
    const [uploading, setUploading] = useState<boolean>(false);
    const [fileList, setFileList] = useState<File[]>([]); // Manage selected files
    const [dialogOpen, setDialogOpen] = useState<boolean>(false); // Modal state
    const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false); // State for add modal
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [uploadSuccess, setUploadSuccess] = useState<boolean>(false); // New state for upload success status
    const [searchTerm, setSearchTerm] = useState<string>(''); // Search term state
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null); // Allow Dayjs or null
    const [newIssue, setNewIssue] = useState<any>({
        'Risk Rating': '',
        'Status': '',
        'Found Date': null,
        'Overdue Date': null
    });

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const maxFileSize = 50 * 1024 * 1024; // 50 MB

    const limit = 100; // Limit to 100 rows

    const sanitizeString = (input: string): string => {
        return input.replace(/[^a-zA-Z0-9\s\-@.]/g, '').trim();
    };


    const columnOrder = [
        'Application Number',
        'Application Name',
        'Scope',
        'Application Contact',
        'Department',
        'Chief',
        'Risk Rating',
        'Status',
        'Status remark',
        'GRC log',
        'Notify Owner',
        'Last Date Notify Owner',
        'Finding Issue',
        'Description',
        'Recommendation',
        'Found Date',
        'Fixed Criteria',
        'Overdue Date',
        'Overdue',
        'Overdue Status',
        'Overdue.1',
        'Pentester',
        'Testing Scope',
        'Remark',
        'No. Open of GRC ',
        'Remark GRC',
    ];


    const fetchFindingIssues = async (page: number, query: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:5000/findingIssue?page=${page}&limit=${limit}&search=${query}`);
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
        if (timeoutId) {
            clearTimeout(timeoutId); // Clear previous timeout if any
        }

        const delayTimeout = setTimeout(() => {
            fetchFindingIssues(page, searchTerm); // Fetch issues after delay
        }, 500);

        setTimeoutId(delayTimeout); // Store the timeout ID

        return () => clearTimeout(delayTimeout); // Cleanup timeout when the component unmounts or searchTerm changes
    }, [page, searchTerm]); // Run this effect when either page or searchTerm changes


    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? Array.from(event.target.files) : [];
        if (files.length === 0) {
            toast.info('No files selected.');
            return;
        }
        setFileList((prev) => [...prev, ...files]);
        setSelectedFile(files[0]); // Update for single-file handling
    };

    // Handle file removal
    const handleFileDelete = (file: File) => {
        setFileList(prevFiles => prevFiles.filter(f => f !== file));
    };
    const handleConfirmUpload = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://127.0.0.1:5000/uploadFindingIssues", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const { skipped, duplicates, message } = response.data;

            if (duplicates > 0 && skipped > 0) {
                toast.info(`Uploaded: ${file.name}. Skipped ${skipped} invalid rows and ${duplicates} duplicates.`);
            } else if (duplicates > 0) {
                toast.info(`Uploaded: ${file.name}. Skipped ${duplicates} duplicates.`);
            } else if (skipped > 0) {
                toast.info(`Uploaded: ${file.name}. Skipped ${skipped} invalid rows.`);
            } else {
                toast.success(`Successfully uploaded: ${file.name}`);
            }

            // Refresh data after upload
            fetchFindingIssues(page, searchTerm);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || `Error uploading file: ${file.name}`;
            toast.error(errorMessage);
        }
    };


    const handleButtonClick = async () => {
        if (fileList.length === 0) {
            toast.error('Please select at least one file.');
            return;
        }

        setUploading(true);
        setUploadSuccess(false); // Reset upload success status

        for (const file of fileList) {
            await handleConfirmUpload(file); // Upload each file
        }

        setUploading(false);

        // After all files are uploaded, show success toast and set upload success status
        setUploadSuccess(true);
        setDialogOpen(false);  // Close the modal after upload is complete
    };

    const uploadFile = (file: File, retries = 0) => {
        const MAX_RETRIES = 3; // Define a maximum number of retries
        if (retries > MAX_RETRIES) {
            return;
        }

        try {
            const reader = new FileReader();
            reader.onload = async () => {
                const csvContent = reader.result as string;
                const rows = csvContent.trim().split('\n').filter(row => row.trim() !== ''); // Remove empty rows
                const headers = rows[0].split(',').map(header => header.trim());


                const validRows: string[][] = [];
                rows.slice(1).forEach((row) => {
                    const columns = row.split(',').map(col => col.trim());
                    const isRowEmpty = columns.every(col => col === '');
                    if (!isRowEmpty) {
                        validRows.push(columns);
                    }
                });

                if (validRows.length > 0) {
                    const formData = new FormData();
                    formData.append('file', file); // Original file if needed on the backend
                    formData.append('headers', JSON.stringify(headers)); // Headers as JSON
                    formData.append('data', JSON.stringify(validRows)); // Valid rows as JSON

                    try {
                        const response = await axios.post(
                            'http://127.0.0.1:5000/uploadFindingIssues',
                            formData,
                            { headers: { 'Content-Type': 'multipart/form-data' } }
                        );
                        toast.success('File uploaded successfully!');
                    } catch (error) {
                        toast.error('Error uploading file.');
                    }
                } else {
                    toast.info('No valid rows to upload.');
                }
            };

            reader.readAsText(file);
        } catch (error) {
            uploadFile(file, retries + 1); // Retry with an incremented counter
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage); // Update page immediately
            fetchFindingIssues(newPage, searchTerm); // Fetch new data after page change
        }
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Allow only numeric input and empty string
        if (inputValue === "" || /^[0-9]*$/.test(inputValue)) {
            setInputValue(inputValue);  // Update input value

            // Only update page if the value is a valid number (or empty string)
            if (inputValue === "") {
                setPage(1); // Default to page 1 if empty
            } else {
                const pageNumber = parseInt(inputValue, 10);
                if (!isNaN(pageNumber) && pageNumber > 0) {
                    setPage(pageNumber); // Update page number state
                }
            }
        }
    };

    const handleBlur = () => {
        const pageNumber = parseInt(inputValue, 10);

        // Reset to page 1 if invalid input (empty, negative or non-numeric)
        if (isNaN(pageNumber) || pageNumber <= 0) {
            setPage(1); // Reset to page 1
            setInputValue("1"); // Reset input value to "1"
        } else {
            setPage(pageNumber); // Set valid page number
        }

        // Fetch issues for the updated or valid page
        fetchFindingIssues(page, searchTerm);
    };


    const handleDownloadExcelTemplate = async () => {
        try {
            const response = await fetch("http://localhost:5000/download-FindingIssues-template");
            if (!response.ok) {
                throw new Error("Failed to download the template");
            }

            // Convert the response into a blob
            const blob = await response.blob();

            // Create a temporary link to download the file
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Finding Issues Template.xlsx";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading template:", error);
        }
    };


    const handleAddIssueSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/addFindingIssue', newIssue);
            if (response.status === 201) {
                toast.success('Finding issue added successfully!');
                setAddDialogOpen(false);
                fetchFindingIssues(page, ''); // Refresh the table
            } else {
                toast.error('Failed to add finding issue.');
            }
        } catch (error) {
            console.error('Error adding finding issue:', error);
            toast.error('An error occurred while adding the issue.');
        }
    };


    const resetNewIssueForm = () => {
        setNewIssue({
            'Risk Rating': '',
            'Status': '',
            'Found Date': null,
            'Overdue Date': null
        });
    };

    const handleDeleteIssue = async (issueId: string) => {
        try {
            const response = await axios.delete(`http://localhost:5000/findingIssue/${issueId}`);
            if (response.status === 200) {
                setIssues((prevIssues) => prevIssues.filter((issue) => issue._id !== issueId));
                toast.success('Issue deleted successfully!');
            }
        } catch (error) {
            toast.error('Failed to delete issue.');
        }
    };


    return (
        <AdminDashboardLayout title="Finding Issue Management">
            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Button variant="contained" color="secondary" onClick={() => setDialogOpen(true)}>
                        Upload CSV
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<UploadFile />}
                        onClick={handleDownloadExcelTemplate}
                        sx={{
                            mx: 3,
                        }}
                    >
                        Download Excel Template
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setAddDialogOpen(true)} // Open the add modal
                    >
                        Add Finding Issue
                    </Button>

                </Box>



                <TextField
                    label="Page Number"
                    type="text"
                    value={inputValue}  // Ensure page is a string to be displayed in the TextField
                    onChange={handleInputChange}  // Handle input change separately
                    onBlur={handleBlur}
                    sx={{
                        width: '100px',
                        marginLeft: 2,
                    }}
                    inputProps={{
                        pattern: '[0-9]*',
                    }}
                />
            </Box>

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <DynamicTable
                    issues={issues}
                    fetchFindingIssues={() => fetchFindingIssues(page, searchTerm)} // Pass fetchFindingIssues as a prop
                    onDeleteIssue={handleDeleteIssue} // Pass handleDeleteIssue here
                />
            )}

            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
                <IconButton onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="body1" sx={{ alignSelf: 'center' }}>
                    Page {page} of {totalPages}
                </Typography>
                <IconButton onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages}>
                    <ArrowForward />
                </IconButton>
            </Box>


            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Upload Finding Issues</DialogTitle>
                <DialogContent>
                    <input
                        type="file"
                        accept=".csv"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                    />
                    <Button
                        variant="contained"
                        component="span"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        Choose File
                    </Button>
                    <Box sx={{ marginTop: 2 }}>
                        {fileList.map((file, index) => (
                            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                                <Typography variant="body2">{file.name}</Typography>
                                <IconButton onClick={() => handleFileDelete(file)}>
                                    <Close />
                                </IconButton>
                            </Box>
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleButtonClick}
                        color="primary"
                        disabled={uploading}
                        startIcon={uploading ? <CircularProgress size={20} /> : undefined}
                    >
                        {uploading ? 'Uploading' : 'Upload'}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={addDialogOpen}
                onClose={() => {
                    setAddDialogOpen(false);
                    resetNewIssueForm();
                }}
            >
                <DialogTitle>Add New Finding Issue</DialogTitle>
                <DialogContent>
                    {columnOrder.map((column, index) => {
                        if (column === 'Found Date' || column === 'Overdue Date') {
                            return (
                                <LocalizationProvider dateAdapter={AdapterDayjs} key={index}>
                                    <DatePicker
                                        label={column} // Set label dynamically based on column name
                                        value={newIssue[column] || null} // Use state for individual fields
                                        onChange={(newValue) => {
                                            setNewIssue((prev) => ({
                                                ...prev,
                                                [column]: newValue, // Update corresponding field in the state
                                            }));
                                        }}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                margin: 'normal',
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                            );
                        } else if (column === 'Risk Rating') {
                            return (
                                <TextField
                                    key={index}
                                    fullWidth
                                    select
                                    label={column}
                                    value={newIssue[column] || ''}
                                    onChange={(e) =>
                                        setNewIssue((prev) => ({
                                            ...prev,
                                            [column]: e.target.value,
                                        }))
                                    }
                                    margin="normal"
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value=""></option>
                                    <option value="Critical">Critical</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                    <option value="Informative">Informative</option>
                                </TextField>
                            );
                        } else if (column === 'Status' || column === 'Overdue Status') {
                            return (
                                <TextField
                                    key={index}
                                    fullWidth
                                    select
                                    label={column}
                                    value={newIssue[column] || ''}
                                    onChange={(e) =>
                                        setNewIssue((prev) => ({
                                            ...prev,
                                            [column]: e.target.value,
                                        }))
                                    }
                                    margin="normal"
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value=""></option>
                                    <option value="Open">Open</option>
                                    <option value="Close">Close</option>
                                </TextField>
                            );
                        } else {
                            return (
                                <TextField
                                    key={index}
                                    fullWidth
                                    label={column}
                                    value={newIssue[column] || ''}
                                    onChange={(e) =>
                                        setNewIssue((prev) => ({
                                            ...prev,
                                            [column]: e.target.value,
                                        }))
                                    }
                                    margin="normal"
                                />
                            );
                        }
                    })}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setAddDialogOpen(false);
                            resetNewIssueForm();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleAddIssueSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>

        </AdminDashboardLayout>
    );
};

export default FindingIssue;
