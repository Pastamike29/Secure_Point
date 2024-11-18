import React, { useState } from 'react';
import { Modal, Box, Button, Typography, TextField, IconButton } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Email, PhotoCamera, Close } from '@mui/icons-material';
import axios from 'axios';

const FeedbackModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { control, handleSubmit, reset } = useForm();
  const [image, setImage] = useState<File | null>(null);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('message', data.message);
    if (image) formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/feedback', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Feedback sent successfully!');
    } catch (error) {
      console.error('Error sending feedback:', error);
    }

    reset();
    setImage(null); // Clear the image
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      // Only accept png and jpg files
      if (selectedFile.type === 'image/png' || selectedFile.type === 'image/jpeg') {
        setImage(selectedFile);
      } else {
        alert('Please upload a .png or .jpg file');
      }
    }
  };

  const removeImage = () => {
    setImage(null); // Clear the image
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        p: 4,
        bgcolor: 'background.paper',
        width: 600,
        mx: 'auto',
        mt: 8,
        borderRadius: 1,
        boxShadow: 3,
      }}>
        <Typography variant="h6" mb={2}>Submit Your Feedback</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Name" fullWidth required sx={{ mb: 2 }} />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Email" type="email" fullWidth required sx={{ mb: 2 }} />
            )}
          />
          <Controller
            name="message"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Feedback" multiline rows={12} fullWidth required sx={{ mb: 2 }} />
            )}
          />

          <label htmlFor="upload-photo">
            <input
              accept="image/png, image/jpeg"
              id="upload-photo"
              type="file"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
            <Typography variant="caption" sx={{ ml: 1 }}>
              {image ? image.name : "Upload a .png or .jpg image"}
            </Typography>
            {image && (
              <IconButton onClick={removeImage} color="error" component="span" sx={{ ml: 1 }}>
                <Close />
              </IconButton>
            )}
          </label>

          <Button type="submit" variant="contained" fullWidth startIcon={<Email />} sx={{ mt: 3 }}>
            Submit Feedback
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default FeedbackModal;
