import { Button, SxProps } from '@mui/material';
import React from 'react';


interface MainButtonProps {
     children: React.ReactNode;
     variant?: string;
     sx?: SxProps;
     onClick?: ()=> void;
   }

export default function MainButton({children,sx,onClick}:MainButtonProps) {
  return (
    <Button
      sx={{
        backgroundColor: 'primary.main',
        border:0.5,
        '&:hover': {
          backgroundColor: 'secondary.main',
          cursor:'pointer'
        },
        ...sx,
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};