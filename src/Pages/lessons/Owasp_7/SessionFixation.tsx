import { Box, Container, List, ListItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Navbar from '../../../Components/Navbar'
import FitImage from '../../../Components/FitImage'
import CodeWindow from '../../../Components/Code/CodeWindow'
import { getSessionFixationCodeSnippets } from '../../../Components/Code/Owasp7_Code/SessionSourceCode'

export default function SessionFixation() {


  const codeSnippet1 = getSessionFixationCodeSnippets('Lesson1');
  const codeSnippet2 = getSessionFixationCodeSnippets('Lesson2');
  const codeSnippet3 = getSessionFixationCodeSnippets('Lesson3');
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
                    <Typography variant='h4'> Session Fixation </Typography>
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

                      <FitImage src='https://i.ytimg.com/vi/_jz5qFWhLcg/sddefault.jpg' />

                      <Typography sx={{
                        pt: 3,
                        pb: 6,
                      }}><b>Session Fixation</b>คือ การโจมตีประเภทหนึ่งที่เกิดขึ้นเมื่อผู้โจมตีสามารถกำหนดหรือ "ล็อก" Session ID (หมายเลขประจำตัวของเซสชัน) ของผู้ใช้ที่กำลังเข้าสู่ระบบ เพื่อให้ผู้โจมตีสามารถนำ Session ID นั้นไปใช้เพื่อแอบแฝงตัวเป็นผู้ใช้ที่ถูกต้องและเข้าถึงข้อมูลหรือสิทธิ์ต่าง ๆ ของผู้ใช้นั้นได้

                      </Typography>
                      <Typography variant='h6' >กระบวนการของการโจมตี Session Fixation</Typography>
                      <List>
                        <ListItem><Typography>1. การเตรียม Session ID ที่รู้ล่วงหน้า: ผู้โจมตีจะสร้างหรือรู้ล่วงหน้าถึง Session ID ซึ่งอาจจะเป็น Session ที่มีการกำหนดล่วงหน้าหรือสร้างขึ้นมาใหม่ โดยที่ผู้ใช้ไม่รู้ตัว</Typography></ListItem>
                        <ListItem><Typography>2. การบังคับให้ผู้ใช้ใช้งาน Session ID นี้: ผู้โจมตีสามารถส่ง Session ID ที่กำหนดไว้ให้กับผู้ใช้ เช่น ผ่าน URL, คุกกี้, หรือผ่านฟอร์มการล็อกอิน โดยหวังให้ผู้ใช้ใช้ Session ID นั้นในการเข้าสู่ระบบ</Typography></ListItem>
                        <ListItem><Typography>3. ผู้ใช้ล็อกอินด้วย Session ID ที่ผู้โจมตีจัดการไว้: เมื่อผู้ใช้ล็อกอินเข้าสู่ระบบด้วย Session ID ที่ผู้โจมตีเตรียมไว้แล้ว ผู้โจมตีจะสามารถติดตามและเข้าใช้บัญชีของผู้ใช้นั้นได้โดยที่ผู้ใช้ไม่รู้ตัว</Typography></ListItem>
                        <ListItem><Typography>4. การเข้าถึงข้อมูลและสิทธิ์: หลังจากนั้น ผู้โจมตีสามารถใช้ Session ID นั้นเพื่อเข้าถึงข้อมูลของผู้ใช้หรือทำกิจกรรมต่าง ๆ ในระบบได้เหมือนกับการเป็นผู้ใช้คนนั้น</Typography></ListItem>
                      </List>
                      <Typography variant='h6' my={3}>ตัวอย่าง</Typography>
                      <List>
                        <Typography>สมมติว่ามีเว็บไซต์ที่ผู้ใช้ต้องล็อกอินเพื่อเข้าใช้บริการ หลังจากผู้ใช้ล็อกอินแล้ว ระบบจะให้ Session ID ที่ไม่ซ้ำกัน ซึ่งจะถูกใช้เพื่อจดจำผู้ใช้ในระหว่างที่พวกเขาใช้งานเว็บไซต์ หากผู้โจมตีสามารถส่ง URL ที่มี Session ID ที่รู้ล่วงหน้าหรือฝัง Session ID ในคุกกี้ของผู้ใช้และทำให้ผู้ใช้คลิกลิงก์นั้นได้ ผู้โจมตีจะสามารถเข้าสู่ระบบด้วยสิทธิ์ของผู้ใช้นั้น</Typography>
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
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>1. การรีเฟรช Session ID เมื่อผู้ใช้ล็อกอิน</Typography>
                          วิธีนี้คือการเปลี่ยน Session ID ทุกครั้งที่ผู้ใช้ทำการล็อกอินใหม่ เพื่อให้ผู้โจมตีไม่สามารถใช้ Session ID ที่ตั้งค่าไว้ล่วงหน้าได้
                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet1}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. เมื่อผู้ใช้ล็อกอินสำเร็จ เราใช้ req.session.regenerate() เพื่อสร้าง Session ID ใหม่ให้กับผู้ใช้ ซึ่งจะช่วยป้องกันการโจมตี Session Fixation โดยการเปลี่ยน ID ที่ใช้สำหรับเซสชันใหม่</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. cookie: [secure: true] ใช้เพื่อทำให้คุกกี้ของ session ส่งเฉพาะผ่าน HTTPS เท่านั้น</Typography>
                          </ListItem>
                        </List>
                      </Box>


                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>2. การใช้ Secure Cookies และ HttpOnly Flag</Typography>
                          การตั้งค่า Secure และ HttpOnly สำหรับคุกกี้ช่วยเพิ่มความปลอดภัยของ session โดยการป้องกันการดักจับข้อมูลในคุกกี้ผ่าน JavaScript และการส่งข้อมูลคุกกี้ผ่านการเชื่อมต่อที่ปลอดภัย (HTTPS)                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet2}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. secure: true: คุกกี้จะถูกส่งเฉพาะเมื่อการเชื่อมต่อเป็น HTTPS เท่านั้น
                            </Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. httpOnly: true: คุกกี้จะไม่สามารถเข้าถึงได้จาก JavaScript ซึ่งช่วยป้องกันการโจมตีจาก XSS (Cross-Site Scripting)
                            </Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>3. maxAge: 60000: กำหนดระยะเวลาอายุคุกกี้ (60000ms = 1 นาที)
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
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>3. การตรวจสอบ Session ID ที่ไม่ถูกตั้งค่าโดยผู้ใช้</Typography>
                          วิธีนี้คือการตรวจสอบให้แน่ใจว่า Session ID ที่กำหนดให้กับผู้ใช้เป็น Session ID ที่เซิร์ฟเวอร์ตั้งให้โดยไม่ใช่ที่ผู้ใช้หรือผู้โจมตีสามารถควบคุมได้                        </Typography>

                        <CodeWindow
                          codeSnippets={codeSnippet3}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. ใน middleware, เราตรวจสอบว่า Session ID ที่กำหนดให้กับผู้ใช้เป็น Session ID ใหม่ที่สร้างขึ้นโดยเซิร์ฟเวอร์ (req.session.isNew)</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. หากพบว่า Session ID ถูกตั้งค่าจากผู้ใช้หรือไม่ถูกสร้างใหม่, นั่นอาจหมายความว่า Session ID นั้นอาจจะถูกโจมตีโดยการตั้งค่าไว้ล่วงหน้า (Session Fixation)</Typography>
                          </ListItem>
                        </List>
                      </Box>
                      <Box>
                        <Typography variant='h5'>สรุป</Typography>
                        <Typography>Session Fixation คือ การโจมตีที่ใช้ประโยชน์จาก Session ID ที่ผู้โจมตีสามารถกำหนดให้กับผู้ใช้เพื่อแอบอ้างตัวเป็นผู้ใช้และเข้าถึงข้อมูลของพวกเขา โดยการป้องกันที่ดีที่สุดคือการสร้าง Session ID ใหม่ทุกครั้งที่ผู้ใช้ทำการล็อกอิน และใช้คุกกี้ที่ปลอดภัย</Typography>
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
