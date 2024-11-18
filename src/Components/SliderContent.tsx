import { Box, CardMedia, Container, SxProps, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'



interface SliderContentProps {
  children?: React.ReactNode;
  sx?: SxProps;
  src?: string;
  description?: string;
  link?: string;
  onClick?: () => void;

}

const slides: SliderContentProps[] = [
  {
    src: 'https://escape.tech/blog/content/images/2022/06/csrf.png',
    description:'<h1 style=" font-family: Wotfard, serif; ">Cross-Site Request Forgery (CSRF): The Invisible Attack</h1>' +
                '<p style=" font-size: 18px; font-family: Wotfard, serif; ">Imagine you logged into your online bank account, feeling secure as you manage your finances. Now, imagine a sneaky attacker who tricks your browser into doing something you didn’t want—like transferring money—without you even realizing it. This is what happens with a Cross-Site Request Forgery (CSRF) attack.</p>'
  },
  {
    src: 'https://miro.medium.com/v2/resize:fit:1066/1*6YoaC40Xt8n2ASMldhijWg.jpeg',
    description: '<h1 style=" font-family: Wotfard, serif;">SQL Injection</h1>'+
                  '<p style="font-size: 18px; font-family: Wotfard, serif;">Imagine ordering pizza. You tell the pizza delivery person your address. Now, what if someone were to listen in on your conversation and change your address to their own? The pizza would end up at the wrong place. </p>'
  },
  {
    src: 'https://i.ytimg.com/vi/_jz5qFWhLcg/maxresdefault.jpg',
    description: '<h1 stlye="font-family: Wotfard, serif;">Broken Access Control</h1>'+
                 '<p style="font-size: 18px; font-family: Wotfard, serif;">Broken access control occurs when a website or application does not properly restrict who can access certain features or data. It like leaving the kitchen door unlocked. Anyone can walk in and do whatever they want. </p>'
  },
  {
    src: 'https://escape.tech/blog/content/images/2022/06/file-inclusion-and-directory-traversal.png',
    description: '<h1 style= "font-family: Wotfard, serif;">Directory Traversal<h1>'+
                  '<p style="font-size: 18px; font-family: Wotfard, serif;">Directory traversal is similar. It when someone tricks a website into revealing files or directories that are normally hidden. It like someone finding a secret passageway in the library and accessing books that are not meant for the public. </p>'
  },
  {
    src: 'https://resources.appsealing.com/4-svc/wp-content/uploads/2022/12/01143516/insecure-c-ommu.png',
    description: '<h1 syle= "font-family: Wotfard, serif;">Insecure Communication</h1>'+
                  '<p style="font-size: 18px; font-family: Wotfard, serif;">Insecure communication is when data is transmitted over the internet without proper encryption. It like sending a message in plain text, where anyone can read it if they intercept it. </p>'
  },

];


export default function SliderContent({ children, sx, description, onClick }: SliderContentProps) {

  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically change slide every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    // Cleanup the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handleClick = () => {
    // You can add any onClick logic here if needed
    console.log('Box clicked');
  };
  return (
    <Container
      maxWidth={false}
      sx={{
        display: { xs: 'flex', md: 'flex' },
        mr: 1,
        mx: -3,
        ...sx,
      }}
    >
      <Box
        sx={{
          display: { xs: 'flex', md: 'flex' },
          width: '195.8vh',
        }}
      >
        {/* Left Box (for image) */}
        <Box
          sx={{
            display: 'flex',
            height: '70vh',
            width: '140vh',
            alignItems: 'center',
          }}
          onClick={handleClick}
        >
          <CardMedia
            component="img"
            image={slides[currentSlide].src}
            alt="Slide image"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>

        {/* Right Box (for description) */}
        <Box
          sx={{
            height: '70vh',
            width: '60vh',
            bgcolor: 'rgba(0,0,0,0.3)',
            color: 'white',
            p: 5,
            display: 'flex',
          }}
        >
          {/* Render HTML content safely using dangerouslySetInnerHTML */}
          <div
            dangerouslySetInnerHTML={{
              __html: slides[currentSlide].description || '',
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};


