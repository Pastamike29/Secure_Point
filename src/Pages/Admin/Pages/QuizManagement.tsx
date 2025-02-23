import React, { useState, useEffect } from "react";
import {
     Container,
     TextField,
     Button,
     List,
     ListItem,
     ListItemText,
     IconButton,
     Typography,
     Box,
     Modal,
     ListItemSecondaryAction,
     CircularProgress,
} from "@mui/material";
import { Delete, Edit, CloudUpload, Clear } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboardLayout from "../Component/AdminDashboardLayout";

export interface Quiz {
     id: string;
     question: string;
     options: string[];
     answer: string;
     image: string;
}

const API_URL = "http://127.0.0.1:5000/";

const QuizManagement: React.FC = () => {
     const [quizzes, setQuizzes] = useState<Quiz[]>([]);
     const [loading, setLoading] = useState(false);
     const [formData, setFormData] = useState<Omit<Quiz, "id"> & { file?: File }>({
          question: "",
          options: ["", "", "", "", ""],
          answer: "",
          image: "",
          file: undefined,
     });

     const [editId, setEditId] = useState<string | null>(null);
     const [open, setOpen] = useState(false);

     useEffect(() => {
          fetchQuizzes();
     }, []);

     const fetchQuizzes = async () => {
          try {
               const response = await axios.get<Quiz[]>(`${API_URL}/getQuizzes`);
               setQuizzes(response.data);
          } catch (error) {
               console.error("Error fetching quizzes:", error);
          }
     };

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const handleChoiceChange = (index: number, value: string) => {
          const updatedOptions = [...formData.options];
          updatedOptions[index] = value;
          setFormData({ ...formData, options: updatedOptions });
     };

     const handleSubmit = async () => {
          setLoading(true);
          try {
               let uploadedImageUrl = formData.image;

               // ✅ Upload new image only if selected
               if (formData.file) {
                    const imageData = new FormData();
                    imageData.append("file", formData.file);

                    const uploadResponse = await axios.post(`${API_URL}/uploadImage`, imageData, {
                         headers: { "Content-Type": "multipart/form-data" },
                    });

                    uploadedImageUrl = uploadResponse.data.imageUrl;
               }

               const quizData = {
                    question: formData.question,
                    options: formData.options,
                    answer: formData.answer,
                    image: uploadedImageUrl, // ✅ If no new image is uploaded, the old one is kept
               };

               if (editId) {
                    await axios.put(`${API_URL}/updateQuiz/${editId}`, quizData);
                    toast.success("Quiz updated successfully! ✅");
               } else {
                    await axios.post(`${API_URL}/uploadQuiz`, [quizData], {
                         headers: { "Content-Type": "application/json" },
                    });
                    toast.success("Quiz created successfully! 🎉");
               }

               fetchQuizzes();
               handleClose();
          } catch (error) {
               toast.error("Error saving quiz! ❌");
               console.error("Error saving quiz:", error);
          } finally {
               setLoading(false);
          }
     };

     const handleEdit = (quiz: Quiz) => {
          setEditId(quiz.id);
          setFormData({
               question: quiz.question,
               options: quiz.options,
               answer: quiz.answer,
               image: quiz.image, // ✅ Keep old image
               file: undefined,
          });
          setOpen(true);
     };

     const handleDelete = async (quizId: string) => {
          try {
               await axios.delete(`${API_URL}/deleteQuiz/${quizId}`);
               fetchQuizzes();
               toast.success("Quiz deleted successfully! ✅");
          } catch (error) {
               toast.error("Error deleting quiz! ❌");
               console.error("Error deleting quiz:", error);
          }
     };

     const handleOpen = () => {
          setEditId(null);
          setFormData({
               question: "",
               options: ["", "", "", "", ""],
               answer: "",
               image: "",
               file: undefined,
          });
          setOpen(true);
     };

     const handleClose = () => setOpen(false);

     return (
          <AdminDashboardLayout>
               <Container>
                    <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>Quiz Admin Panel</Typography>
                    <Button variant="contained" color="primary" sx={{my:3}} onClick={handleOpen}>Add New Quiz</Button>

                    <List>
                         {quizzes.map((quiz) => (
                              <ListItem key={quiz.id}>
                                   <ListItemText primary={quiz.question} secondary={`Answer: ${quiz.answer}`} />
                                   <ListItemSecondaryAction>
                                        <IconButton edge="end" color="primary" onClick={() => handleEdit(quiz)}>
                                             <Edit />
                                        </IconButton>
                                        <IconButton edge="end" color="error" onClick={() => handleDelete(quiz.id)}>
                                             <Delete />
                                        </IconButton>
                                   </ListItemSecondaryAction>
                              </ListItem>
                         ))}
                    </List>

                    {/* ✅ Modal for Creating/Editing Quiz */}
                    <Modal open={open} onClose={handleClose}>
                         <Box sx={{
                              width: 400,
                              maxHeight: "80vh",
                              overflowY: "auto",
                              padding: 3,
                              bgcolor: "background.paper",
                              margin: "5% auto",
                              borderRadius: 2
                         }}>
                              <Typography variant="h6">{editId ? "Edit Quiz" : "Create Quiz"}</Typography>

                              <TextField name="question" label="Question" fullWidth value={formData.question} onChange={handleChange} sx={{ mt: 2 }} />

                              {formData.options.map((option, index) => (
                                   <TextField
                                        key={index}
                                        label={`Choice ${index + 1}`}
                                        fullWidth
                                        value={option}
                                        onChange={(e) => handleChoiceChange(index, e.target.value)}
                                        sx={{ mt: 2 }}
                                   />
                              ))}

                              <TextField name="answer" label="Correct Answer" fullWidth value={formData.answer} onChange={handleChange} sx={{ mt: 2 }} />

                              {/* ✅ Image Upload UI */}
                              <Box sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                   {formData.image && (
                                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                             {/* ✅ Show Old Image if Available */}
                                             <Box
                                                  component="img"
                                                  src={formData.image}
                                                  sx={{
                                                       width: 150, // ✅ Bigger Image
                                                       height: 100,
                                                       objectFit: "cover",
                                                       borderRadius: "8px",
                                                       border: "2px solid #ccc",
                                                       mr: 2,
                                                  }}
                                             />
                                             <IconButton onClick={() => setFormData({ ...formData, image: "", file: undefined })} color="error">
                                                  <Clear fontSize="large" />
                                             </IconButton>
                                        </Box>
                                   )}
                                   <Button component="label" variant="outlined" startIcon={<CloudUpload />}>
                                        {formData.file ? formData.file.name : "Upload New Image"}
                                        <input
                                             type="file"
                                             accept="image/*"
                                             hidden
                                             onChange={(e) => {
                                                  if (e.target.files) {
                                                       setFormData({ ...formData, file: e.target.files[0] });
                                                  }
                                             }}
                                        />
                                   </Button>
                              </Box>

                              <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }} disabled={loading}>
                                   {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : editId ? "Update Quiz" : "Create Quiz"}
                              </Button>
                         </Box>
                    </Modal>
               </Container>
          </AdminDashboardLayout>
     );
};

export default QuizManagement;
