import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import { Box, IconButton, MenuItem, Select, FormControl, SxProps } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SelectChangeEvent } from '@mui/material';

interface CodeWindowProps {
  codeSnippets: Record<string, string>;
  initialLanguage?: string;
  sx?: SxProps;
}

export default function CodeWindow({ codeSnippets, sx }: CodeWindowProps) {
  const [language, setLanguage] = useState('');
  const [copied, setCopied] = useState(false);

  // Filter out languages that have 'N/A' as their code snippet
  const languageOptions = Object.keys(codeSnippets).filter(
    (lang) => codeSnippets[lang]?.trim().toUpperCase() !== 'N/A'
  );

  // Set default language when languageOptions are determined
  useEffect(() => {
    if (languageOptions.length > 0) {
      setLanguage(languageOptions.includes('javascript') ? 'javascript' : languageOptions[0]);
    }
  }, [languageOptions]);

  useEffect(() => {
    if (language && codeSnippets[language] && Prism.languages[language]) {
      Prism.highlightAll();
    }
  }, [language, codeSnippets]);

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value as string);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      {language ? (
        <pre className={`language-${language}`}>
          <code className={`language-${language}`}>{currentCode}</code>
        </pre>
      ) : (
        <p>Loading code...</p>
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
  