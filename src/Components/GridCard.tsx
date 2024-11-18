import src from '@emotion/styled';
import { Box, Card, CardContent, CardMedia, Container, Grid2, SxProps, Typography } from '@mui/material'
import React from 'react'



interface GridCardProps {
  children?: React.ReactNode;
  sx?: SxProps;
  src?: string;
  text?: string;
  onClick?: () => void;


}


export default function GridCard({ children, sx, src, text, onClick }: GridCardProps) {

  return (

    <Grid2
      container spacing={2}
      sx={{
        mx:4,
        ":hover": {
          cursor: 'pointer',
          boxShadow: 4,

        }
      }}
    >
      <Card
        sx={{
          height: '20vh',
          width: '30vh',
          display: 'flex',
          position: 'relative',
          ...sx,
        }}
      >
        <CardMedia sx={{
          height: '100%',
          objectFit: 'cover',
        }}
        >
          {src && <img src={src} alt={text} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}

        </CardMedia>
      </Card>
      <CardContent
        sx={{
          position: 'absolute',
          p: 3,
          ...sx,
        }}
      >
        <Typography gutterBottom variant="h5" component="div" textAlign='center'>
          {children}
        </Typography>

      </CardContent>
    </Grid2>


  )

}
