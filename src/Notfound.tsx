import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: "bold", color: "primary.main" }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mt: 2, color: "text.secondary" }}>
        Oops! The page you are looking for doesn’t exist.
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: "text.secondary" }}>
        It might have been moved or deleted.
      </Typography>

      <Box sx={{ mt: 5 }}>
        <Button variant="contained" color="primary" sx={{p:1.5,color:'white'}} onClick={() => navigate("/")}>
          Go Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
