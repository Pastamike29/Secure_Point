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
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast } from 'react-toastify';
import { Close, UploadFile } from '@mui/icons-material';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboardLayout from '../Component/AdminDashboardLayout';
import { SelectChangeEvent } from '@mui/material';
import DOMPurify from 'dompurify';


export default function LessonPageManagement() {

  const [lessons, setLessons] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [removingImage, setRemovingImage] = useState<string | null>(null);
  const [editingIndex, setEditingIndex] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [filteredLessons, setFilteredLessons] = useState<any[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const sanitizeInput = (input: string) => DOMPurify.sanitize(input);



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
    owasp_year: '',
    imagesURL: [],
    mainDescription: '',
    descriptions: [''], // Array for descriptions
    recommendations: [''], // Array for recommendations
    issueCode_Java: [''], // Array for Java issue codes
    issueCode_Dotnet: [''], // Array for Dotnet issue codes
    issueCode_Javascript: [''], // Array for JavaScript issue codes
    issueCode_Python: [''], // Array for Python issue codes (new)
    issue_Pom_xml: [''], // Array for Pom.xml issue codes
    issue_xml: [''], // Array for XML issue codes
    issue_Dockerfile: [''], // Array for Dockerfile issue codes
    issue_html: [''], // Array for HTML issue codes
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


  const handleAddField = (field: string) => {
    setNewLesson((prevLesson) => ({
      ...prevLesson,
      [field]: Array.isArray(prevLesson[field]) ? [...prevLesson[field], ''] : [''],
    }));
  };


  const handleRemoveField = (field: string, index: number) => {
    setNewLesson((prevLesson) => ({
      ...prevLesson,
      [field]: (prevLesson[field] || []).filter((_, i) => i !== index), // Ensure the field is an array
    }));
  };

  const handleFieldChange = (field: string, index: number, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setNewLesson((prevLesson) => ({
      ...prevLesson,
      [field]: prevLesson[field].map((item, i) => (i === index ? sanitizedValue : item)),
    }));
  };

  const handleSingleFieldChange = (field: string, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setNewLesson((prevLesson) => ({
      ...prevLesson,
      [field]: sanitizedValue,
    }));
  };

  const handleChangeMainDescription = (value: string) => {
    setNewLesson((prevLesson) => ({
      ...prevLesson,
      mainDescription: value,
    }));
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
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.error || 'Failed to upload files');
        }

        const { message, skipped } = responseData;

        toast.success(message || 'Upload Successfully!');
        if (skipped) {
          alert(`Some rows were skipped because they are duplicates:\n\n${skipped}`);
        }

        setFiles([]);
        setOpenModal(false);
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to upload. Please check the file format.');
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

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0]; // Only handle the first selected file
      const fileSizeKB = file.size / 1024; // Convert size to KB

      // Check if file size exceeds 100KB
      if (fileSizeKB > 100) {
        toast.error('You uploaded a file over 100KB. Please upload an image less than 100KB.');
        return; // Prevent upload if size exceeds the limit
      }

      const formData = new FormData();
      formData.append('file', file);

      setIsUploading(true); // Show loading animation

      try {
        const response = await fetch(`${API_BASE_URL}/upload-image`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || 'Failed to upload image');
        }

        const { imageUrl } = await response.json();
        setNewLesson((prevLesson) => ({
          ...prevLesson,
          imagesURL: [...(prevLesson.imagesURL || []), imageUrl],
        }));
        toast.success('Image uploaded successfully!');
      } catch (error) {
        toast.error('Failed to upload image. Check the backend or network.');
      } finally {
        setIsUploading(false); // Hide loading animation
      }
    }
  };


  const handleRemoveImage = async (imageToRemove: string) => {
    setRemovingImage(imageToRemove); // Show loading animation for the specific image

    try {
      // Call the backend to delete the image from Firebase
      const response = await fetch(`${API_BASE_URL}/delete-image`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: imageToRemove }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || 'Failed to delete image from Firebase.');
        return;
      }

      // If successful, remove the image from the state
      setNewLesson((prevLesson) => ({
        ...prevLesson,
        imagesURL: prevLesson.imagesURL.filter((img: string) => img !== imageToRemove),
      }));

      toast.success('Image removed successfully!');
    } catch (error) {
      toast.error('Failed to remove image.');
    } finally {
      setRemovingImage(null); // Hide loading animation
    }
  };




  const handleAddOrUpdateLesson = async () => {
    try {
      const endpoint =
        editingIndex !== null
          ? `${API_BASE_URL}/lessons/${editingIndex}`
          : `${API_BASE_URL}/lessons`;
      const method = editingIndex !== null ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLesson),
      });

      if (!response.ok) throw new Error(`Error from API: ${response.statusText}`);

      toast.success(
        editingIndex !== null
          ? 'Lesson updated successfully!'
          : 'Lesson added successfully!'
      );
      setModalOpen(false);
      setEditingIndex(null);
      fetchLessons();
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
    if (!lessonToEdit) return;

    setEditingIndex(lessonId);

    const updatedLesson = { ...lessonToEdit };

    // Dynamically ensure fields like descriptions, recommendations, etc., are arrays
    Object.keys(updatedLesson).forEach((key) => {
      if (
        key.startsWith('issueCode_') ||
        key.startsWith('solveCode_') ||
        key === 'descriptions' ||
        key === 'recommendations' ||
        key === 'imagesURL'
      ) {
        if (!Array.isArray(updatedLesson[key])) {
          updatedLesson[key] = updatedLesson[key] ? [updatedLesson[key]] : [];
        }
      }
    });

    // Ensure OWASP year is handled as a string
    if (typeof updatedLesson.owasp_year !== 'string') {
      updatedLesson.owasp_year = updatedLesson.owasp_year ? `${updatedLesson.owasp_year}` : '';
    }

    setNewLesson(updatedLesson);
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

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    setNewLesson((prevLesson) => ({
      ...prevLesson,
      owasp_year: event.target.value, // Automatically inferred as a string
    }));
  };

  return (
    <>
      <AdminDashboardLayout>
        <Container>
          <Typography variant="h4" gutterBottom>
              Lesson Management
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
                mainDescription: '',
                descriptions: [''],
                recommendations: [''],
                issueCode_Java: [''],
                issueCode_Dotnet: [''],
                issueCode_Javascript: [''],
                issue_Pom_xml: [''],
                issue_xml: [''],
                issue_Dockerfile: [''],
                issue_html: [''],
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
                  onChange={(e) => handleSingleFieldChange('issueName', e.target.value)}
                  sx={{ mb: 2 }}
                />

                <TextField
                  label="Sub Issue Name"
                  fullWidth
                  value={newLesson.sub_issueName}
                  onChange={(e) => handleSingleFieldChange('sub_issueName', e.target.value)}
                  sx={{ mb: 2 }}
                />

                <TextField
                  label="OWASP"
                  fullWidth
                  value={newLesson.owasp}
                  onChange={(e) => handleSingleFieldChange('owasp', e.target.value)}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="owasp-year-label">OWASP Year</InputLabel>
                  <Select
                    labelId="owasp-year-label"
                    value={newLesson.owasp_year}
                    onChange={handleYearChange}
                    label="OWASP Year"
                  >
                    <MenuItem value="2021">2021</MenuItem>
                    <MenuItem value="2025">2025</MenuItem>
                    <MenuItem value="2029">2029</MenuItem>
                    <MenuItem value="2033">2033</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Main Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={newLesson.mainDescription}
                  onChange={(e) => handleChangeMainDescription(e.target.value)}
                  sx={{ mb: 2 }}
                />

              </AccordionDetails>
            </Accordion>


            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Images</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  * Please upload only image files smaller than 100 KB.
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={!isUploading && <UploadFile />}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <Box display="flex" alignItems="center" gap={1}>
                      <CircularProgress size={20} sx={{ color: 'primary.main' }} />
                    </Box>
                  ) : (
                    'Upload Images'
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={handleImageUpload}
                  />
                </Button>
                <Box mt={2}>
                  {newLesson.imagesURL?.length > 0 ? (
                    newLesson.imagesURL.map((img: string, index: number) => (
                      <Box key={index} sx={{ display: 'flex', mb: 1 }}>
                        <img
                          src={img}
                          alt={`Uploaded ${index}`}
                          style={{ width: '100px', height: '100px', marginRight: '10px' }}
                        />
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleRemoveImage(img)}
                          disabled={removingImage === img}
                        >
                          {removingImage === img ? (
                            <Box display="flex" alignItems="center" gap={1}>
                              <CircularProgress size={20} sx={{ color: 'primary.main' }} />
                              Removing...
                            </Box>
                          ) : (
                            'Remove'
                          )}
                        </Button>
                      </Box>
                    ))
                  ) : (
                    <Typography>No images uploaded</Typography>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Descriptions</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {(newLesson.descriptions || []).map((desc: string, index: number) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TextField
                      label={`Description ${index + 1}`}
                      fullWidth
                      multiline
                      rows={3}
                      value={desc || ''} // Fallback to empty string
                      onChange={(e) =>
                        handleFieldChange('descriptions', index, e.target.value)
                      }
                      sx={{ mr: 2 }}
                    />
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleRemoveField('descriptions', index)}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  onClick={() => handleAddField('descriptions')}
                  sx={{ mt: 2 }}
                >
                  Add Description
                </Button>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Recommendation</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {(newLesson.recommendations || []).map((rec: string, index: number) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TextField
                      label={`Recommendation ${index + 1}`}
                      fullWidth
                      value={rec || ''} // Fallback to empty string
                      onChange={(e) =>
                        handleFieldChange('recommendations', index, e.target.value)
                      }
                      sx={{ mr: 2 }}
                    />
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleRemoveField('recommendations', index)}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  onClick={() => handleAddField('recommendations')}
                  sx={{ mt: 2 }}
                >
                  Add Recommendation
                </Button>
              </AccordionDetails>
            </Accordion>

            {/* Issue and Solve Code Sections */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Code Snippets</Typography>
              </AccordionSummary>
              <AccordionDetails>

                {/* Repeat for other languages */}
                {['Java', 'Javascript', 'Python', 'Dotnet', 'Pom_xml', 'xml', 'Dockerfile', 'html'].map((language) => {
                  const fieldName = `issueCode_${language}`; // Dynamically create field names
                  return (
                    <Accordion key={language}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{language.replace('_', '.')}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {/* Render Issue Codes */}
                        {(Array.isArray(newLesson[fieldName]) ? newLesson[fieldName] : []).map(
                          (item: string, index: number) => (
                            <Box key={index} display="flex" alignItems="center" mb={2}>
                              <TextField
                                label={`${language} Issue Code ${index + 1}`}
                                fullWidth
                                value={item || ''} // Ensure value is a string
                                onChange={(e) =>
                                  handleFieldChange(fieldName, index, e.target.value)
                                }
                                sx={{ mr: 2 }}
                              />
                              <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleRemoveField(fieldName, index)}
                              >
                                Remove
                              </Button>
                            </Box>
                          )
                        )}
                        <Button
                          variant="outlined"
                          onClick={() => handleAddField(fieldName)}
                          sx={{ mt: 2 }}
                        >
                          Add {language} Issue Code
                        </Button>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
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
      </AdminDashboardLayout >
    </>
  );
}
