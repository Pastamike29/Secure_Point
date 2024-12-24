import { Box, SxProps, Typography } from '@mui/material';
import CodeWindow from '../../../Components/Code/CodeWindow'; // Adjust this path based on your project structure
import React from 'react';

// Define the vulnerability type
interface Vulnerability {
    sub_issueName: string;
    description: string;
    recommendation: string;
    issueCode_Javascript?: string;
    issueCode_Java?: string;
    issueCode_Dotnet?: string;
    issue_Pom_xml?: string;
    issue_xml?: string;
    issue_Dockerfile?: string;
    solve_Dockerfile?: string;
    solve_xml?: string;
    solve_Pom_xml?: string;
    solveCode_Javascript?: string;
    solveCode_Java?: string;
    solveCode_Dotnet?: string;
    issue_FileConfig?: string;
    solve_FileConfig?: string;
    issue_html?: string;
    solve_html?: string;
}

interface CodeDescriptionProps {
    sx?: SxProps;
    row: number;
    vulnerability: Vulnerability; // Accept vulnerability as a prop
}

export default function CodeDescriptionTemplate({
    sx,
    vulnerability,
}: CodeDescriptionProps) {
    const {
        sub_issueName,
        description,
        recommendation,
        issueCode_Javascript,
        issueCode_Java,
        issueCode_Dotnet,
        issue_Pom_xml,
        issue_xml,
        issue_Dockerfile,
        solve_Pom_xml,
        solve_xml,
        solve_Dockerfile,
        solveCode_Javascript,
        solveCode_Java,
        solveCode_Dotnet,
        issue_FileConfig,
        solve_FileConfig,
        issue_html, 
        solve_html 
    } = vulnerability;

// Function to filter and return only languages with code
const getCodeSnippets = (codeSnippets: { [key: string]: string | undefined }) => {
    return Object.entries(codeSnippets)
        .filter(([_, code]) => code) // Keep only entries where code exists
        .reduce((acc, [language, code]) => {
            acc[language] = code as string;
            return acc;
        }, {} as { [key: string]: string });
};

const issueCodeSnippets = getCodeSnippets({
    javascript: issueCode_Javascript,
    java: issueCode_Java,
    dotnet: issueCode_Dotnet,
    PomXML: issue_Pom_xml,
    XML: issue_xml,
    Docker: issue_Dockerfile,
    FileConfig: issue_FileConfig,
    html: issue_html,
});

const solveCodeSnippets = getCodeSnippets({
    javascript: solveCode_Javascript,
    java: solveCode_Java,
    dotnet: solveCode_Dotnet,
    PomXML: solve_Pom_xml,
    XML: solve_xml,
    Docker: solve_Dockerfile,
    FileConfig: solve_FileConfig,
    html: solve_html,
});

return (
    <Box sx={{ pt: 6, pb: 9, ...sx }}>
        <Typography variant='h5' sx={{ mb: 2 }}>
            {sub_issueName || 'No issue name available'}
        </Typography>
        <Typography
            variant="body1"
            sx={{ whiteSpace: 'pre-line' }} // Preserve line breaks in description
        >
            {description || 'No description available'}
        </Typography>

        {Object.keys(issueCodeSnippets).length > 0 && (
            <>
                <Typography variant='h5' sx={{ mt: 8 }}>
                    Code Examples
                </Typography>
                <CodeWindow sx={{ my: 7 }} codeSnippets={issueCodeSnippets} />
            </>
        )}

        <Typography variant='h5' sx={{ mb: 2 }}>
            Recommendation
        </Typography>
        <Typography
            variant="body1"
            sx={{ whiteSpace: 'pre-line' }} // Preserve line breaks in recommendation
        >
            {recommendation || 'No recommendation available'}
        </Typography>

        {Object.keys(solveCodeSnippets).length > 0 && (
            <>
                <Typography variant='h5' sx={{ mt: 8 }}>
                    How to Solve
                </Typography>
                <CodeWindow sx={{ my: 7 }} codeSnippets={solveCodeSnippets} />
            </>
        )}
    </Box>
);
}