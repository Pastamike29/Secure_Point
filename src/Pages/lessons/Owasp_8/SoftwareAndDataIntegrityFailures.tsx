import { Box, Container, List, ListItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Navbar from '../../../Components/Navbar'
import FitImage from '../../../Components/FitImage'
import CodeWindow from '../../../Components/Code/CodeWindow'
import { getSoftwareAndDataIntegrityFailures } from '../../../Components/Code/Owasp8_Code/SoftwareSourceCode'

export default function SoftwareAndDataIntegrityFailures() {


  const codeSnippet1 = getSoftwareAndDataIntegrityFailures('Lesson1');
  const codeSnippet2 = getSoftwareAndDataIntegrityFailures('Lesson2');
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Container maxWidth={false}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column'
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
              top: 0,
              left: 0,
              width: '29%',

            }}>
              <Sidebar>
              </Sidebar>
            </Box>

            <Box sx={{
              mt: 9,
              ml: -9,
              width: '53%'
            }}>

              <Container>
                <Box sx={{
                  my: 7,
                  width: '102vh',
                }}>

                  <Box sx={{
                    fontWeight: 'bold',
                  }}>
                    <Typography variant='h4'> Software And Data Integrity Failures </Typography>
                    <Typography variant='h4' sx={{
                      color: '#5155f5'
                    }}>
                      Secure Point
                    </Typography>
                    <Box sx={{
                      boxShadow: 3,
                      p: 6,
                      my: 4,
                    }}>

                      <FitImage src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F16(WeakSession).png?alt=media&token=77c60e8c-ede1-4b1a-8cf4-37dbd3052fb9' />

                      <Typography sx={{
                        pt: 3,
                        pb: 6,
                      }}><b>Software and Data Integrity Failures</b> คือ การล้มเหลวในการรักษาความสมบูรณ์และความถูกต้องของข้อมูลและซอฟต์แวร์ในระบบคอมพิวเตอร์ ซึ่งสามารถเกิดขึ้นได้เมื่อข้อมูลหรือซอฟต์แวร์ไม่ได้รับการป้องกันจากการเปลี่ยนแปลงที่ไม่ถูกต้อง หรือการแทรกแซงที่อาจเกิดจากบุคคลที่ไม่ได้รับอนุญาต

                      </Typography>
                      <Typography variant='h6' >อธิบายง่ายๆ</Typography>
                      <List>
                        <ListItem>
                          <Typography>
                            Software Integrity Failures (การล้มเหลวของความสมบูรณ์ของซอฟต์แวร์)
                            <ListItem>
                              <Typography>เกิดขึ้นเมื่อซอฟต์แวร์ในระบบถูกแก้ไขหรือเปลี่ยนแปลงโดยไม่ได้รับอนุญาต เช่น การเจาะระบบ (hacking) หรือการติดตั้งมัลแวร์ที่ทำให้ซอฟต์แวร์ทำงานผิดปกติ</Typography>
                            </ListItem>
                            <ListItem>
                              <Typography>อาจทำให้ระบบหรือแอปพลิเคชันทำงานผิดพลาดหรือเกิดความเสียหายอย่างร้ายแรง</Typography>
                            </ListItem>
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <Typography>
                            Data Integrity Failures (การล้มเหลวของความสมบูรณ์ของข้อมูล)                            <ListItem>
                              <Typography>เกิดขึ้นเมื่อข้อมูลที่เก็บอยู่ในระบบถูกแก้ไขหรือลบโดยไม่ได้รับอนุญาต หรือข้อมูลที่ส่งไปยังที่ต่างๆ ไม่ถูกต้อง</Typography>
                            </ListItem>
                            <ListItem>
                              <Typography>ตัวอย่างเช่น ข้อมูลทางการเงินหรือการแพทย์ที่ถูกเปลี่ยนแปลงอาจนำไปสู่ผลกระทบที่ร้ายแรงได้</Typography>
                            </ListItem>
                          </Typography>
                        </ListItem>
                      </List>
                    </Box>
                  </Box>

                  <Box>
                    <Box
                      sx={{
                        boxShadow: 3,
                        p: 6,
                        my: 1,
                      }}>
                      <Typography variant='h4'>

                        How to solve
                      </Typography>

                      <Box sx={{
                        my: 5,
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>1. การใช้ Digital Signatures และการตรวจสอบความถูกต้องของซอฟต์แวร์</Typography>
                          Digital Signatures หรือ "ลายเซ็นดิจิทัล" ช่วยให้มั่นใจได้ว่าไฟล์หรือข้อมูลนั้นไม่ได้ถูกแก้ไขโดยผู้ที่ไม่ได้รับอนุญาต วิธีนี้ใช้การเข้ารหัสเพื่อเซ็นข้อมูลหรือไฟล์ และสามารถตรวจสอบได้ว่าข้อมูลยังเป็นต้นฉบับอยู่

                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet1}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. สร้าง Digital Signature: ใช้ crypto.createSign('sha256') เพื่อสร้างลายเซ็นสำหรับข้อมูล โดยข้อมูลจะถูกอัพเดตและเซ็นด้วย privateKey ในรูปแบบ hex</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. ตรวจสอบลายเซ็น: ฟังก์ชัน verifyData จะตรวจสอบว่าลายเซ็นตรงกับข้อมูลต้นฉบับโดยใช้ publicKey ซึ่งทำให้มั่นใจได้ว่าข้อมูลไม่ถูกแก้ไข</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>3. การใช้งาน: ตัวอย่างนี้สร้าง publicKey และ privateKey สำหรับเซ็นและตรวจสอบข้อมูล โดยผลลัพธ์ isVerified จะเป็น true หากข้อมูลไม่ถูกแก้ไข</Typography>
                          </ListItem>
                        </List>
                      </Box>


                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>2. การใช้ Content Security Policy (CSP) เพื่อป้องกันการโจมตีประเภท Cross-Site Scripting (XSS)</Typography>
                          Content Security Policy (CSP) เป็นกลไกที่สามารถใช้ในเว็บไซต์เพื่อควบคุมแหล่งที่มาของโค้ดและป้องกันการโหลดสคริปต์จากที่มาที่ไม่เชื่อถือได้ ช่วยลดโอกาสที่มัลแวร์จะถูกฝังในเว็บแอปพลิเคชัน                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet2}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. กำหนดค่า CSP: ในโค้ดนี้ใช้ res.setHeader เพื่อกำหนด "Content-Security-Policy" ให้อนุญาตให้โหลดทรัพยากรเฉพาะจาก 'self' เท่านั้น โดยจำกัดการโหลดสคริปต์และสไตล์จากแหล่งที่เชื่อถือได้เท่านั้น</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. ลดความเสี่ยงจาก XSS: ด้วย CSP จะช่วยป้องกันการโจมตี XSS โดยจำกัดสคริปต์หรือเนื้อหาที่โหลดจากภายนอก</Typography>
                          </ListItem>
                        </List>
                      </Box>
                      <Box>
                        <Typography variant='h5'>สรุป</Typography>
                        <Typography>Software and Data Integrity Failures หมายถึง ความล้มเหลวในการรักษาความสมบูรณ์ของซอฟต์แวร์และข้อมูล ทำให้ระบบไม่สามารถทำงานได้ตามปกติหรือข้อมูลถูกดัดแปลงไปในทางที่ไม่เหมาะสม ซึ่งอาจนำไปสู่ความเสียหายที่ร้ายแรงได้ในองค์กรหรือระบบต่างๆ</Typography>
                      </Box>
                    </Box>
                  </Box>

                </Box>
              </Container>


            </Box>
          </Box>
        </Box>

      </Container>

    </>
  )
}
