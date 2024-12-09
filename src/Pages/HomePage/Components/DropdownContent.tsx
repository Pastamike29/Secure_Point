import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardMedia, Box, Container, Grid2 } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const contentData = {
  item1: {
    title: 'Broken Access Control',
    description: 'Broken Access Control เกิดขึ้นเมื่อแอปพลิเคชันไม่ได้บังคับใช้อย่างถูกต้องในข้อจำกัดเกี่ยวกับสิ่งที่ผู้ใช้ที่ผ่านการยืนยันตัวตนแล้วสามารถทำได้ ซึ่งอาจนำไปสู่การเข้าถึงข้อมูลสำคัญหรือฟังก์ชันต่างๆ อย่างไม่ได้รับอนุญาต',
    src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2Fdropdown_img_1.png?alt=media&token=c04f3165-fea8-450a-abe9-b77c0882e603'
  },
  item2: {
    title: 'SQL Injection',
    description: 'SQL Injection เป็นการโจมตีประเภทหนึ่งที่ผู้โจมตีทำการแก้ไขคำสั่ง SQL โดยใส่โค้ด SQL ที่เป็นอันตรายลงไปในช่องป้อนข้อมูลของแอปพลิเคชัน',
    src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2Fdropdown_img_2.png?alt=media&token=3a531fc6-1198-4a30-a5d3-a8c4cb358cf8'
  },
  item3: {
    title: 'Cross Site Request Forgery',
    description: 'Cross-Site Request Forgery (CSRF) คือการโจมตีที่หลอกให้ผู้ใช้งานดำเนินการบางอย่างบนเว็บแอปพลิเคชันโดยที่ผู้ใช้ไม่ได้ตั้งใจ',
    src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2Fdropdown_img_3.png?alt=media&token=85265677-b15e-48ab-883f-b2e44c98c80b'
  },
  item4: {
    title: 'File Upload Vulnerabilities',
    description: 'ช่องโหว่ในการอัปโหลดไฟล์เกิดขึ้นเมื่อแอปพลิเคชันอนุญาตให้ผู้ใช้อัปโหลดไฟล์โดยไม่มีการตรวจสอบความถูกต้องอย่างเหมาะสม',
    src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2Fdropdown_img_4.png?alt=media&token=2a482461-c1d7-40cf-81f4-208b38bc360f'
  },
  item5: {
    title: 'Privilege Escalation',
    description: 'Privilege escalation เกิดขึ้นเมื่อการยกระดับสิทธิ์เกิดขึ้นเมื่อผู้โจมตีสามารถเข้าถึงทรัพยากรหรือฟังก์ชันที่มีสิทธิ์สูงกว่าได้',
    src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2Fdropdown_img_5.png?alt=media&token=499cd966-e7dc-49fe-9d24-4b58f6bc8d2f'
  },
  item6: {
    title: 'Password Mismanagement',
    description: 'Password Mismanagement คือการจัดการรหัสผ่านที่ไม่เหมาะสมหมายถึงการปฏิบัติที่ไม่ดีในการสร้าง เก็บรักษา และใช้งานรหัสผ่าน',
    src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2Fdropdown_img_6.png?alt=media&token=944bd844-06c5-4c12-8c75-bb75e67b422c'
  },
  item7: {
    title: 'Toxic Dependencies',
    description: 'Toxic Dependencies หมายถึง ไลบรารี เฟรมเวิร์ก หรือแพ็กเกจในกระบวนการพัฒนาซอฟต์แวร์ที่ก่อให้เกิดความเสี่ยงอย่างมีนัยสำคัญ',
    src: 'https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2Fdropdown_img_7.webp?alt=media&token=8eda5386-96c1-4217-9551-320caaab1615'
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
