import Box from '@mui/material/Box';
import React from 'react'
import Grid2 from '@mui/material/Grid2';
import { Container, Typography } from '@mui/material';
import GridCard2 from '../../Components/GridCard2';
import Navbar from '../../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import Chatbot from '../../Components/Chatbot';

export default function LessonPage() {

  const handleNavigate = useNavigate();


  return (
    <>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        mx: 8,
        my: 18,
      }}>

        <Box sx={{
          zIndex: 1201,
        }}>
          <Navbar />


        </Box>

        <Box sx={{
          display: 'flex',
          flex: 1,
        }}>



          <Box sx={{
            mx: 'auto',
            width: '79%'
          }}>
            <Container>
              <Box
                sx={{
                  flexGrow: 1,
                }}>
                <Typography
                  variant='h4'
                  sx={{
                    my: 6,
                    fontWeight: 750,
                    textAlign: 'center',
                  }}>
                  Select Vulnerability that you want to learn
                </Typography>
                <Typography variant='h4' fontWeight={650} sx={{ mt: 12 }}>
                  OWASP Top 10
                </Typography>
                <Typography variant='h5' fontWeight={650} sx={{ mt: 6, mb: 4 }}>
                  Top 10 Web Application Security Risks
                </Typography>
                <Typography variant='h6'>OWASP Top 10 เป็นรายงานที่จัดทำขึ้นโดยโครงการ Open Web Application Security Project (OWASP) ซึ่งมุ่งเน้นด้านความปลอดภัยของแอปพลิเคชันเว็บ รายงานนี้นำเสนอ 10 อันดับความเสี่ยงด้านความปลอดภัยที่พบบ่อยและสำคัญที่สุดสำหรับแอปพลิเคชันเว็บ องค์กร OWASP ได้รวบรวมและวิเคราะห์ข้อมูลจากทั่วโลกเพื่อติดตามช่องโหว่ที่เกิดขึ้นบ่อย ๆ พร้อมทั้งแนะนำแนวทางในการแก้ไขหรือป้องกัน เพื่อให้แอปพลิเคชันมีความปลอดภัยมากยิ่งขึ้น</Typography>
              </Box>

            </Container>


            <Container>
              <Grid2
                container spacing={{ xs: 2, md: 10 }}
                columns={{ xs: 4, sm: 8, md: 10 }}
              >
                <Box sx={{
                  my: 10,
                  mb: 30,
                  height: 30,
                  width: '140vh',
                  boxShadow: '0 4px 0 rgba(0,0,0,0.2)'
                }} >
                  <Typography variant='h5' fontWeight={600} mb={3.5}>1. Broken Access Control</Typography>
                  <Typography variant='h6' mb={3.5}>Broken Access Control คือช่องโหว่ด้านความปลอดภัยที่เกิดขึ้นเมื่อระบบไม่สามารถตรวจสอบสิทธิ์การเข้าถึงข้อมูลหรือทรัพยากรต่างๆ ได้อย่างถูกต้อง ทำให้ผู้ใช้ที่ไม่ได้รับอนุญาตสามารถเข้าถึงหรือทำการกระทำที่ไม่ควรได้ เช่น การดูข้อมูลของผู้ใช้อื่น หรือการเข้าถึงฟังก์ชันที่จำกัดเฉพาะผู้ใช้บางประเภท (เช่น Admin)</Typography>
                  <Typography variant='h6'>สาเหตุหลัก มักเกิดจากการตั้งค่าหรือการควบคุมการเข้าถึงที่ไม่ถูกต้อง ซึ่งอาจเกิดจาก
                    <br></br>- การไม่ได้ตรวจสอบสิทธิ์การเข้าถึงในฝั่งเซิร์ฟเวอร์
                    <br></br>- การใช้ URL ที่สามารถเดาได้ง่ายในการเข้าถึงทรัพยากรที่ไม่ควรเข้าถึง
                    <br></br>- การที่ผู้ใช้สามารถเปลี่ยนสิทธิ์ของตนเองได้
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                      m: 1,
                      width: 128,
                      height: 128,
                    },
                  }}
                >
                </Box>
                <Grid2
                  container spacing={{ xs: 2, md: 12 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  sx={{
                    mx: 4
                  }}
                >
                  <GridCard2 src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F2(BrokenAccControl).png?alt=media&token=fa9abdfe-8992-444e-821d-e6da82954bdf'
                    onClick={() => handleNavigate('/LessonPage/BrokenAccControl')}>
                    <Typography variant='h4'></Typography>
                  </GridCard2>
                  <GridCard2 src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F3(DirectoryTraversal).png?alt=media&token=08e9e96d-b2f3-44fb-83b6-d4c8e518f964'
                    onClick={() => handleNavigate('/LessonPage/DirectoryTraversal')}>
                    <Typography variant='h4'> </Typography>
                  </GridCard2>
                  <GridCard2 src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F1(csrf).png?alt=media&token=6317ea73-fbae-4445-b0a3-67f347ebbcbc'
                    onClick={() => handleNavigate('/LessonPage/CrossSiteRequestForgery')}>
                    <Typography variant='h4'> </Typography>
                  </GridCard2>


                </Grid2>


                <Box sx={{
                  my: 10,
                  mb: 33,
                  height: 30,
                  width: '140vh',
                  boxShadow: '0 4px 0 rgba(0,0,0,0.2)'
                }} >
                  <Typography variant='h5' fontWeight={600} mb={3.5}>2. Cryptographic Failures</Typography>
                  <Typography variant='h6' mb={3.5}>Cryptographic Failures (หรือที่เรียกว่า Sensitive Data Exposure) หมายถึงความล้มเหลวในการใช้การเข้ารหัสหรือการจัดการข้อมูลที่ละเอียดอ่อน (เช่น รหัสผ่าน ข้อมูลบัตรเครดิต ข้อมูลส่วนตัว) ทำให้ข้อมูลเหล่านั้นเสี่ยงต่อการถูกโจมตีและถูกเปิดเผยโดยผู้ไม่ประสงค์ดี</Typography>
                  <Typography variant='h6'>การโจมตีที่เกี่ยวข้อง:
                    <br></br>- การขโมยข้อมูลที่ส่งผ่านทางเครือข่าย เช่น การขาดการเข้ารหัส SSL/TLS ทำให้ผู้โจมตีสามารถดักจับข้อมูลที่กำลังส่งไปยังเซิร์ฟเวอร์ได้
                    <br></br>- การจัดเก็บข้อมูลที่ละเอียดอ่อนในรูปแบบที่ไม่ปลอดภัย เช่น การเก็บรหัสผ่านในรูปแบบข้อความธรรมดา (plain text)
                    <br></br>- การใช้การเข้ารหัสที่ล้าสมัยหรือการตั้งค่าการเข้ารหัสที่ไม่เหมาะสม
                  </Typography>
                </Box>

                <Grid2
                  container spacing={{ xs: 2, md: 12 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  sx={{
                    mx: 4
                  }}
                >
                  <GridCard2 src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F4(UnencryptCommu).png?alt=media&token=54247f20-92c3-4d94-b522-f1c17179f3f7'
                    onClick={() => handleNavigate('/LessonPage/UnencryptedCommunication')}>
                    <Typography variant='h4'></Typography>
                  </GridCard2>

                </Grid2>

                <Box sx={{
                  my: 10,
                  mb: 40,
                  height: 30,
                  width: '140vh',
                  boxShadow: '0 4px 0 rgba(0,0,0,0.2)'
                }} >
                  <Typography variant='h5' fontWeight={600} mb={3.5}>3. Injection</Typography>
                  <Typography variant='h6' mb={3.5}>การโจมตีแบบ Injection เป็นหนึ่งในประเภทการโจมตีที่เกิดขึ้นเมื่อแฮกเกอร์สามารถแทรกคำสั่งหรือโค้ดที่ไม่ปลอดภัยลงในโปรแกรมหรือระบบ ซึ่งมักจะส่งผลให้ผู้โจมตีสามารถเข้าถึงข้อมูลหรือดำเนินการกับระบบได้โดยไม่ถูกอนุญาต</Typography>
                  <Typography variant='h6'>การโจมตีแบบ Injection มักเกิดจากการที่แอปพลิเคชันไม่ได้ตรวจสอบข้อมูลที่ผู้ใช้ป้อนอย่างเพียงพอ เช่น การแทรก SQL code, โค้ด JavaScript, หรือคำสั่งที่ไม่ปลอดภัยเข้าไปในฐานข้อมูลหรือเว็บแอปพลิเคชัน ซึ่งอาจทำให้ผู้โจมตีสามารถ<br></br>
                    <br></br>- ขโมยข้อมูลสำคัญ เช่น รหัสผ่าน หรือข้อมูลส่วนบุคคล
                    <br></br>- ดำเนินการกับฐานข้อมูล เช่น การลบหรือแก้ไขข้อมูล
                    <br></br>- ทำให้ระบบล่ม (Denial of Service)
                  </Typography>
                </Box>
                <Grid2
                  container spacing={{ xs: 2, md: 12 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  sx={{
                    mx: 4,
                  }}
                >
                  <GridCard2 src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F6(SQLInjection).png?alt=media&token=19f98ffa-d1fd-4db5-834e-6921b628385c'
                    onClick={() => handleNavigate('/LessonPage/SQLInjection')}>
                    <Typography variant='h4'></Typography>
                  </GridCard2>
                  <GridCard2 src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F5(CommandInjection).png?alt=media&token=89118588-a77e-49f9-a747-fcce6bf280af'
                    onClick={() => handleNavigate('/LessonPage/CommandExecution')}>
                    <Typography variant='h4'></Typography>
                  </GridCard2>


                </Grid2>


                <Box sx={{
                  my: 10,
                  mb: 45,
                  height: 30,
                  width: '140vh',
                  boxShadow: '0 4px 0 rgba(0,0,0,0.2)'
                }} >
                  <Typography variant='h5' fontWeight={600} mb={3.5}>4. Insecure Design</Typography>
                  <Typography variant='h6' mb={3.5}>Insecure Design หมายถึง การออกแบบระบบหรือแอปพลิเคชันที่มีช่องโหว่ในระดับสถาปัตยกรรมหรือการออกแบบ ซึ่งทำให้เกิดความเสี่ยงด้านความปลอดภัยเมื่อระบบถูกโจมตี โดยไม่คำนึงถึงมาตรการป้องกันหรือแนวทางที่เหมาะสมตั้งแต่เริ่มต้น การโจมตีที่เกี่ยวข้องกับ Insecure Design มักจะมาจากการที่ไม่ได้คำนึงถึงภัยคุกคามหรือการเลือกใช้เทคโนโลยีที่ไม่ปลอดภัยในการออกแบบระบบ</Typography>
                  <Typography variant='h6'>ตัวอย่าง ของการโจมตีที่อาจเกิดขึ้น ได้แก่<br></br>
                    <br></br>- การขาดการควบคุมการเข้าถึง: ระบบที่ไม่ได้ออกแบบเพื่อให้การควบคุมการเข้าถึงทำได้อย่างถูกต้อง
                    <br></br>- การใช้โปรโตคอลที่ไม่ปลอดภัย: เช่น การส่งข้อมูลสำคัญผ่าน HTTP แทน HTTPS
                    <br></br>- การไม่ใช้การเข้ารหัสที่เหมาะสม: ข้อมูลที่สำคัญ เช่น รหัสผ่านหรือข้อมูลการทำธุรกรรมที่ไม่ได้รับการเข้ารหัส ทำให้สามารถถูกขโมยได้ง่าย
                  </Typography>
                </Box>
                <Grid2
                  container spacing={{ xs: 2, md: 12 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  sx={{
                    mx: 4,
                  }}
                >
                  <GridCard2 src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F5(CommandInjection).png?alt=media&token=89118588-a77e-49f9-a747-fcce6bf280af'
                    onClick={() => handleNavigate('/LessonPage/InsecureDesign')}>
                    <Typography variant='h4'></Typography>
                  </GridCard2>
                  <GridCard2 src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F8(InformationLeak).png?alt=media&token=c4188c58-a137-4f62-b13c-2291a71d5adb'
                    onClick={() => handleNavigate('/LessonPage/InformationLeakage')}>
                    <Typography variant='h4'></Typography>
                  </GridCard2>
                  <GridCard2 src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F7(FileUploadVul).png?alt=media&token=f6b9ec0c-e896-41be-9c23-5d7b1d275635'
                    onClick={() => handleNavigate('/LessonPage/FileUploadVulnerabilities')}>
                    <Typography variant='h4'></Typography>
                  </GridCard2>


                </Grid2>


                <Box sx={{
                  my: 10,
                  mb: 40,
                  height: 30,
                  width: '140vh',
                  boxShadow: '0 4px 0 rgba(0,0,0,0.2)'
                }} >
                  <Typography variant='h5' fontWeight={600} mb={3.5}>5. Security Misconfiguration </Typography>
                  <Typography variant='h6' mb={3.5}>Security Misconfiguration คือข้อบกพร่องในการตั้งค่าความปลอดภัยของระบบ ซึ่งอาจเกิดขึ้นในทุกระดับของแอปพลิเคชัน เช่น เซิร์ฟเวอร์, ฐานข้อมูล, หรือการตั้งค่าของระบบปฏิบัติการ เมื่อการตั้งค่าความปลอดภัยไม่ถูกต้องหรือไม่เหมาะสม ก็ทำให้แฮกเกอร์สามารถใช้ประโยชน์จากช่องโหว่นี้ในการเข้าถึงข้อมูลหรือทำให้ระบบตกอยู่ในความเสี่ยงได้</Typography>
                  <Typography variant='h6'>ตัวอย่างการโจมตีที่เกี่ยวข้องกับ Security Misconfiguration เช่น<br></br>
                    <br></br>- การใช้การตั้งค่า Default ที่ไม่ปลอดภัย เช่น ใช้รหัสผ่านหรือพอร์ตที่เป็น Default
                    <br></br>- การไม่ปิดการใช้งานฟีเจอร์ที่ไม่จำเป็น เช่น การทดสอบฟังก์ชัน debug
                    <br></br>- การเปิดเผยข้อมูลที่สำคัญในข้อความแสดงข้อผิดพลาด (Error log)
                  </Typography>
                </Box>
                <Grid2
                  container spacing={{ xs: 2, md: 12 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  sx={{
                    mx: 4,
                  }}
                >
                  <GridCard2 src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F10(LaxSecureSetting).png?alt=media&token=9af1fe65-efc7-4ad0-8105-ef705d605b04'
                    onClick={() => handleNavigate('/LessonPage/LaxSecuritySettings')}>
                    <Typography variant='h4'></Typography>
                  </GridCard2>


                </Grid2>


                <Box sx={{
                  my: 10,
                  mb: 30,
                  height: 30,
                  width: '140vh',
                  boxShadow: '0 4px 0 rgba(0,0,0,0.2)'
                }} >
                  <Typography variant='h5' fontWeight={600} mb={3.5}>6. Vulnerable and Outdated Components </Typography>
                  <Typography variant='h6' mb={3.5}>Vulnerable and Outdated Components คือการโจมตีที่เกิดจากการใช้ซอฟต์แวร์หรือส่วนประกอบที่มีช่องโหว่หรือไม่ได้รับการอัปเดตอย่างเหมาะสมในระบบ โดยการใช้ซอฟต์แวร์เก่าหรือส่วนประกอบที่มีปัญหาด้านความปลอดภัยที่ยังไม่ได้รับการแก้ไข จะทำให้แฮ็กเกอร์สามารถเข้าถึงข้อมูลที่ไม่ควรเข้าถึงหรือโจมตีระบบได้ง่ายขึ้น</Typography>
                  <Typography variant='h6'>ตัวอย่างเช่น การใช้ไลบรารีหรือเฟรมเวิร์กที่มีช่องโหว่ที่รู้จัก แต่ยังไม่ได้อัปเดตเป็นเวอร์ชันที่ปลอดภัย ซึ่งอาจถูกใช้ในการโจมตีที่สามารถทำให้ข้อมูลถูกขโมยหรือระบบถูกควบคุมจากภายนอกได้</Typography>
                </Box>
                <Grid2
                  container spacing={{ xs: 2, md: 12 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  sx={{
                    mx: 4,
                  }}
                >
                  <GridCard2 src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F11(ToxicDepen).png?alt=media&token=56fc37a3-49af-4d8c-b2b3-541cb7dd67a8'
                    onClick={() => handleNavigate('/LessonPage/ToxicDependencies')}>
                    <Typography variant='h4'></Typography>
                  </GridCard2>

                </Grid2>

                <Box sx={{
                  my: 10,
                  mb: 45,
                  height: 30,
                  width: '140vh',
                  boxShadow: '0 4px 0 rgba(0,0,0,0.2)'
                }} >
                  <Typography variant='h5' fontWeight={600} mb={3.5}>7. Identification and Authentication Failures </Typography>
                  <Typography variant='h6'>Identification and Authentication Failures หมายถึง ความผิดพลาดในการยืนยันตัวตนและการตรวจสอบตัวตนของผู้ใช้ ซึ่งเป็นช่องโหว่ที่เกิดขึ้นเมื่อระบบไม่สามารถตรวจสอบหรือระบุผู้ใช้งานได้อย่างถูกต้อง หรือไม่สามารถป้องกันการเข้าถึงข้อมูลหรือฟังก์ชันสำคัญได้อย่างเหมาะสม โดยมักเกิดจาก</Typography>
                  <Typography variant='h6'>
                    <br></br>- การจัดการรหัสผ่านที่ไม่ปลอดภัย เช่น รหัสผ่านที่ง่ายเกินไปหรือไม่บังคับใช้การเข้ารหัสที่ปลอดภัย
                    <br></br>- การขาดการใช้หลายชั้นของการยืนยันตัวตน (Multi-Factor Authentication - MFA) ทำให้ผู้โจมตีสามารถเข้าสู่ระบบได้ง่าย ๆ
                    <br></br>- การใช้ session ที่ไม่ปลอดภัย เช่น session ที่ไม่ถูกทำลายเมื่อผู้ใช้ออกจากระบบ หรือ session ที่ไม่ถูกกำหนดระยะเวลาหมดอายุ
                    <br></br> <br></br>ช่องโหว่นี้อาจนำไปสู่การโจมตีประเภทต่าง ๆ เช่น Credential Stuffing, Brute Force Attacks, หรือ Session Fixation ซึ่งผู้โจมตีสามารถใช้ข้อมูลที่ขโมยมาได้เพื่อเข้าถึงข้อมูลหรือสิทธิพิเศษในระบบได้อย่างไม่ถูกต้อง
                  </Typography>

                </Box>
                <Grid2
                  container spacing={{ xs: 2, md: 12 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  sx={{
                    mx: 4,
                  }}
                >
                  <GridCard2 src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F11(ToxicDepen).png?alt=media&token=56fc37a3-49af-4d8c-b2b3-541cb7dd67a8'
                    onClick={() => handleNavigate('/LessonPage/PasswordMismanagement')}>
                    <Typography variant='h4'></Typography>
                  </GridCard2>
                  <GridCard2 src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F13(PrivilegeEs).png?alt=media&token=1fd7b9ee-86b3-42b0-bd07-887315efed67'
                    onClick={() => handleNavigate('/LessonPage/PrivilegeEscalation')}>
                    <Typography variant='h4'></Typography>
                  </GridCard2>
                  <GridCard2 src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F14(SessionFix).png?alt=media&token=2407e99d-7d64-4eac-803f-676bd74493d1'
                    onClick={() => handleNavigate('/LessonPage/SessionFixation')}>
                    <Typography variant='h4'></Typography>
                  </GridCard2>
                  <GridCard2 src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F15(UserEnum).png?alt=media&token=c62264b3-62c6-4e18-99cd-ceaa9eb35a00'
                    onClick={() => handleNavigate('/LessonPage/UserEnumeration')}>
                    <Typography variant='h4'></Typography>
                  </GridCard2>
                  <GridCard2 src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F16(WeakSession).png?alt=media&token=77c60e8c-ede1-4b1a-8cf4-37dbd3052fb9'
                    onClick={() => handleNavigate('/LessonPage/WeakSessionIds')}>
                    <Typography variant='h4'></Typography>
                  </GridCard2>

                </Grid2>

                <Box sx={{
                  my: 10,
                  mb: 48,
                  height: 30,
                  width: '140vh',
                  boxShadow: '0 4px 0 rgba(0,0,0,0.2)'
                }} >
                  <Typography variant='h5' fontWeight={600} mb={3.5}>8. Software and Data Integrity Failures  </Typography>
                  <Typography variant='h6' mb={3.5}>Software and Data Integrity Failures เป็นหนึ่งในประเภทช่องโหว่ที่มุ่งเน้นการโจมตีที่เกี่ยวข้องกับความสมบูรณ์ของข้อมูลและซอฟต์แวร์ โดยช่องโหว่นี้เกิดขึ้นเมื่อระบบขาดการป้องกันหรือกระบวนการที่เพียงพอในการตรวจสอบความถูกต้องของข้อมูล, การอัปเดตซอฟต์แวร์ หรือการป้องกันการแก้ไขข้อมูลโดยไม่ได้รับอนุญาต ซึ่งอาจนำไปสู่การถูกโจมตี เช่น การฝังโค้ดอันตรายหรือการทำให้ข้อมูลในระบบถูกแก้ไขโดยไม่รู้ตัว</Typography>
                  <Typography variant='h6'>การโจมตีที่เกี่ยวข้อง ได้แก่<br></br>
                    <br></br>- Supply Chain Attacks  การแทรกแซงหรือดัดแปลงโค้ดในห่วงโซ่อุปทาน เช่น การแทรกมัลแวร์ในซอฟต์แวร์จากผู้ให้บริการบุคคลที่สาม
                    <br></br>- CI/CD Pipeline Attacks  การโจมตีในกระบวนการพัฒนาและปล่อยซอฟต์แวร์ (Continuous Integration/Continuous Deployment) เพื่อแทรกโค้ดอันตรายในขั้นตอนการผลิตซอฟต์แวร์
                    <br></br>- Untrusted Plugins or Libraries การใช้ปลั๊กอินหรือไลบรารีที่ไม่น่าเชื่อถือซึ่งอาจมีโค้ดอันตรายแฝงอยู่
                  </Typography>
                </Box>
                <Grid2
                  container spacing={{ xs: 2, md: 12 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  sx={{
                    mx: 4,
                  }}
                >
                  <GridCard2 src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F17(SoftwareAndDataFail).png?alt=media&token=632cc98c-6e2c-4ff3-aae9-4e6206e391b2'
                    onClick={() => handleNavigate('/LessonPage/SoftwareAndDataIntegrity')}>
                    <Typography variant='h4'></Typography>
                  </GridCard2>

                </Grid2>

                <Box sx={{
                  my: 10,
                  mb: 35,
                  height: 30,
                  width: '140vh',
                  boxShadow: '0 4px 0 rgba(0,0,0,0.2)'
                }} >
                  <Typography variant='h5' fontWeight={600} mb={3.5}>9. Security Logging and Monitoring Failures</Typography>
                  <Typography variant='h6' mb={3.5}>Security Logging and Monitoring Failures หมายถึงการขาดการบันทึกข้อมูลด้านความปลอดภัยและการตรวจสอบเหตุการณ์ที่เกี่ยวข้องในระบบ ทำให้เมื่อเกิดการโจมตีหรือการละเมิดความปลอดภัยขึ้น การตรวจพบและการตอบสนองจะล่าช้าหรือไม่สามารถทำได้เลย ซึ่งเป็นช่องโหว่ที่อาจทำให้ผู้โจมตีสามารถเข้าถึงหรือทำลายข้อมูลสำคัญได้โดยไม่มีการตรวจจับอย่างทันท่วงที</Typography>
                  <Typography variant='h6'>ตัวอย่างการโจมตี เช่น หากมีผู้ไม่หวังดีพยายามเข้าถึงระบบด้วยรหัสผ่านผิดซ้ำหลายครั้ง ระบบควรบันทึกเหตุการณ์เหล่านี้เพื่อให้ผู้ดูแลสามารถตรวจพบความพยายามดังกล่าวและดำเนินการตอบสนอง แต่หากไม่มีการบันทึกหรือแจ้งเตือนใด ๆ ผู้โจมตีอาจจะสามารถทำซ้ำได้จนกว่าจะเจอรหัสผ่านที่ถูกต้อง</Typography>
                </Box>
                <Grid2
                  container spacing={{ xs: 2, md: 12 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  sx={{
                    mx: 4,
                  }}
                >
                  <GridCard2 src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F17(SoftwareAndDataFail).png?alt=media&token=632cc98c-6e2c-4ff3-aae9-4e6206e391b2'
                    onClick={() => handleNavigate('/LessonPage/LoggingAndMonitoringFailures')}>
                    <Typography variant='h4'></Typography>
                  </GridCard2>

                </Grid2>

                <Box sx={{
                  my:10,
                  mb:55,
                  height: 30,
                  width: '140vh',
                  boxShadow: '0 4px 0 rgba(0,0,0,0.2)'
                }} >
                  <Typography variant='h5' fontWeight={600} mb={3.5}>10. Server-Side Request Forgery (SSRF)</Typography>
                  <Typography variant='h6' mb={3.5}>Server-Side Request Forgery (SSRF) หรือการโจมตีแบบปลอมแปลงคำร้องฝั่งเซิร์ฟเวอร์ เป็นการโจมตีที่ผู้ไม่หวังดีทำการส่งคำขอ (request) ไปยังเซิร์ฟเวอร์หนึ่ง เพื่อให้เซิร์ฟเวอร์นั้นส่งคำขอต่อไปยังเซิร์ฟเวอร์เป้าหมายหรือระบบภายในที่ไม่ได้เปิดเผยให้ผู้ใช้ภายนอกเข้าถึงได้ โดยผู้โจมตีอาจสั่งให้เซิร์ฟเวอร์เป้าหมายทำการร้องขอไปยัง API ภายใน ดูข้อมูลเซิร์ฟเวอร์อื่น หรือเข้าถึงทรัพยากรที่ควรถูกป้องกันไว้ได้</Typography>
                  <Typography variant='h6'>หลักการทำงานของ SSRF: เซิร์ฟเวอร์ที่ถูกโจมตีมักเป็นเซิร์ฟเวอร์ที่รับข้อมูล URL จากผู้ใช้และทำการส่งคำขอ HTTP ต่อไปตามที่ผู้ใช้ระบุ หากเซิร์ฟเวอร์ไม่ได้กรองหรือจำกัด URL ที่ส่งไปอย่างเข้มงวด ผู้โจมตีสามารถส่ง URL ของเซิร์ฟเวอร์ภายในหรือบริการอื่นที่เซิร์ฟเวอร์สามารถเข้าถึงได้ ทำให้เข้าถึงข้อมูลสำคัญหรือแอบส่งคำขอไปยังระบบภายในได้โดยตรง
                    <br></br><br></br>ตัวอย่างผลกระทบจาก SSRF
                    <br></br>- เข้าถึงข้อมูลในเครือข่ายภายใน เช่น ฐานข้อมูล หรือข้อมูลสำคัญอื่นๆ
                    <br></br>- ทำให้ระบบมีช่องโหว่สำหรับโจมตีแบบอื่น เช่น การโจมตีข้ามระบบ (pivoting) เพื่อเข้าถึงระบบที่อยู่ลึกขึ้น
                    <br></br>- ทำให้เซิร์ฟเวอร์ทำงานผิดปกติหรือถูกใช้เป็นฐานโจมตีระบบอื่น
                  </Typography>
                </Box>
                <Grid2
                  container spacing={{ xs: 2, md: 12 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  sx={{
                    mx: 4,
                  }}
                >
                  <GridCard2 src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F18(SecurityLoggingAndMonit).png?alt=media&token=7f6c9cab-23b0-4de3-8026-857b0fd45d34'
                    onClick={() => handleNavigate('/LessonPage/ServerSideRequestForgery')}>
                    <Typography variant='h4'></Typography>
                  </GridCard2>

                </Grid2>


              </Grid2>

            </Container>
            <Chatbot />
          </Box>
        </Box>
      </Box>
    </>
  )
}
