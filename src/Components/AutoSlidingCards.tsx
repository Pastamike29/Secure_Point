import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid2} from '@mui/material';
import GridCard2 from './GridCard2';
import { Link } from 'react-router-dom';

export default function AutoSlidingCards() {
  const slides = [
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F1(csrf).png?alt=media&token=6317ea73-fbae-4445-b0a3-67f347ebbcbc', path:'/LessonPage/CrossSiteRequestForgery' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F2(BrokenAccControl).png?alt=media&token=fa9abdfe-8992-444e-821d-e6da82954bdf', path: '/LessonPage/BrokenAccControl' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F3(DirectoryTraversal).png?alt=media&token=08e9e96d-b2f3-44fb-83b6-d4c8e518f964', path: '/LessonPage/DirectoryTraversal' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F4(UnencryptCommu).png?alt=media&token=54247f20-92c3-4d94-b522-f1c17179f3f7', path: '/LessonPage/UnencryptedCommunication' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F5(CommandInjection).png?alt=media&token=89118588-a77e-49f9-a747-fcce6bf280af', path: '/LessonPage/CommandInjection'},
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F6(SQLInjection).png?alt=media&token=19f98ffa-d1fd-4db5-834e-6921b628385c', path:'/LessonPage/SQLInjection' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F7(FileUploadVul).png?alt=media&token=f6b9ec0c-e896-41be-9c23-5d7b1d275635', path:'/LessonPage/FileUploadVulnerabilities' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F8(InformationLeak).png?alt=media&token=c4188c58-a137-4f62-b13c-2291a71d5adb', path: '/LessonPage/InformationLeakage' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F9(InsecureDesign).png?alt=media&token=842033bc-d045-4a9c-9762-708ac8645850', path: '/LessonPage/InsecureDesign' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F10(LaxSecureSetting).png?alt=media&token=9af1fe65-efc7-4ad0-8105-ef705d605b04', path: '/LessonPage/LaxSecuritySettings' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F11(ToxicDepen).png?alt=media&token=56fc37a3-49af-4d8c-b2b3-541cb7dd67a8', path: '/LessonPage/ToxicDependencies' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F12(PasswordMissmanage).png?alt=media&token=399f3d76-13ba-46ca-859a-911822b37ed8', path:'/LessonPage/PasswordMismanagement' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F13(PrivilegeEs).png?alt=media&token=1fd7b9ee-86b3-42b0-bd07-887315efed67', path: '/LessonPage/PrivilegeEscalation' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F14(SessionFix).png?alt=media&token=2407e99d-7d64-4eac-803f-676bd74493d1', path: '/LessonPage/SessionFixation' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F15(UserEnum).png?alt=media&token=c62264b3-62c6-4e18-99cd-ceaa9eb35a00', path:'/LessonPage/UserEnumeration' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F16(WeakSession).png?alt=media&token=77c60e8c-ede1-4b1a-8cf4-37dbd3052fb9', path: '/LessonPage/WeakSessionIds' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F17(SoftwareAndDataFail).png?alt=media&token=632cc98c-6e2c-4ff3-aae9-4e6206e391b2', path: '/LessonPage/SoftwareAndDataIntegrityFailures' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F18(SecurityLoggingAndMonit).png?alt=media&token=7f6c9cab-23b0-4de3-8026-857b0fd45d34', path:'/LessonPage/LoggingAndMonitoringFailures' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F19(SSRF).png?alt=media&token=494c3c37-2c98-4937-b31e-74cca0569303', path:'/LessonPage/ServerSideRequestForgery' },
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
