import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import GridCard2 from './GridCard2';
import { Link } from 'react-router-dom';

export default function AutoSlidingCards() {
  const slides = [
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F1(csrf).png?alt=media&token=6317ea73-fbae-4445-b0a3-67f347ebbcbc', path: '/LessonPage/Cross Site Request Forgery' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F2(BrokenAccControl).png?alt=media&token=fa9abdfe-8992-444e-821d-e6da82954bdf', path: '/LessonPage/Broken Access Control' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F3(DirectoryTraversal).png?alt=media&token=08e9e96d-b2f3-44fb-83b6-d4c8e518f964', path: '/LessonPage/Directory Traversal' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F6(SQLInjection).png?alt=media&token=19f98ffa-d1fd-4db5-834e-6921b628385c', path: '/LessonPage/SQL Injection' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F7(FileUploadVul).png?alt=media&token=f6b9ec0c-e896-41be-9c23-5d7b1d275635', path: '/LessonPage/File Upload Vulnerabilities' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F8(InformationLeak).png?alt=media&token=c4188c58-a137-4f62-b13c-2291a71d5adb', path: '/LessonPage/Information Leakage' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F9(InsecureDesign).png?alt=media&token=842033bc-d045-4a9c-9762-708ac8645850', path: '/LessonPage/Insecure Design' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F13(PrivilegeEs).png?alt=media&token=1fd7b9ee-86b3-42b0-bd07-887315efed67', path: '/LessonPage/Privilege Escalation' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F14(SessionFix).png?alt=media&token=2407e99d-7d64-4eac-803f-676bd74493d1', path: '/LessonPage/Session Fixation' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F15(UserEnum).png?alt=media&token=c62264b3-62c6-4e18-99cd-ceaa9eb35a00', path: '/LessonPage/User Enumeration' },
  ];

  const duplicatedSlides = [...slides, ...slides]; // Duplicate for infinite scrolling
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollSpeed = 1; // Adjust speed for smooth scrolling

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let startTime = performance.now();

    const animate = (time: number) => {
      const elapsedTime = time - startTime;

      if (elapsedTime > 16) { // Approx 60FPS
        setCurrentIndex((prevIndex) => {
          const fullWidth = container.scrollWidth / 2;
          return prevIndex <= -fullWidth ? 0 : prevIndex - scrollSpeed;
        });
        startTime = time;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <Box sx={{ overflow: 'hidden', width: '100%', mt: 6, mb: 24, position: 'relative' }}>
      <Box
        ref={containerRef}
        sx={{
          display: 'flex',
          gap: 4,
          width: 'max-content',
          transform: `translateX(${currentIndex}px)`,
          transition: 'transform 0.1s linear',
          willChange: 'transform', // Optimize for smooth rendering
        }}
      >
        {duplicatedSlides.map((slide, index) => (
          <Box key={index} sx={{ flexShrink: 0, textAlign: 'center' }}>
            <Link to={slide.path ?? "/Homepage"} style={{ textDecoration: 'none' }}>
              <GridCard2 src={slide.src} />
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
