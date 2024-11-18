import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid2} from '@mui/material';
import GridCard2 from './GridCard2';
import { Link } from 'react-router-dom';

export default function AutoSlidingCards() {
  const slides = [
    { src: 'https://escape.tech/blog/content/images/2022/06/csrf.png', path: '/LessonPage/BrokenAccControl' },
    { src: 'https://miro.medium.com/v2/resize:fit:1066/1*6YoaC40Xt8n2ASMldhijWg.jpeg', path: '/LessonPage/DirectoryTraversal' },
    { src: 'https://escape.tech/blog/content/images/2022/06/file-inclusion-and-directory-traversal.png', path:'/LessonPage/CrossSiteRequestForgery' },
    { src: 'https://escape.tech/blog/content/images/2022/06/csrf.png', path: '/LessonPage/UnencryptedCommunication' },
    { src: 'https://miro.medium.com/v2/resize:fit:1066/1*6YoaC40Xt8n2ASMldhijWg.jpeg', path: '/LessonPage/CommandInjection'},
    { src: 'https://escape.tech/blog/content/images/2022/06/file-inclusion-and-directory-traversal.png', path:'/LessonPage/SQLInjection' },
    { src: 'https://escape.tech/blog/content/images/2022/06/csrf.png', path: '/LessonPage/InsecureDesign' },
    { src: 'https://miro.medium.com/v2/resize:fit:1066/1*6YoaC40Xt8n2ASMldhijWg.jpeg', path: '/LessonPage/InformationLeakage' },
    { src: 'https://escape.tech/blog/content/images/2022/06/file-inclusion-and-directory-traversal.png', path:'/LessonPage/FileUploadVulnerabilities' },
    { src: 'https://escape.tech/blog/content/images/2022/06/csrf.png', path: '/LessonPage/LaxSecuritySettings' },
    { src: 'https://miro.medium.com/v2/resize:fit:1066/1*6YoaC40Xt8n2ASMldhijWg.jpeg', path: '/LessonPage/ToxicDependencies' },
    { src: 'https://escape.tech/blog/content/images/2022/06/file-inclusion-and-directory-traversal.png', path:'/LessonPage/PasswordMismanagement' },
    { src: 'https://escape.tech/blog/content/images/2022/06/csrf.png', path: '/LessonPage/PrivilegeEscalation' },
    { src: 'https://miro.medium.com/v2/resize:fit:1066/1*6YoaC40Xt8n2ASMldhijWg.jpeg', path: '/LessonPage/SessionFixation' },
    { src: 'https://escape.tech/blog/content/images/2022/06/file-inclusion-and-directory-traversal.png', path:'/LessonPage/UserEnumeration' },
    { src: 'https://escape.tech/blog/content/images/2022/06/csrf.png', path: '/LessonPage/WeakSessionIds' },
    { src: 'https://miro.medium.com/v2/resize:fit:1066/1*6YoaC40Xt8n2ASMldhijWg.jpeg', path: '/LessonPage/SoftwareAndDataIntegrityFailures' },
    { src: 'https://escape.tech/blog/content/images/2022/06/file-inclusion-and-directory-traversal.png', path:'/LessonPage/LoggingAndMonitoringFailures' },
    { src: 'https://escape.tech/blog/content/images/2022/06/file-inclusion-and-directory-traversal.png', path:'/LessonPage/ServerSideRequestForgery' },
  ];
  const duplicatedSlides = [...slides, ...slides]; // Duplicate array for seamless loop
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const scrollSpeed = 2;

  //Continuous Animation 
  useEffect(() => {
    const slide = () => {
      if (!carouselRef.current) return;  //Null check for carouselRef
      const fullWidth = carouselRef.current.scrollWidth / 2; // Half of the total width (since slides are duplicated) 
      setCurrentIndex((prevIndex) => {
        if (Math.abs(prevIndex) >= fullWidth) {
          return 0; // Reset to 0 when fully scrolled
        }
        return prevIndex - scrollSpeed; // Move left continuously
      });
    };

    const animationId = requestAnimationFrame(function step() {
      slide();
      requestAnimationFrame(step);
    });

    return () => cancelAnimationFrame(animationId);
  }, [scrollSpeed]);

  return (
    <Box sx={{ overflow: 'hidden', width: '100%',mt:6,mb:24, position: 'relative', padding:0 }}>
      <Grid2
        ref={carouselRef}
        container
        columns={10}
        spacing={1} 
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width:'1200%',
          transform: `translateX(${currentIndex}px)`,
          transition: 'none',
          whiteSpace: 'nowrap',
          gap:1,
        }}  
      >
        {duplicatedSlides.map((slide, index) => (
          <Grid2 key={index} sx={{ xs:1, md:1,m:3.5, flexShrink: 0, textAlign: 'center', }}>
            <Link to={slide.path ?? "/Homepage"} style={{ textDecoration: 'none' }}>
              <GridCard2 src={slide.src} />
            </Link>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
} 
