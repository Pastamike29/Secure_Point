import { Box, SxProps } from '@mui/material'
import React from 'react'

interface FitImageProps{
     sx?:SxProps;
     src?:string; 

}

export default function FitImage({sx,src}: FitImageProps) {
     return (
          <>
          <Box
               component="img"
               src={src}
               alt='This is description'
               sx={{
                    py: 3,
                    width: '90vh',
                    height: '50vh',
                    objectFit: 'cover',
                    ...sx, 
               }}>

          </Box>
          </>
     )
}
