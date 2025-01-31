import { Box, Container, List, ListItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Navbar from '../../../Components/Navbar'
import FitImage from '../../../Components/FitImage'
import CodeWindow from '../../../Components/Code/CodeWindow'
import { getWeakSessionIdsCodeSnippets } from '../../../Components/Code/Owasp7_Code/WeakSessionSourceCode'

export default function WeakSessionIds() {


  const codeSnippet1 = getWeakSessionIdsCodeSnippets('Lesson1');
  const codeSnippet2 = getWeakSessionIdsCodeSnippets('Lesson2');
  const codeSnippet3 = getWeakSessionIdsCodeSnippets('Lesson3');
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
                    <Typography variant='h4'> Weak Session IDs </Typography>
                    <Typography variant='h4' sx={{
                      color: '#5155f5'
                    }}>
                      SecurePoint
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
                      }}><b>Weak Session ID</b> หมายถึงการใช้รหัสเซสชัน (Session ID) ที่ไม่ปลอดภัยในการระบุผู้ใช้ในระบบออนไลน์ ซึ่งทำให้แฮ็กเกอร์สามารถเดาหรือโจมตีเพื่อขโมยเซสชันของผู้ใช้งานได้ง่าย ๆ ส่งผลให้สามารถเข้าถึงข้อมูลหรือระบบได้โดยไม่ต้องล็อกอินใหม่หรือยืนยันตัวตน

                      </Typography>
                      <Typography variant='h6' >อธิบายให้เข้าใจง่าย</Typography>
                      <List>
                        <ListItem><Typography>1. Session ID คือ รหัสที่ใช้ในการระบุและติดตามการเชื่อมต่อของผู้ใช้งานกับเว็บไซต์หรือแอปพลิเคชัน หลังจากที่ผู้ใช้ล็อกอินเข้ามาในระบบ ระบบจะสร้าง Session ID เพื่อให้รู้ว่าใครเป็นผู้ใช้งานคนนี้ โดยไม่ต้องให้ผู้ใช้ล็อกอินทุกครั้งที่ทำการร้องขอข้อมูลใหม่</Typography></ListItem>
                        <ListItem>
                          <Typography>
                            2. Weak Session ID หมายถึง Session ID ที่ง่ายต่อการคาดเดาหรือโจมตี เช่น
                            <List>
                              <ListItem>
                                <Typography>ใช้รูปแบบที่เดาง่าย เช่น ตัวเลขหรือตัวอักษรที่สามารถเดาได้จากการทดสอบบางอย่าง</Typography>
                              </ListItem>
                              <ListItem>
                                <Typography>ใช้ระยะเวลาหมดอายุที่สั้นเกินไป หรือไม่มีการรีเฟรชเมื่อผู้ใช้ใช้งาน</Typography>
                              </ListItem>
                              <ListItem>
                                <Typography>ใช้ค่า Session ID ที่ซ้ำกันในหลาย ๆ ครั้งได้</Typography>
                              </ListItem>
                            </List>
                          </Typography>
                        </ListItem>
                      </List>
                      <Typography variant='h6' my={3}>ผลกระทบจากการออกแบบระบบหรือแอปพลิเคชันที่ไม่ปลอดภัย</Typography>
                      <List>
                        <ListItem>
                          <Typography>ความเสี่ยงในการโจมตีสูง: หากไม่มีการคำนึงถึงความปลอดภัยตั้งแต่เริ่มออกแบบ ระบบจะมีช่องโหว่ที่สามารถถูกโจมตีได้ง่าย ไม่ว่าจะเป็นการเข้าถึงข้อมูลที่สำคัญ การเจาะระบบ หรือการใช้ประโยชน์จากข้อผิดพลาดที่เกิดจากการออกแบบ</Typography>
                        </ListItem>
                        <ListItem>
                          <Typography>ยากต่อการแก้ไขภายหลัง: เมื่อระบบถูกออกแบบโดยไม่ได้คำนึงถึงความปลอดภัย มักจะเป็นการยากที่จะทำการปรับปรุงหรือเสริมความปลอดภัยในภายหลัง เนื่องจากการปรับแก้ไขอาจกระทบกับการทำงานหลักของระบบ และอาจต้องใช้ทรัพยากรมากในการแก้ไข</Typography>
                        </ListItem>
                        <ListItem>
                          <Typography>ความเสียหายที่อาจเกิดขึ้น: การโจมตีที่เกิดจากการออกแบบที่ไม่ปลอดภัยสามารถนำไปสู่ความเสียหายทั้งทางการเงินและชื่อเสียงขององค์กร เช่น ข้อมูลลูกค้าถูกขโมย หรือระบบถูกทำลายจนไม่สามารถใช้งานได้</Typography>
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
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>1. การสร้าง Session ID ที่ซับซ้อน</Typography>
                          การสร้าง Session ID ที่ไม่สามารถเดาได้ง่ายโดยใช้ค่าแบบสุ่ม เช่น การใช้รหัสที่ยาวและผสมกันระหว่างตัวเลขและตัวอักษร
                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet1}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. generateSessionID: ฟังก์ชันนี้สร้าง Session ID โดยการสุ่มค่าจากชุดตัวอักษรและตัวเลขที่กำหนด (charset), ซึ่งจะทำให้ Session ID ยากที่จะเดา</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. Math.random(): ฟังก์ชันนี้สุ่มค่าเพื่อเลือกตัวอักษรจาก charset</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>3. 64: ระบุความยาวของ Session ID ที่ต้องการ ซึ่งยิ่งยาวยิ่งปลอดภัย</Typography>
                          </ListItem>
                        </List>
                      </Box>


                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>2. การใช้ Secure Cookie และ HttpOnly Attribute</Typography>
                          การตั้งค่า Secure และ HttpOnly attributes ให้กับ Cookie ช่วยป้องกันการเข้าถึง Session ID จาก JavaScript และทำให้ Cookie ถูกส่งเฉพาะในการเชื่อมต่อ HTTPS เท่านั้น                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet2}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. Secure: Cookie จะถูกส่งไปยังเซิร์ฟเวอร์เท่านั้นเมื่อเชื่อมต่อผ่าน HTTPS ซึ่งช่วยป้องกันการถูกดักจับในการเชื่อมต่อ HTTP ปกติ</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. HttpOnly: ทำให้ Cookie ไม่สามารถถูกเข้าถึงจาก JavaScript ซึ่งช่วยป้องกันการโจมตีแบบ XSS (Cross-Site Scripting)</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>3. SameSite=Strict: ป้องกันการส่ง cookie ไปยังเว็บไซต์อื่นเมื่อมีการเรียกใช้งานจากเว็บไซต์ที่ไม่ใช่เว็บไซต์ของเรา
                            </Typography>
                          </ListItem>
                        </List>
                      </Box>

                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>3. การรีเฟรช Session ID เมื่อมีการเปลี่ยนแปลงผู้ใช้</Typography>
                          เมื่อผู้ใช้ทำการล็อกอินหรือการเปลี่ยนแปลงสิทธิ์ เช่น การอัปเกรดสิทธิ์จากผู้ใช้ธรรมดาเป็นแอดมิน ควรสร้าง Session ID ใหม่เพื่อลดความเสี่ยงจากการถูกขโมย Session ID                        </Typography>

                        <CodeWindow
                          codeSnippets={codeSnippet3}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. refreshSessionID: ฟังก์ชันนี้จะสร้าง Session ID ใหม่และตั้งค่าลงใน Cookie ใหม่ทุกครั้งที่ผู้ใช้ล็อกอินหรือการเปลี่ยนแปลงสถานะ (เช่น การอัปเกรดสิทธิ์)</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. generateSessionID: ฟังก์ชันที่ใช้สร้าง Session ID ใหม่แบบสุ่ม</Typography>
                          </ListItem>
                        </List>
                      </Box>
                      <Box>
                        <Typography variant='h5'>สรุป</Typography>
                        <Typography>Weak Session ID คือการใช้รหัสเซสชันที่ไม่ปลอดภัย หรือมีความเสี่ยงที่จะถูกโจมตี ทำให้แฮ็กเกอร์สามารถขโมยและเข้าถึงบัญชีของผู้ใช้ได้ง่ายขึ้น การสร้าง Session ID ที่แข็งแกร่งและมีการจัดการที่ดีจึงเป็นสิ่งสำคัญในการรักษาความปลอดภัยของระบบออนไลน์</Typography>
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
