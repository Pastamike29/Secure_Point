import { Box, Container, List, ListItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Navbar from '../../../Components/Navbar'
import FitImage from '../../../Components/FitImage'
import CodeWindow from '../../../Components/Code/CodeWindow'
import { getUserEnumerationCodeSnippets } from '../../../Components/Code/Owasp7_Code/UserEnumSourceCode'

export default function UserEnumeration() {


  const codeSnippet1 = getUserEnumerationCodeSnippets('Lesson1');
  const codeSnippet2 = getUserEnumerationCodeSnippets('Lesson2');
  const codeSnippet3 = getUserEnumerationCodeSnippets('Lesson3');
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
                    <Typography variant='h4'> User Enumeration </Typography>
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

                      <FitImage src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F15(UserEnum).png?alt=media&token=c62264b3-62c6-4e18-99cd-ceaa9eb35a00' />

                      <Typography sx={{
                        pt: 3,
                        pb: 6,
                      }}><b>User Enumeration</b>คือ เทคนิคหรือวิธีการที่ผู้โจมตีใช้ในการสืบค้นข้อมูลเกี่ยวกับผู้ใช้ (username) ในระบบที่มีการตอบสนองแตกต่างกันเมื่อใส่ข้อมูลผู้ใช้ที่ถูกต้องและผิดพลาด เช่น ระบบที่แจ้งว่า "ชื่อผู้ใช้ไม่ถูกต้อง" หรือ "รหัสผ่านไม่ถูกต้อง" เมื่อผู้ใช้กรอกข้อมูลผิด ระบบที่มีการตอบกลับแบบนี้ทำให้ผู้โจมตีสามารถแยกแยะได้ว่า ชื่อผู้ใช้ไหนมีอยู่ในระบบและชื่อไหนไม่มี

                      </Typography>
                      <Typography variant='h6' >วิธีการทำงานของ User Enumeration</Typography>
                      <List>
                        <ListItem><Typography>เมื่อผู้โจมตีพยายามลองกรอกข้อมูลล็อกอิน โดยการใช้ชื่อผู้ใช้ที่แตกต่างกันและรหัสผ่านที่ผิด ระบบที่ไม่ปิดบังรายละเอียดในการแจ้งเตือนจะบอกว่า ชื่อผู้ใช้ถูกต้องหรือไม่ และรหัสผ่านผิดหรือไม่ ซึ่งทำให้ผู้โจมตีสามารถตรวจสอบและรวบรวมข้อมูลได้</Typography></ListItem>
                        <ListItem><Typography>เช่น หากระบบตอบว่า "ชื่อผู้ใช้ไม่ถูกต้อง" หมายความว่า ชื่อผู้ใช้ที่ใช้ไม่ถูกต้อง แต่ถ้าระบบตอบว่า "รหัสผ่านไม่ถูกต้อง" หมายความว่า ชื่อผู้ใช้ที่ใส่มีอยู่ในระบบจริง</Typography></ListItem>
                      </List>
                      <Typography variant='h6' my={3}>ตัวอย่างการโจมตี</Typography>
                      <List>

                        <Typography>หากระบบตอบสนองแตกต่างกันเมื่อกรอกชื่อผู้ใช้ที่ผิดและชื่อผู้ใช้ที่ถูกต้อง ผู้โจมตีสามารถลองใช้ชื่อผู้ใช้หลายๆ แบบ และตรวจสอบว่าระบบตอบกลับแบบไหน เมื่อระบบตอบว่า "ชื่อผู้ใช้ไม่ถูกต้อง" ก็สามารถตัดสินใจได้ว่า ชื่อผู้ใช้ที่ใส่ผิด แต่เมื่อระบบตอบว่า "รหัสผ่านไม่ถูกต้อง" ก็จะทราบได้ว่าชื่อผู้ใช้นั้นมีอยู่จริงในระบบ</Typography>

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
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>1. แสดงข้อความ Error แบบไม่เจาะจง</Typography>
                          การแสดงข้อความ Error เดียวกันสำหรับทั้งสองกรณี (กรอกชื่อผู้ใช้ผิดหรือรหัสผ่านผิด) จะช่วยป้องกันการเปิดเผยข้อมูลเกี่ยวกับชื่อผู้ใช้ ระบบจะไม่บอกว่า "ชื่อผู้ใช้ไม่ถูกต้อง" หรือ "รหัสผ่านไม่ถูกต้อง" แต่จะบอกเพียงว่า "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet1}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. ฟังก์ชัน getUserFromDatabase(username) ดึงข้อมูลผู้ใช้จากฐานข้อมูลที่เกี่ยวข้องกับชื่อผู้ใช้ที่ใส่</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. ถ้าผู้ใช้มีข้อมูลในระบบและรหัสผ่านถูกต้อง ก็จะแจ้งว่าเข้าสู่ระบบสำเร็จ</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>3. หากข้อมูลไม่ถูกต้อง (ไม่ว่าจะเป็นชื่อผู้ใช้หรือรหัสผ่าน) จะมีข้อความตอบกลับเหมือนกัน คือ "Invalid username or password" ซึ่งจะไม่บอกว่าเกิดจากอะไร</Typography>
                          </ListItem>
                        </List>
                      </Box>


                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>2. การจำกัดการพยายามล็อกอิน (Rate Limiting)</Typography>
                          การจำกัดจำนวนครั้งที่สามารถพยายามเข้าสู่ระบบได้ในช่วงเวลาหนึ่ง เช่น ถ้าผู้ใช้พยายามกรอกข้อมูลผิดหลายครั้งในระยะเวลาสั้นๆ ระบบจะบล็อกการพยายามนั้นชั่วคราว เพื่อป้องกันการทำการโจมตีแบบ brute-force                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet2}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. loginAttempts เก็บข้อมูลจำนวนการพยายามเข้าสู่ระบบของแต่ละผู้ใช้</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. กำหนด maxAttempts ให้ผู้ใช้พยายามได้ 5 ครั้ง และให้ lockTime คือ 30 วินาที เมื่อผู้ใช้พยายามผิดเกินจำนวนที่กำหนด ระบบจะบล็อกการพยายามชั่วคราว</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>3. ฟังก์ชัน login จะตรวจสอบว่าเมื่อไหร่ควรล็อกผู้ใช้และรีเซ็ตการพยายามเมื่อเข้าสู่ระบบสำเร็จ</Typography>
                          </ListItem>
                        </List>
                      </Box>

                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>3. การใช้ Multi-Factor Authentication (MFA)</Typography>
                          การใช้การยืนยันตัวตนหลายขั้นตอน (MFA) เช่น การใช้รหัส OTP (One-Time Password) เพิ่มชั้นการป้องกันหลังจากผู้ใช้กรอกชื่อผู้ใช้และรหัสผ่านถูกต้อง วิธีนี้จะทำให้การโจมตีแบบ User Enumeration หรือการโจมตีแบบ Brute Force ยากขึ้นมาก                        </Typography>

                        <CodeWindow
                          codeSnippets={codeSnippet3}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. เมื่อรหัสผ่านของผู้ใช้ถูกต้อง ระบบจะส่ง OTP ไปยังอีเมล์ของผู้ใช้</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. ผู้ใช้ต้องกรอกรหัส OTP ที่ได้รับจากระบบเพื่อทำการยืนยันตัวตน</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>3. generateOtp() ฟังก์ชันสมมุติในการสร้าง OTP และ sendOtpToUser() ส่ง OTP ไปยังอีเมล์ของผู้ใช้</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>4. ฟังก์ชัน verifyOtp() ใช้ในการตรวจสอบว่า OTP ที่กรอกนั้นถูกต้องหรือไม่</Typography>
                          </ListItem>
                        </List>
                      </Box>
                      <Box>
                        <Typography variant='h5'>สรุป</Typography>
                        <Typography>User Enumeration คือการใช้ข้อแตกต่างในการตอบสนองจากระบบเพื่อตรวจสอบข้อมูลของผู้ใช้ในระบบ โดยไม่จำเป็นต้องรู้ข้อมูลทั้งหมด ระบบที่มีช่องโหว่ในส่วนนี้สามารถทำให้ผู้โจมตีรวบรวมข้อมูลชื่อผู้ใช้ที่มีอยู่ในระบบได้ง่ายขึ้น ซึ่งทำให้สามารถใช้ข้อมูลเหล่านั้นในการโจมตีระบบได้ง่ายขึ้น</Typography>
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
