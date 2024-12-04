import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardMedia, Box, Container, Grid2 } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const contentData = {
  item1: {
    title: 'Broken Access Control',
    description: 'Broken Access Control เกิดขึ้นเมื่อแอปพลิเคชันไม่ได้บังคับใช้อย่างถูกต้องในข้อจำกัดเกี่ยวกับสิ่งที่ผู้ใช้ที่ผ่านการยืนยันตัวตนแล้วสามารถทำได้ ซึ่งอาจนำไปสู่การเข้าถึงข้อมูลสำคัญหรือฟังก์ชันต่างๆ อย่างไม่ได้รับอนุญาต',
    src: 'https://miro.medium.com/v2/resize:fit:1400/0*-FVcRCSMSXbrM0OP'
  },
  item2: {
    title: 'SQL Injection',
    description: 'SQL Injection เป็นการโจมตีประเภทหนึ่งที่ผู้โจมตีทำการแก้ไขคำสั่ง SQL โดยใส่โค้ด SQL ที่เป็นอันตรายลงไปในช่องป้อนข้อมูลของแอปพลิเคชัน',
    src: 'https://dytvr9ot2sszz.cloudfront.net/wp-content/uploads/2019/06/SQL-Injection-Prone-min.png'
  },
  item3: {
    title: 'Cross Site Request Forgery',
    description: 'Cross-Site Request Forgery (CSRF) คือการโจมตีที่หลอกให้ผู้ใช้งานดำเนินการบางอย่างบนเว็บแอปพลิเคชันโดยที่ผู้ใช้ไม่ได้ตั้งใจ',
    src: 'https://www.sidechannel.blog/wp-content/uploads/2021/03/Artigo-69.5-Lets-go-with-Cross-Site-Request-Forgery-SideChannel-Tempest.png'
  },
  item4: {
    title: 'File Upload Vulnerabilities',
    description: 'ช่องโหว่ในการอัปโหลดไฟล์เกิดขึ้นเมื่อแอปพลิเคชันอนุญาตให้ผู้ใช้อัปโหลดไฟล์โดยไม่มีการตรวจสอบความถูกต้องอย่างเหมาะสม',
    src: 'https://secnhack.in/wp-content/uploads/2020/09/2-9.png'
  },
  item5: {
    title: 'Privilege Escalation',
    description: 'Privilege escalation เกิดขึ้นเมื่อการยกระดับสิทธิ์เกิดขึ้นเมื่อผู้โจมตีสามารถเข้าถึงทรัพยากรหรือฟังก์ชันที่มีสิทธิ์สูงกว่าได้',
    src: 'https://i.imgur.com/SovymJL.png'
  },
  item6: {
    title: 'Password Mismanagement',
    description: 'Password Mismanagement คือการจัดการรหัสผ่านที่ไม่เหมาะสมหมายถึงการปฏิบัติที่ไม่ดีในการสร้าง เก็บรักษา และใช้งานรหัสผ่าน',
    src: 'https://www.vaadata.com/blog/wp-content/uploads/2024/01/burp-send-group-1024x605.png'
  },
  item7: {
    title: 'Toxic Dependencies',
    description: 'Toxic Dependencies หมายถึง ไลบรารี เฟรมเวิร์ก หรือแพ็กเกจในกระบวนการพัฒนาซอฟต์แวร์ที่ก่อให้เกิดความเสี่ยงอย่างมีนัยสำคัญ',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEqTAd4gsk2x-mJPwXrIe9WfH_dwk9vyct9g&s'
  }
};

export default function DropdownContent() {
  const [expanded, setExpanded] = useState('item1');
  const [selectedContent, setSelectedContent] = useState(contentData.item1);

  const handleAccordionChange = (contentKey) => {
    setExpanded(contentKey === expanded ? false : contentKey);
    setSelectedContent(contentData[contentKey]);
  };

  return (
    <Grid2
      sx={{
        display: 'flex',
        width: '100%',
        bgcolor: '#3b82f680',
        my: 13,
        gap: 5,
        borderRadius: 1.5,
        p: 8,
        justifyContent: 'center',
      }}
    >
      {/* Left Side: Dropdown Accordion */}
      <Grid2
        sx={{
          display: 'flex',
          width: { xs: '90%', md: '45%' },
          flexDirection: 'column',
          color: 'white',
        }}
      >
        {Object.keys(contentData).map((key) => (
          <Accordion
            key={key}
            expanded={expanded === key}
            onChange={() => handleAccordionChange(key)}
            sx={{
              m: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(5px)',
              '&:not(:last-child)': {
                m: 0
              }
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
              <Typography>{contentData[key].title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{contentData[key].description}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid2>

      {/* Right Side: Dynamic Image and Content */}
      <Grid2
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: { xs: '90%', md: '45%' },
        }}
      >
        <Card sx={{ height: '100%' }}>
          <CardMedia
            component="img"
            image={selectedContent.src}
            alt={selectedContent.title}
            sx={{ objectFit: 'cover', height: '100%' }}
          />
        </Card>
      </Grid2>
    </Grid2>
  );
}
