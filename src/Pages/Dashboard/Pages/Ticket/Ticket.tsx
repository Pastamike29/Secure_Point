import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    Grid,
    Paper,
    FormControl,
    Select,
    MenuItem,
    useTheme,
} from '@mui/material';
import DashboardLayout from '../../Components/DashboardLayout';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5000';

const Ticket: React.FC = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const [emailError, setEmailError] = useState(false);
    const [applicationNumbers, setApplicationNumbers] = useState<string[]>([]);
    const [applicationNames, setApplicationNames] = useState<string[]>([]);
    const [findingIssues, setFindingIssues] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        application_number: '',
        employee_id: '',
        application_name: '',
        name: '',
        finding_issue: '',
        email: '',
        message: '',
    });

    useEffect(() => {
        const fetchApplicationNumbers = async () => {
            try {
                const response = await axios.get(`${API_URL}/application-numbers`);
                if (response.status === 200) {
                    setApplicationNumbers(response.data || []);
                }
            } catch (error) {
                console.error('Error fetching application numbers:', error);
            }
        };
        fetchApplicationNumbers();
    }, []);

    const fetchMatchedData = async (appNumber: string, appName: string) => {
        try {
            const response = await axios.get(`${API_URL}/tickets/fetch-matched-data`, {
                params: { applicationNumber: appNumber || undefined, applicationName: appName || undefined },
            });

            if (response.status === 200) {
                const data = response.data;
                if (appNumber) {
                    setApplicationNames(data.application_names || []);
                    setFindingIssues([]);
                }
                if (appName) {
                    setFindingIssues(data.finding_issues || []);
                }
            }
        } catch (error) {
            console.error('Error fetching matched data:', error);
        }
    };

    const handleApplicationNumberChange = (event: any) => {
        const value = event.target.value;
        setFormData((prev) => ({ ...prev, application_number: value, application_name: '', finding_issue: '' }));
        fetchMatchedData(value, '');
    };

    const handleApplicationNameChange = (event: any) => {
        const value = event.target.value;
        setFormData((prev) => ({ ...prev, application_name: value, finding_issue: '' }));
        fetchMatchedData(formData.application_number, value);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        if (name === 'email') {
            setEmailError(!value.endsWith('@ttbbank.com'));
        }
    };

    const handleSubmit = async () => {
        if (emailError) {
            toast.error('Please correct the email before submitting.');
            return;
        }

        try {
            await axios.post(`${API_URL}/tickets`, formData);
            toast.success('Ticket sent successfully!');
            setFormData({
                application_number: '',
                employee_id: '',
                application_name: '',
                name: '',
                finding_issue: '',
                email: '',
                message: '',
            });
        } catch (error) {
            toast.error('Failed to send ticket.');
        }
    };

    return (
        <DashboardLayout title="TICKET">
            <Box sx={{ py: 5, display: 'flex', justifyContent: 'center' }}>
                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        p: 5,
                        borderRadius: 3,
                        boxShadow: 4,
                        backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF',
                        color: isDarkMode ? '#FFF' : '#000',
                        maxWidth: '800px',
                        width: '100%',
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FF4081', mb: 3, textAlign: 'center' }}>
                        FINDING ISSUE TICKET
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Typography variant="h6">Application Number</Typography>
                                <Select
                                    value={formData.application_number}
                                    onChange={handleApplicationNumberChange}
                                    displayEmpty
                                    sx={{ bgcolor: isDarkMode ? '#333' : '#FFF', color: isDarkMode ? '#FFF' : '#000' }}
                                >
                                    <MenuItem value="">Select Application Number</MenuItem>
                                    {applicationNumbers.map((number) => (
                                        <MenuItem key={number} value={number}>
                                            {number}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth disabled={!formData.application_number}>
                                <Typography variant="h6">Application Name</Typography>
                                <Select
                                    value={formData.application_name}
                                    onChange={handleApplicationNameChange}
                                    displayEmpty
                                    sx={{ bgcolor: isDarkMode ? '#333' : '#FFF', color: isDarkMode ? '#FFF' : '#000' }}
                                >
                                    <MenuItem value="">Select Application Name</MenuItem>
                                    {applicationNames.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth disabled={!formData.application_name}>
                                <Typography variant="h6">Finding Issue</Typography>
                                <Select
                                    value={formData.finding_issue}
                                    onChange={(e) => setFormData({ ...formData, finding_issue: e.target.value })}
                                    displayEmpty
                                    sx={{ bgcolor: isDarkMode ? '#333' : '#FFF', color: isDarkMode ? '#FFF' : '#000' }}
                                >
                                    <MenuItem value="">Select Finding Issue</MenuItem>
                                    {findingIssues.map((issue) => (
                                        <MenuItem key={issue} value={issue}>
                                            {issue}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="Name" name="name" value={formData.name} onChange={handleInputChange} fullWidth required />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="Employee ID" name="employee_id" value={formData.employee_id} onChange={handleInputChange} fullWidth required />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="TTB Email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                error={emailError}
                                helperText={emailError ? 'Please use your @ttbbank.com mail only' : ''}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="Message" name="message" value={formData.message} onChange={handleInputChange} fullWidth required multiline rows={4} />
                        </Grid>
                    </Grid>

                    <Button variant="contained" sx={{ mt: 4, bgcolor: '#FF4081', color: '#FFF', fontWeight: 'bold' }} onClick={handleSubmit}>
                        Submit
                    </Button>
                </Paper>
            </Box>
        </DashboardLayout>
    );
};

export default Ticket;
