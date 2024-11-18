import React, { useEffect, useState } from 'react';

interface Vulnerability {
    issueName: string | null; // Added issueName
    description: string | null;
    recommendation: string | null;
    issueCode_Javascript: string | null; // Added issueCode_Javascript
    issueCode_Java: string | null; // Added issueCode_Java
    issueCode_Dotnet: string | null; // Added issueCode_Dotnet
    solveCode_Javascript: string | null; // Added solveCode_Javascript
    solveCode_Java: string | null; // Added solveCode_Java
    solveCode_Dotnet: string | null; // Added solveCode_Dotnet
}

interface CodeFetcherProps {
    row: number;
    onFetchData: (
        issueName: string,
        description: string,
        recommendation: string,
        issueCode_Javascript: string,
        issueCode_Java: string,
        issueCode_Dotnet: string,
        solveCode_Javascript: string,
        solveCode_Java: string,
        solveCode_Dotnet: string,
       
    ) => void; // Updated to include new parameters
}

const CodeFetcher_IssueCode: React.FC<CodeFetcherProps> = ({ row, onFetchData }) => {
    const [data, setData] = useState<Vulnerability[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/getVulCode');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);

                const selectedRow: Vulnerability | undefined = result[row - 1]; // Use the Vulnerability type here
                if (selectedRow) {
                    onFetchData(
                        selectedRow.issueName || "No issue name available.", // Updated to include issueName
                        selectedRow.description || "No description available.",
                        selectedRow.recommendation || "No recommendation available.",
                        selectedRow.issueCode_Javascript || "No Javascript code available.",
                        selectedRow.issueCode_Java || "No Java code available.",
                        selectedRow.issueCode_Dotnet || "No .NET code available.",
                        selectedRow.solveCode_Javascript || "No JavaScript code available.", // Updated to use solveCode_Javascript
                        selectedRow.solveCode_Java || "No Java code available.", // Updated to use solveCode_Java
                        selectedRow.solveCode_Dotnet || "No .NET code available.", // Updated to use solveCode_Dotnet
                      
                    );
                }
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchData();
    }, [row, onFetchData]);

    return <div>{error && <div>{error}</div>}</div>;
};

export default CodeFetcher_IssueCode;
