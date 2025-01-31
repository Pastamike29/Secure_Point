import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import LessonLayout from '../lessons/Component/LessonLayout';
import CodeDescriptionTemplateLessonPage from './Component/CodeDescriptionTemplateLessonPage';
import { toast } from 'react-toastify';

const DynamicLessonPage = () => {
    const { issueName } = useParams<{ issueName: string }>();
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Issue Name:', issueName); // Debug issueName
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/lessons/${encodeURIComponent(issueName || '')}`
                );
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
                const result = await response.json();
                console.log('Fetched Data:', result); // Debug API response
                setData(Array.isArray(result) ? result : [result]); // Ensure data is an array
            } catch (error) {
                toast.error('This issue name is inaccurate')
                navigate('*'); 

            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [issueName]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }
    if (error) {
        return <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>{error}</Typography>;
    }

    return (
        <LessonLayout title={issueName || 'Unknown Issue'}>
            <Container>
                {data.length > 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {data.map((vul, index) => (
                            <CodeDescriptionTemplateLessonPage
                                key={index}
                                row={index + 1}
                                vulnerability={vul}
                            />
                        ))}
                    </Box>
                ) : (
                    <Typography sx={{ mt: 4, textAlign: 'center' }}>
                        No vulnerabilities found for "{issueName}".
                    </Typography>
                )}
            </Container>
        </LessonLayout>
    );
};

export default DynamicLessonPage;
