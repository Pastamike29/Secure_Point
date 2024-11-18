import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import { Box, IconButton, MenuItem, Select, FormControl, SxProps } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SelectChangeEvent } from '@mui/material'; // Import SelectChangeEvent

interface CodeWindowProps {
  codeSnippets: Record<string, string>; // Object with code snippets for different languages
  initialLanguage?: string; // Optional prop for initial language
  sx?: SxProps; // Optional style prop
}

export default function CodeWindow({ codeSnippets, initialLanguage = 'javascript', sx }: CodeWindowProps) {
  const [language, setLanguage] = useState(initialLanguage); // Default to initialLanguage
  const [copied, setCopied] = useState(false);

  // Filter out languages that have 'N/A' as their code snippet
  const languageOptions = Object.keys(codeSnippets).filter(lang => codeSnippets[lang] !== 'N/A'); // Exclude "N/A"

  useEffect(() => {
    if (codeSnippets[language] && Prism.languages[language]) {
      Prism.highlightAll();
    }
  }, [codeSnippets, language]);

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value as string);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Show "copied" state for 2 seconds
  };

  const currentCode = codeSnippets[language] || 'No code available for this language.';

  return (
    <Box sx={{ position: 'relative', maxWidth: '100%', mb: 4, textAlign: 'left', overflowY: 'auto', ...sx }}>
      {/* Language Selector */}
      <FormControl variant="outlined" sx={{ mb: 2, minWidth: 120 }}>
        <Select
          value={language}
          onChange={handleLanguageChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Select language' }}
        >
          {languageOptions.map((lang) => (
            <MenuItem key={lang} value={lang}>
              {lang.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Code block */}
      {currentCode ? (
        <pre className={`language-${language}`}>
          <code className={`language-${language}`}>{currentCode}</code>
        </pre>
      ) : (
        <p>No code provided</p>
      )}

      {/* Copy Button */}
      <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
        <CopyToClipboard text={currentCode} onCopy={handleCopy}>
          <IconButton color="primary">
            <ContentCopyIcon />
          </IconButton>
        </CopyToClipboard>
      </Box>
    </Box>
  );
}
