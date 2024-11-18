import React, { useEffect, useState } from 'react';
import CodeWindow from './CodeWindow'; // Import your CodeWindow component

// Define the structure of your data (adjust according to your MongoDB collection)
interface User {
    email: string;
}

const CodeFetcher: React.FC = () => {
    const [data, setData] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [codeSnippet, setCodeSnippet] = useState<string>(''); // State to store formatted code snippet

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/getEmail'); // Fetch from your API
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result: User[] = await response.json();
                setData(result);

                // Format the fetched data into a string format for code display
                const snippet = result.map(user => user.email).join('\n');
                setCodeSnippet(snippet); // Store formatted snippet
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {/* Pass the formatted code snippet to CodeWindow */}
            <CodeWindow
                codeSnippets={{ javascript: codeSnippet }} // Example: passing the code as a JavaScript snippet
            />
        </div>
    );
};

export default CodeFetcher;
