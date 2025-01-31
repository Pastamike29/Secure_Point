import React from 'react';
import { Box, SxProps, Typography } from '@mui/material';
import CodeWindow from '../../../Components/Code/CodeWindow'; // Adjust this path based on your project structure
import FitImage from '../../../Components/FitImage'; // Ensure the FitImage component is defined

// Define the vulnerability type
interface Vulnerability {
    sub_issueName: string;
    mainDescription?: string; // Main description field
    descriptions?: string[]; // Ensure this is optional
    recommendations?: string[]; // Ensure this is optional
    imagesURL?: string[]; // Ensure this is optional
    issueCode_Javascript?: string[];
    issueCode_Java?: string[];
    issueCode_Dotnet?: string[];
    issueCode_Python?: string[]; // Added Python field
    issueCode_Pom_xml?: string[];
    issue_xml?: string[];
    issue_Dockerfile?: string[];
    issue_FileConfig?: string[];
    issue_html?: string[];
}

interface CodeDescriptionProps {
    sx?: SxProps;
    row: number;
    vulnerability: Vulnerability;
}

export default function CodeDescriptionTemplateLessonPage({
    sx,
    vulnerability,
}: CodeDescriptionProps) {
    const {
        sub_issueName,
        mainDescription,
        descriptions = [], // Default to empty array
        recommendations = [], // Default to empty array
        imagesURL = [], // Default to empty array
        issueCode_Javascript = [],
        issueCode_Java = [],
        issueCode_Dotnet = [],
        issueCode_Python = [], // Default to empty array for Python
        issueCode_Pom_xml = [],
        issue_xml = [],
        issue_Dockerfile = [],
        issue_FileConfig = [],
        issue_html = [],
    } = vulnerability;

    // Languages and corresponding issue code arrays
    const languages = ['javascript', 'java', 'python', 'dotnet', 'PomXML', 'XML', 'Docker', 'FileConfig', 'html'];
    const issues = [
        Array.isArray(issueCode_Javascript) ? issueCode_Javascript : [],
        Array.isArray(issueCode_Java) ? issueCode_Java : [],
        Array.isArray(issueCode_Python) ? issueCode_Python : [], // Python codes
        Array.isArray(issueCode_Dotnet) ? issueCode_Dotnet : [],
        Array.isArray(issueCode_Pom_xml) ? issueCode_Pom_xml : [],
        Array.isArray(issue_xml) ? issue_xml : [],
        Array.isArray(issue_Dockerfile) ? issue_Dockerfile : [],
        Array.isArray(issue_FileConfig) ? issue_FileConfig : [],
        Array.isArray(issue_html) ? issue_html : [],
    ];

    // Group issue codes by index
    const groupedCodeSnippets: { index: number; codeSnippets: Record<string, string> }[] = [];
    const maxIssues = Math.max(...issues.map((arr) => arr.length), 0); // Find max number of items in any array

    for (let i = 0; i < maxIssues; i++) {
        const codeSnippets: Record<string, string> = {};
        languages.forEach((lang, langIndex) => {
            const codeArray = issues[langIndex];
            if (codeArray && codeArray[i]) {
                codeSnippets[lang] = codeArray[i];
            }
        });
        groupedCodeSnippets.push({ index: i, codeSnippets });
    }

    return (
        <Box sx={{ pt: 6, pb: 9, ...sx }}>
            {/* Sub Issue Name */}
            {sub_issueName && (
                <Typography variant="h5" sx={{ mb: 2 }}>
                    {sub_issueName}
                </Typography>
            )}

            {/* Images */}
            {imagesURL.length > 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                    {imagesURL.map((image, index) => (
                        <FitImage key={`image-${index}`} src={image} />
                    ))}
                </Box>
            )}

            {/* Main Description */}
            {mainDescription && (
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 4 }}>
                    {mainDescription}
                </Typography>
            )}

            {/* Descriptions and Code Snippets */}
            {groupedCodeSnippets.map(({ index, codeSnippets }) => (
                <Box key={`codepair-${index}`} sx={{ mb: 4 }}>
                    {/* Description */}
                    {descriptions[index] && (
                        <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 2 }}>
                            {descriptions[index]}
                        </Typography>
                    )}

                    {/* Code Window */}
                    <CodeWindow sx={{ my: 4 }} codeSnippets={codeSnippets} />

                    {/* Recommendation */}
                    {recommendations[index] && (
                        <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mt: 2 }}>
                            {recommendations[index]}
                        </Typography>
                    )}
                </Box>
            ))}
        </Box>
    );
}
