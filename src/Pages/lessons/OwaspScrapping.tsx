import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Grid } from "@mui/material";

interface OwaspItem {
  title: string;
  description: string;
}

function OwaspScrapping() {
  const [owaspData, setOwaspData] = useState<OwaspItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/owasp-top-10");
        if (!response.ok) {
          throw new Error("Failed to fetch OWASP data");
        }
        const data = await response.json();
        console.log("Fetched OWASP data:", data); // Debugging
        // Map data to ensure structure matches OwaspItem
        const mappedData = data.map((item: any) => ({
          title: item.title || "No Title",
          description: item.description || "No Description",
        }));
        setOwaspData(mappedData);
      } catch (error: any) {
        console.error("Error fetching OWASP data:", error);
        setError(error.message || "Unknown error");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        OWASP Top 10
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        {owaspData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography>{item.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default OwaspScrapping;
