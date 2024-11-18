import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import CodeDescriptionTemplate from '../Component/CodeDescriptionTemplate';
import CodeExampleLayout from '../Component/CodeExampleLayout';

const DynamicVulPage = () => {
     const { issueName } = useParams<{ issueName: string }>(); // Get the issueName from the URL
     const [data, setData] = useState<any[]>([]); // Updated to an array to handle multiple vulnerabilities
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const response = await fetch(`http://localhost:5000/api/vulnerabilities/${issueName}`);
                    if (!response.ok) {
                         throw new Error('Network response was not ok');
                    }
                    const result = await response.json();
                    setData(result.vulnerabilities); // Assume result contains 'vulnerabilities' field as array
               } catch (error) {
                    console.error('Error fetching vulnerability data:', error);
                    setError('Failed to load vulnerability data.');
               } finally {
                    setLoading(false);
               }
          };

          fetchData();
     }, [issueName]); // Fetch when issueName changes

     if (loading) return <Typography>Loading...</Typography>;
     if (error) return <Typography color="red">{error}</Typography>;

     return (
          <CodeExampleLayout title={issueName}>
               <Container>
                    {data && data.length > 0 ? (
                         <Box>
                              {/* Map through the vulnerabilities and create a new CodeDescriptionTemplate for each */}
                              {data.map((vul, index) => (
                                   <CodeDescriptionTemplate
                                        key={index}
                                        row={index + 1} // Auto-increment row number
                                        vulnerability={vul} // Pass the full vulnerability object
                                   />
                              ))}

                         </Box>
                    ) : (
                         <Typography>No vulnerabilities found for {issueName}.</Typography>
                    )}
               </Container>
          </CodeExampleLayout>
     );
};

export default DynamicVulPage;
