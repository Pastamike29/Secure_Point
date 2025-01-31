import React, { useState, useEffect, useMemo } from 'react';
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

  const languageOptions = useMemo(
    () =>
      Object.keys(codeSnippets).filter(
        (lang) => typeof codeSnippets[lang] === 'string' && codeSnippets[lang].trim().toUpperCase() !== 'N/A'
      ),
    [codeSnippets]
  );

  useEffect(() => {
    if (languageOptions.length > 0 && !language) {
      setLanguage(languageOptions.includes('javascript') ? 'javascript' : languageOptions[0]);
    }
  }, [languageOptions, language]);

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

      {language ? (
        <pre className={`language-${language}`}>
          <code className={`language-${language}`}>{currentCode}</code>
        </pre>
      ) : (
        <p>Loading code...</p>
      )}

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
