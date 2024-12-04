import { Box, CardMedia, Container, SxProps, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


interface SliderContentProps {
  children?: React.ReactNode;
  sx?: SxProps;
  src?: string;
  description?: string;
  link?: string;
  onClick?: () => void;

}


export default function SliderContent({ sx }: SliderContentProps) {
  const navigate = useNavigate();

  const handleImageClick = () => {
    const targetPath = slides[currentSlide].link;
    if (targetPath) {
      navigate(targetPath);
    }
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: SliderContentProps[] = [
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F1(csrf).png?alt=media&token=6317ea73-fbae-4445-b0a3-67f347ebbcbc',
      description:
        '<h1 style="color: red; display: inline;">Cross-Site</h1>' +
        '\t<h1 style="display: inline;">Request Forgery (CSRF): The Invisible Attack</h1>' +
        '<p style=" font-size: 18px;">ลองจินตนาการว่าคุณล็อกอินเข้าสู่บัญชีธนาคารผ่านเว็บไซต์หรือแอปพลิเคชันของคุณด้วยความมั่นใจ ในขณะเดียวกันลองจินตนาการถึงผู้โจมตีที่มีเล่ห์เหลี่ยมแอบหลอกให้เบราว์เซอร์ของคุณทำสิ่งที่คุณไม่ได้ตั้งใจ เช่น โอนเงินออกไปโดยที่คุณไม่รู้ตัวเลย เหตุการณ์นี้คือสิ่งที่เรียกว่า การโจมตีแบบ Cross-Site Request Forgery (CSRF) นั่นเอง</p>'
      , link: '/LessonPage/CrossSiteRequestForgery'
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F6(SQLInjection).png?alt=media&token=19f98ffa-d1fd-4db5-834e-6921b628385c',
      description:
        '<h1 style="color: red; display: inline;">SQL</h1>' +
        '\t<h1 style="display: inline;">Injection : The Query Invader</h1>' +
        '<p style="font-size: 18px;">ลองจินตนาการว่าคุณกำลังสั่งพิซซ่า คุณบอกที่อยู่ของคุณให้พนักงานส่งพิซซ่าทราบ แต่ถ้ามีใครบางคนแอบฟังการสนทนาของคุณแล้วเปลี่ยนที่อยู่เป็นของเขาเอง คุณก็จะเสียพิซซ่าไปฟรี ๆ</p>'
      , link: '/LessonPage/SQLInjection'
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F2(BrokenAccControl).png?alt=media&token=fa9abdfe-8992-444e-821d-e6da82954bdf',
      description:
        '<h1 style="color: red; display: inline;">Broken</h1>' +
        '\t<h1 style="display: inline;">Access Control : The Invisible Key</h1>' +
        '<p style="font-size: 18px;">Broken Access Control เกิดขึ้นเมื่อเว็บไซต์หรือแอปพลิเคชันไม่ได้จำกัดสิทธิ์การเข้าถึงฟีเจอร์หรือข้อมูลบางอย่างอย่างถูกต้อง เปรียบเสมือนการเปิดประตูบ้านไว้โล่ง ๆ ใครก็สามารถเดินเข้าไปและทำอะไรก็ได้ตามใจชอบ</p>'
      , link: '/LessonPage/BrokenAccControl'
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F3(DirectoryTraversal).png?alt=media&token=08e9e96d-b2f3-44fb-83b6-d4c8e518f964',
      description:
        '<h1 style="color: red; display: inline;">Directory</h1>' +
        '\t<h1 style="display: inline;">Traversal : The Path Explorer</h1>' +
        '<p style="font-size: 18px;">Directory Traversal คือการที่มีคนหลอกเว็บไซต์ให้เปิดเผยไฟล์หรือไดเรกทอรีที่ปกติจะถูกซ่อนอยู่ เปรียบเสมือนมีคนค้นพบทางลับในห้องสมุดและสามารถเข้าถึงหนังสือที่ไม่ได้มีไว้ให้คนทั่วไปอ่านได้ง่าย ๆ</p>'
      , link: '/LessonPage/DirectoryTraversal'

    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F4(UnencryptCommu).png?alt=media&token=54247f20-92c3-4d94-b522-f1c17179f3f7',
      description:
        '<h1 style="color: red; display: inline;">Unencrypted</h1>' +
        '\t<h1 style="display: inline;">Communication : The Naked Message</h1>' +
        '<p style="font-size: 18px;">ลองจินตนาการถึงหนังสายลับ ที่มีสายลับคอยดักฟังบทสนทนาของคุณโดยที่คุณไม่รู้ตัว นั่นคือสิ่งที่เกิดขึ้นเมื่อข้อมูลถูกส่งผ่านอินเทอร์เน็ตโดยไม่มีการเข้ารหัส ใครก็ตามที่ดักข้อมูลได้ก็สามารถอ่านข้อมูลของคุณได้เช่นกัน</p>'
      , link: '/LessonPage/UnencryptedCommunication'
    },
  ];


  // Automatically change slide every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 7000); // Change slide every 3 seconds

    // Cleanup the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);



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
            cursor: 'pointer',
          }}
          onClick={handleImageClick}
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


