import React, { useEffect, useRef, useState } from 'react';
import {
     Box,
     Typography,
     Button,
     TextField,
     Grid,
     Paper,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DashboardLayout from '../../Components/DashboardLayout';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const API_URL = 'http://localhost:5000';

const Ticket: React.FC = () => {
     const [activeDropdown, setActiveDropdown] = useState<null | 'applicationNumber' | 'applicationName' | 'findingIssue'>(null);
     const [emailError, setEmailError] = useState(false);
     const [formData, setFormData] = useState({
          application_number: '',
          employee_id: '',
          application_name: '',
          name: '',
          finding_issue: '',
          email: '',
          message: '',
     });

     const [dropdownData, setDropdownData] = useState({
          applicationNumbers: [] as string[],
          applicationNames: [] as string[],
          findingIssues: [] as string[],
     });


     
     const [searchData, setSearchData] = useState({
          applicationNumber: '',
          applicationName: '',
          findingIssue: '',
     });

     const dropdownRef = useRef<HTMLDivElement>(null);

     const fetchDropdownData = async () => {
          try {
               const [applicationNumbersRes, applicationNamesRes, findingIssuesRes] = await Promise.all([
                    axios.get(`${API_URL}/application-numbers`),
                    axios.get(`${API_URL}/application-names`),
                    axios.get(`${API_URL}/finding-issues`),
               ]);

               setDropdownData({
                    applicationNumbers: applicationNumbersRes.data || [],
                    applicationNames: applicationNamesRes.data || [],
                    findingIssues: findingIssuesRes.data || [],
               });
          } catch (error) {
               toast.error('Failed to load dropdown options.');
          }
     };

     useEffect(() => {
          fetchDropdownData();
     }, []);

     useEffect(() => {
          const handleClickOutside = (event: MouseEvent) => {
               if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setActiveDropdown(null); // Collapse the dropdown
               }
          };

          document.addEventListener('mousedown', handleClickOutside);
          return () => {
               document.removeEventListener('mousedown', handleClickOutside);
          };
     }, []);


     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({ ...prevData, [name]: value }));

          // Validate TTB email
          if (name === 'email') {
               const isValidTTBEmail = value.endsWith('@ttbbank.com');
               setEmailError(!isValidTTBEmail);
          }
     };

     const handleSearchChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          field: keyof typeof searchData
     ) => {
          const { value } = e.target;
          setSearchData((prevData) => ({ ...prevData, [field]: value }));
     };

     const handleSubmit = async () => {
          if (emailError) {
               toast.error('Please correct the email before submitting.', { position: 'top-right' });
               return;
          }

          try {
               await axios.post(`${API_URL}/tickets`, formData);
               toast.success('Ticket sent successfully!', { position: 'top-right' });
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
               toast.error('Failed to send ticket. Please try again.', { position: 'top-right' });
          }
     };

     const filteredData = {
          applicationNumbers: dropdownData.applicationNumbers.filter((num) =>
               (num || '').toLowerCase().includes((searchData.applicationNumber || '').toLowerCase())
          ),
          applicationNames: dropdownData.applicationNames.filter((name) =>
               (name || '').toLowerCase().includes((searchData.applicationName || '').toLowerCase())
          ),
          findingIssues: dropdownData.findingIssues.filter((issue) =>
               (issue || '').toLowerCase().includes((searchData.findingIssue || '').toLowerCase())
          ),
     };

     return (
          <DashboardLayout title="TICKET">
               <Box sx={{ py: 5 }}>
                    <Paper
                         sx={{
                              display: 'flex',
                              flexDirection: { xs: 'column', sm: 'row' },
                              height: { xs: '100%', sm: '50 vh' },
                              width: { xs: '100%', sm: '100 vh' },
                              borderRadius: 2,
                              overflow: 'hidden',
                              boxShadow: 4,
                         }}
                    >
                         <Box
                              sx={{
                                   backgroundColor: '#ffffff',
                                   color: '#121212',
                                   display: 'flex',
                                   flexDirection: 'column',
                                   justifyContent: 'center',
                                   p: 10,
                              }}
                         >
                              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#f06292', mb: 2 }}>
                                   FINDING ISSUE TICKET
                              </Typography>

                              <Grid container spacing={4}>
                                   <Grid item xs={6}>
                                        <TextField
                                             label="Application Number"
                                             name="application_number"
                                             value={formData.application_number}
                                             onFocus={() => setActiveDropdown('applicationNumber')}
                                             onChange={(e) => {
                                                  handleInputChange(e);
                                                  handleSearchChange(e, 'applicationNumber');
                                             }}
                                             fullWidth
                                             InputLabelProps={{ style: { color: 'grey' } }}
                                             inputProps={{ style: { color: 'grey' } }}
                                             placeholder="Search Application Number"
                                             variant="outlined"

                                        />
                                        {activeDropdown === 'applicationNumber' && (
                                             <Box
                                                  ref={dropdownRef}
                                                  sx={{
                                                       maxHeight: '200px',
                                                       overflowY: 'auto',
                                                       mt: 1,
                                                       border: '1px solid grey',
                                                       borderRadius: '4px',
                                                       backgroundColor: 'white',
                                                  }}
                                             >
                                                  {filteredData.applicationNumbers.map((number) => (
                                                       <Typography
                                                            key={number}
                                                            sx={{
                                                                 cursor: 'pointer',
                                                                 padding: '5px 10px',
                                                                 backgroundColor:
                                                                      formData.application_number === number
                                                                           ? 'rgba(0, 0, 0, 0.1)'
                                                                           : 'transparent',
                                                                 '&:hover': {
                                                                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                                                 },
                                                            }}
                                                            onClick={() => {
                                                                 setFormData((prevData) => ({
                                                                      ...prevData,
                                                                      application_number: number,
                                                                 }));
                                                                 setActiveDropdown(null);
                                                            }}
                                                       >
                                                            {number}
                                                       </Typography>
                                                  ))}
                                             </Box>
                                        )}
                                   </Grid>

                                   <Grid item xs={6}>
                                        <TextField
                                             label="Name"
                                             name="name"
                                             value={formData.name}
                                             onChange={handleInputChange}
                                             fullWidth
                                             required
                                             InputLabelProps={{ style: { color: 'grey' } }}
                                             inputProps={{ style: { color: 'grey' } }}
                                        />
                                   </Grid>

                                   <Grid item xs={6}>
                                        <TextField
                                             label="Application Name"
                                             name="application_name"
                                             value={formData.application_name}
                                             onFocus={() => setActiveDropdown('applicationName')}
                                             onChange={(e) => {
                                                  handleInputChange(e);
                                                  handleSearchChange(e, 'applicationName');
                                             }}
                                             fullWidth
                                             InputLabelProps={{ style: { color: 'grey' } }}
                                             inputProps={{ style: { color: 'grey' } }}
                                             placeholder="Search Application Name"
                                             variant="outlined"
                                        />
                                        {activeDropdown === 'applicationName' && (
                                             <Box
                                                  ref={dropdownRef}
                                                  sx={{
                                                       maxHeight: '200px',
                                                       overflowY: 'auto',
                                                       mt: 1,
                                                       border: '1px solid grey',
                                                       borderRadius: '4px',
                                                       backgroundColor: 'white',
                                                  }}
                                             >
                                                  {filteredData.applicationNames.map((name) => (
                                                       <Typography
                                                            key={name}
                                                            sx={{
                                                                 cursor: 'pointer',
                                                                 padding: '5px 10px',
                                                                 backgroundColor:
                                                                      formData.application_name === name
                                                                           ? 'rgba(0, 0, 0, 0.1)'
                                                                           : 'transparent',
                                                                 '&:hover': {
                                                                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                                                 },
                                                            }}
                                                            onClick={() => {
                                                                 setFormData((prevData) => ({
                                                                      ...prevData,
                                                                      application_name: name,
                                                                 }));
                                                                 setActiveDropdown(null);
                                                            }}
                                                       >
                                                            {name}
                                                       </Typography>
                                                  ))}
                                             </Box>
                                        )}
                                   </Grid>

                                   <Grid item xs={6}>
                                        <TextField
                                             label="Employee ID"
                                             name="employee_id"
                                             value={formData.employee_id}
                                             onChange={handleInputChange}
                                             fullWidth
                                             required
                                             InputLabelProps={{ style: { color: 'grey' } }}
                                             inputProps={{ style: { color: 'grey' } }}
                                        />
                                   </Grid>

                                   <Grid item xs={6}>
                                        <TextField
                                             label="Finding Issue"
                                             name="finding_issue"
                                             value={formData.finding_issue}
                                             onFocus={() => setActiveDropdown('findingIssue')}
                                             onChange={(e) => {
                                                  handleInputChange(e);
                                                  handleSearchChange(e, 'findingIssue');
                                             }}
                                             fullWidth
                                             InputLabelProps={{ style: { color: 'grey' } }}
                                             inputProps={{ style: { color: 'grey' } }}
                                             placeholder="Search Finding Issue"
                                             variant="outlined"
                                        />
                                        {activeDropdown === 'findingIssue' && (
                                             <Box
                                                  ref={dropdownRef}
                                                  sx={{
                                                       maxHeight: '200px',
                                                       overflowY: 'auto',
                                                       mt: 1,
                                                       border: '1px solid grey',
                                                       borderRadius: '4px',
                                                       backgroundColor: 'white',
                                                  }}
                                             >
                                                  {filteredData.findingIssues.map((issue) => (
                                                       <Typography
                                                            key={issue}
                                                            sx={{
                                                                 cursor: 'pointer',
                                                                 padding: '5px 10px',
                                                                 backgroundColor:
                                                                      formData.finding_issue === issue
                                                                           ? 'rgba(0, 0, 0, 0.1)'
                                                                           : 'transparent',
                                                                 '&:hover': {
                                                                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                                                 },
                                                            }}
                                                            onClick={() => {
                                                                 setFormData((prevData) => ({
                                                                      ...prevData,
                                                                      finding_issue: issue,
                                                                 }));
                                                                 setActiveDropdown(null);
                                                            }}
                                                       >
                                                            {issue}
                                                       </Typography>
                                                  ))}
                                             </Box>
                                        )}
                                   </Grid>

                                   <Grid item xs={6}>
                                        <TextField
                                             label="TTB Email"
                                             name="email"
                                             value={formData.email}
                                             onChange={handleInputChange}
                                             fullWidth
                                             required
                                             InputLabelProps={{ style: { color: 'grey' } }}
                                             inputProps={{ style: { color: 'grey' } }}
                                             error={emailError}
                                             helperText={emailError ? 'Please use your @ttbbank.com mail only' : ''}
                                        />
                                   </Grid>

                                   <Grid item xs={6}>
                                        <TextField
                                             label="Message"
                                             name="message"
                                             value={formData.message}
                                             onChange={handleInputChange}
                                             fullWidth
                                             required
                                             multiline
                                             rows={4}
                                             InputLabelProps={{ style: { color: 'grey' } }}
                                             inputProps={{ style: { color: 'grey' } }}
                                        />
                                   </Grid>
                              </Grid>
                              <Button
                                   variant="contained"
                                   sx={{
                                        bgcolor: '#ff4d6d',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: '1.2rem',
                                        py: 2,
                                        mt: 10,
                                        '&:hover': {
                                             bgcolor: '#ff6684',
                                        },
                                   }}
                                   onClick={handleSubmit}
                              >
                                   Submit
                              </Button>
                         </Box>

                   
                    </Paper>
                    <ToastContainer />
               </Box>
          </DashboardLayout>
     );
};

export default Ticket;
