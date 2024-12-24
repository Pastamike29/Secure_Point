// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Box, Container, Typography, CircularProgress } from '@mui/material';
// import CodeDescriptionTemplate from '../CodeExample/Component/CodeDescriptionTemplate';
// import CodeExampleLayout from '../CodeExample/Component/CodeExampleLayout';

// const DynamicLessonPage = () => {
//     const { issueName } = useParams<{ issueName: string }>();
//     const [data, setData] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/api/vulnerabilities/${encodeURIComponent(issueName || '')}`);
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch data');
//                 }
//                 const result = await response.json();
//                 setData(result.vulnerabilities || []);
//             } catch (error) {
//                 console.error('Error fetching vulnerability data:', error);
//                 setError('Failed to load vulnerability data.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [issueName]);

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
//     if (error) return <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>{error}</Typography>;

//     return (
//         <CodeExampleLayout title={issueName || 'Unknown Issue'}>
//             <Container>
//                 {data.length > 0 ? (
//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
//                         {data.map((vul, index) => (
//                             <CodeDescriptionTemplate
//                                 key={index}
//                                 row={index + 1}
//                                 vulnerability={vul}
//                             />
//                         ))}
//                     </Box>
//                 ) : (
//                     <Typography sx={{ mt: 4, textAlign: 'center' }}>No vulnerabilities found for "{issueName}".</Typography>
//                 )}
//             </Container>
//         </CodeExampleLayout>
//     );
// };

// export default DynamicLessonPage;N
