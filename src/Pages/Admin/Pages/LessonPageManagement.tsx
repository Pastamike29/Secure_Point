import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Modal,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
} from '@mui/material';
import DashboardLayout from '../Component/AdminDashboardLayout';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast, ToastContainer } from 'react-toastify';
import { Close, UploadFile } from '@mui/icons-material';
import 'react-toastify/dist/ReactToastify.css';



export default function LessonPageManagement() {

  const [lessons, setLessons] = useState<any[]>([]);
  const [editingIndex, setEditingIndex] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [filteredLessons, setFilteredLessons] = useState<any[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);


  const API_BASE_URL = 'http://localhost:5000/api';


  const [filters, setFilters] = useState({
    owasp_year: '',
    owasp: '',
    issueName: '',
  });
  const [newLesson, setNewLesson] = useState<any>({
    issueName: '',
    sub_issueName: '',
    owasp: '',
    owasp_year: '', // Default value includes "OWASP"
    description: '',
    recommendation: '',
    issueCode_Java: '',
    solveCode_Java: '',
    issueCode_Dotnet: '',
    solveCode_Dotnet: '',
    issueCode_Javascript: '',
    solveCode_Javascript: '',
    issue_Pom_xml: '',
    solve_Pom_xml: '',
    issue_xml: '',
    solve_xml: '',
    issue_Dockerfile: '',
    solve_Dockerfile: '',
    issue_FileConfig: '',
    solve_FileConfig: '',
    issue_html: '',
    solve_html: '',
    create_at: '',
  });


  // Fetch lessons on component load
  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/lessons`);
      const data = await response.json();

      console.log('Fetched lessons:', data); // Log the full data
      if (Array.isArray(data.data)) {
        setLessons(data.data);
        setFilteredLessons(data.data);
      } else {
        console.error('Invalid data structure:', data);
        setLessons([]); // Reset to empty if data is invalid
        setFilteredLessons([]);
      }
    } catch (error) {
      toast.error('Failed to fetch lessons.');
      setLessons([]); // Reset to empty in case of error
      setFilteredLessons([]);
    }
  };



  const handleConfirmUpload = () => {
    if (files.length === 0) {
      toast.error('No files selected. Please select files.');
      return;
    }

    const nonCsvFiles = files.filter((file) => !file.name.endsWith('.csv'));
    if (nonCsvFiles.length > 0) {
      toast.error('Please select CSV file(s) only.');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });

    fetch(`${API_BASE_URL}/uploadVulLessonPage`, {
      method: 'POST',
      body: formData,
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorMessage = await response.text(); // Capture error message
          if (response.status === 400) {
            // Handle duplicate data
            throw new Error('You uploaded the same data');
          }
          throw new Error(errorMessage || 'Failed to upload files');
        }
        return response.json();
      })
      .then((data) => {
        toast.success('Upload Successfully!');
        setFiles([]);
        setOpenModal(false);
      })
      .catch((error) => {
        if (error.message === 'You uploaded the same data') {
          toast.error('You upload the same data');
        } else {
          toast.error('Please ensure to use the right format and accurate template.');
        }
      });
  };



  const handleOpenAddLessonModal = () => {
    setModalOpen(true); // Opens Add Lesson Modal
  };

  const handleCloseAddLessonModal = () => {
    setModalOpen(false); // Closes Add Lesson Modal
  };

  const handleOpenUploadModal = () => {
    setOpenModal(true); // Opens Upload CSV Files Modal
  };

  const handleCloseUploadModal = () => {
    setOpenModal(false); // Closes Upload CSV Files Modal
    setFiles([]); // Clear selected files
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



  const handleAddOrUpdateLesson = async () => {
    try {
      const endpoint =
        editingIndex !== null
          ? `${API_BASE_URL}/lessons/${editingIndex}` // Use editingIndex directly as the ID
          : `${API_BASE_URL}/lessons`;

      const method = editingIndex !== null ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLesson),
      });

      if (!response.ok) throw new Error(`Error from API: ${response.statusText}`);

      const result = await response.json();

      if (editingIndex !== null) {
        // Edit lesson case
        toast.success('Lesson updated successfully!');
      } else {
        // Add new lesson case
        toast.success('Lesson added successfully!');
      }

      setModalOpen(false);
      setEditingIndex(null);
    } catch (error) {
      toast.error('Failed to save lesson.');
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error(`Error from API: ${response.statusText}`);

      const updatedLessons = lessons.filter((lesson) => lesson._id !== lessonId);
      setLessons(updatedLessons);
      toast.success('Lesson deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete lesson.');
    }
  };

  const handleEditLesson = (lessonId: string) => {
    const lessonToEdit = lessons.find((lesson) => lesson._id === lessonId);
    if (!lessonToEdit) {
      return;
    }

    setEditingIndex(lessonId);
    setNewLesson(lessonToEdit);
    setModalOpen(true);
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));

    const lowerCaseValue = value.toLowerCase();
    setFilteredLessons(
      lessons.filter((lesson) => {
        return (
          (field === 'owasp_year' &&
            lesson.owasp_year?.toLowerCase().includes(lowerCaseValue)) ||
          (field === 'owasp' && lesson.owasp?.toLowerCase().includes(lowerCaseValue)) ||
          (field === 'issueName' &&
            lesson.issueName?.toLowerCase().includes(lowerCaseValue))
        );
      })
    );
  };

  const handleDownloadExcelTemplate = async () => {
    try {
      const response = await fetch("http://localhost:5000/download-AddVul-LessonPage-template");
      if (!response.ok) {
        throw new Error("Failed to download the template");
      }

      // Convert the response into a blob
      const blob = await response.blob();

      // Create a temporary link to download the file
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Adding Vulnerabilities LessonPage Template.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error("Error downloading template:", error);
    }
  };

  return (
    <>
      <DashboardLayout>
        <Container>
          <Typography variant="h4" gutterBottom>
            Admin Panel - Manage Lessons
          </Typography>

          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => {
              handleOpenAddLessonModal();
              setEditingIndex(null);
              setNewLesson({
                issueName: '',
                sub_issueName: '',
                owasp: '',
                owasp_year: '',
                description: '',
                recommendation: '',
                issueCode_Java: '',
                solveCode_Java: '',
                issueCode_Dotnet: '',
                solveCode_Dotnet: '',
                issueCode_Javascript: '',
                solveCode_Javascript: '',
                issue_Pom_xml: '',
                solve_Pom_xml: '',
                issue_xml: '',
                solve_xml: '',
                issue_Dockerfile: '',
                solve_Dockerfile: '',
                issue_FileConfig: '',
                solve_FileConfig: '',
                issue_html: '',
                solve_html: '',
                create_at: '',
              });
            }}
          >
            Add Lesson
          </Button>

          <Button
            variant="contained"
            sx={{ mb: 2, ml: 2 }}
            startIcon={<UploadFile />}
            ref={triggerButtonRef}
            onClick={handleOpenUploadModal}
          >
            Upload CSV Files
          </Button>

          <Button
            variant="contained"
            startIcon={<UploadFile />}
            onClick={handleDownloadExcelTemplate}
            sx={{ mb: 2, ml: 2 }}
          >
            Download Excel Template
          </Button>

          <Dialog
            open={openModal}
            onClose={handleCloseUploadModal} // Ensure onClose is properly set
            disableEscapeKeyDown={false} // Allow ESC key to close the modal
            sx={{ '& .MuiDialog-paper': { width: '600px', maxWidth: '90%' } }}
          >
            <DialogTitle>
              Upload CSV Files
              <IconButton
                aria-label="close"
                onClick={handleCloseUploadModal}
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
              <Button onClick={handleCloseUploadModal} color="secondary">
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

          {/* Filters */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Filter by OWASP Year"
              fullWidth
              value={filters.owasp_year}
              onChange={(e) => handleFilterChange('owasp_year', e.target.value)}
            />
            <TextField
              label="Filter by OWASP"
              fullWidth
              value={filters.owasp}
              onChange={(e) => handleFilterChange('owasp', e.target.value)}
            />
            <TextField
              label="Filter by Issue Name"
              fullWidth
              value={filters.issueName}
              onChange={(e) => handleFilterChange('issueName', e.target.value)}
            />
          </Box>

          {/* Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>OWASP Year</TableCell>
                  <TableCell>OWASP</TableCell>
                  <TableCell>Issue Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Update at</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredLessons.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No lessons found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLessons.map((lesson) => (
                    <TableRow key={lesson._id}>
                      <TableCell>{lesson.owasp_year || 'N/A'}</TableCell>
                      <TableCell>{lesson.owasp || 'N/A'}</TableCell>
                      <TableCell>{lesson.issueName || 'N/A'}</TableCell>
                      <TableCell>
                        {lesson.description
                          ? `${lesson.description.substring(0, 50)}...`
                          : 'N/A'}
                      </TableCell>
                      <TableCell>{lesson.create_at || 'N/A'}</TableCell>
                      <TableCell>
                        <Button
                          variant="text"
                          color="primary"
                          onClick={() => handleEditLesson(lesson._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="text"
                          color="error"
                          onClick={() => handleDeleteLesson(lesson._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <ToastContainer position="top-right" />
        </Container>


        <Dialog
          open={openModal}
          onClose={handleCloseAddLessonModal}
          sx={{ '& .MuiDialog-paper': { width: '600px', maxWidth: '90%' } }}
          disableEnforceFocus={false}
          disableAutoFocus={false}
        >
          <DialogTitle>
            Upload CSV Files
            <IconButton
              aria-label="close"
              onClick={handleCloseUploadModal}
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
            <Button onClick={handleCloseUploadModal} color="secondary">
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

        {/* Modal for adding/editing lessons */}
        <Modal open={modalOpen} onClose={handleCloseAddLessonModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              maxHeight: '90vh',
              overflowY: 'auto',
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" gutterBottom>
                {editingIndex !== null ? 'Edit Lesson' : 'Add Lesson'}
              </Typography>
              <IconButton
                aria-label="close"
                onClick={handleCloseAddLessonModal}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                }}
              >
                <Close />
              </IconButton>
            </Box>


            {/* General Information */}
            <Accordion defaultExpanded >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">General Information</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  label="Issue Name"
                  fullWidth
                  value={newLesson.issueName}
                  onChange={(e) => setNewLesson({ ...newLesson, issueName: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Sub Issue Name"
                  fullWidth
                  value={newLesson.sub_issueName}
                  onChange={(e) => setNewLesson({ ...newLesson, sub_issueName: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="OWASP"
                  fullWidth
                  value={newLesson.owasp}
                  onChange={(e) => setNewLesson({ ...newLesson, owasp: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="OWASP Year"
                  fullWidth
                  value={newLesson.owasp_year?.replace('OWASP ', '') || ''}
                  onChange={(e) => {
                    const yearInput = e.target.value.replace(/\D/g, '');
                    setNewLesson((prevLesson) => ({
                      ...prevLesson,
                      owasp_year: yearInput ? `OWASP ${yearInput}` : '',
                    }));
                  }}
                  placeholder="Enter year (e.g., 2021)"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={newLesson.description}
                  onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Recommendation"
                  fullWidth
                  value={newLesson.recommendation}
                  onChange={(e) => setNewLesson({ ...newLesson, recommendation: e.target.value })}
                  sx={{ mb: 2 }}
                />
              </AccordionDetails>
            </Accordion>

            {/* Issue and Solve Code Sections */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Code Snippets</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle2" gutterBottom>
                  JavaScript
                </Typography>
                <TextField
                  label="Issue Code"
                  fullWidth
                  value={newLesson.issueCode_Javascript}
                  onChange={(e) => setNewLesson({ ...newLesson, issueCode_Javascript: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Solve Code"
                  fullWidth
                  value={newLesson.solveCode_Javascript}
                  onChange={(e) => setNewLesson({ ...newLesson, solveCode_Javascript: e.target.value })}
                  sx={{ mb: 2 }}
                />

                <Typography variant="subtitle2" gutterBottom>
                  Dotnet
                </Typography>
                <TextField
                  label="Issue Code"
                  fullWidth
                  value={newLesson.issueCode_Dotnet}
                  onChange={(e) => setNewLesson({ ...newLesson, issueCode_Dotnet: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Solve Code"
                  fullWidth
                  value={newLesson.solveCode_Dotnet}
                  onChange={(e) => setNewLesson({ ...newLesson, solveCode_Dotnet: e.target.value })}
                  sx={{ mb: 2 }}
                />

                <Typography variant="subtitle2" gutterBottom>
                  Java
                </Typography>
                <TextField
                  label="Issue Code"
                  fullWidth
                  value={newLesson.issueCode_Java}
                  onChange={(e) => setNewLesson({ ...newLesson, issueCode_Java: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Solve Code"
                  fullWidth
                  value={newLesson.solveCode_Java}
                  onChange={(e) => setNewLesson({ ...newLesson, solveCode_Java: e.target.value })}
                  sx={{ mb: 2 }}
                />

                <Typography variant="subtitle2" gutterBottom>
                  Other Configurations
                </Typography>
                <TextField
                  label="Issue Code (Pom.xml)"
                  fullWidth
                  value={newLesson.issue_Pom_xml}
                  onChange={(e) => setNewLesson({ ...newLesson, issue_Pom_xml: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Solve Code (Pom.xml)"
                  fullWidth
                  value={newLesson.solve_Pom_xml}
                  onChange={(e) => setNewLesson({ ...newLesson, solve_Pom_xml: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Issue Code (XML)"
                  fullWidth
                  value={newLesson.issue_xml}
                  onChange={(e) => setNewLesson({ ...newLesson, issue_xml: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Solve Code (XML)"
                  fullWidth
                  value={newLesson.solve_xml}
                  onChange={(e) => setNewLesson({ ...newLesson, solve_xml: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Issue Code (Dockerfile)"
                  fullWidth
                  value={newLesson.issue_Dockerfile}
                  onChange={(e) => setNewLesson({ ...newLesson, issue_Dockerfile: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Solve Code (Dockerfile)"
                  fullWidth
                  value={newLesson.solve_Dockerfile}
                  onChange={(e) => setNewLesson({ ...newLesson, solve_Dockerfile: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Issue Code (HTML)"
                  fullWidth
                  value={newLesson.issue_html}
                  onChange={(e) => setNewLesson({ ...newLesson, issue_html: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Solve Code (HTML)"
                  fullWidth
                  value={newLesson.solve_html}
                  onChange={(e) => setNewLesson({ ...newLesson, solve_html: e.target.value })}
                  sx={{ mb: 2 }}
                />
              </AccordionDetails>
            </Accordion>

            <Button
              variant="contained"
              onClick={handleAddOrUpdateLesson}
              sx={{ mt: 3, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            >
              {editingIndex !== null ? 'Update Lesson' : 'Add Lesson'}
            </Button>
          </Box>
        </Modal>
      </DashboardLayout >
    </>
  );
}
