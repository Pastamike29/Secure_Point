import { Box, Container, Grid2, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Navbar from '../../../Components/Navbar'
import PageNavigation from '../../../Components/PageNavigation'
import FitImage from '../../../Components/FitImage'
import CodeWindow from '../../../Components/Code/CodeWindow'
import { getCrossSiteCodeSnippets } from '../../../Components/Code/Owasp1_Code/CrossSiteSourceCode'

export default function CrossSiteRequestForgery() {

  const codeSnippet1 = getCrossSiteCodeSnippets('Lesson1');
  const codeSnippet2 = getCrossSiteCodeSnippets('Lesson2');
  const codeSnippet3 = getCrossSiteCodeSnippets('Lesson3');

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
            <Navbar>

            </Navbar>
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
                    <Typography variant='h4'> Cross Site Request Forgery</Typography>
                    <Typography variant='h4' sx={{
                      color: '#5155f5'
                    }}>
                      Pastar Mike
                    </Typography>
                    <Box sx={{
                      boxShadow: 3,
                      p: 6,
                      my: 5,
                    }}>

                      <FitImage src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F1(csrf).png?alt=media&token=6317ea73-fbae-4445-b0a3-67f347ebbcbc' />

                      <Typography sx={{
                        pt: 3,
                      }}>
                        การโจมตี Cross-Site Request Forgery (CSRF) หรือที่เรียกว่า การปลอมแปลงคำขอข้ามไซต์ คือการที่ผู้โจมตีหลอกให้ผู้ใช้ที่ล็อกอินอยู่ในเว็บไซต์หนึ่ง ดำเนินการคำสั่งโดยไม่ตั้งใจบนเว็บไซต์นั้น เช่น โอนเงิน เปลี่ยนข้อมูลส่วนตัว หรือกระทำการอื่น ๆ โดยที่ผู้ใช้ไม่รู้ตัว <br />
                        ตัวอย่างเช่น:<br />
                        1. ผู้ใช้ล็อกอินเข้าบัญชีธนาคารออนไลน์ <br />
                        2. ผู้โจมตีส่งลิงก์ที่มีคำสั่งให้โอนเงินไปยังบัญชีของตน<br />
                        3. เมื่อผู้ใช้กดลิงก์ คำสั่งจะถูกส่งไปยังเซิร์ฟเวอร์ของธนาคาร โดยใช้ข้อมูลล็อกอินของผู้ใช้ ทำให้เกิดการโอนเงินโดยที่ผู้ใช้ไม่ตั้งใจ<br />
                      </Typography>

                    </Box>
                  </Box>
                </Box>

                <Box>

                  <Box sx={{
                    boxShadow: 3,
                    p: 6,
                    my: 3,
                  }}>

                    <Typography variant='h4'
                      sx={{
                        pb: 3
                      }}>
                      How to solve
                    </Typography>

                    <Box sx={{
                      my: 5,
                    }}>
                      <Typography sx={{
                        mb: 7
                      }}>
                        วิธีแก้ไขปัญหา Cross-Site Request Forgery (CSRF) แบบง่าย<br />

                        การโจมตีแบบ CSRF เกิดขึ้นเมื่อมีคนร้ายส่งคำขอปลอมไปยังเว็บไซต์ที่ผู้ใช้ได้ทำการล็อกอินไว้ เพื่อแก้ปัญหานี้<br />
                        มีวิธีง่าย ๆ หลายวิธีที่สามารถป้องกันได้:<br /><br />

                        1. ใช้ CSRF Token <br />
                        เป็นวิธีที่ปลอดภัยที่สุด ฝั่งเซิร์ฟเวอร์จะสร้างโทเค็นพิเศษ (CSRF Token) ขึ้นมาและใส่ลงในฟอร์ม <br />
                        เมื่อผู้ใช้ส่งฟอร์มกลับมา โทเค็นนี้จะถูกตรวจสอบว่าเป็นคำขอที่ถูกต้องหรือไม่


                      </Typography>
                      <CodeWindow
                        codeSnippets={codeSnippet1}
                      />
                    </Box>

                    <Box sx={{
                      my: 5,
                    }}>
                      <Typography sx={{
                        mb: 7
                      }}>
                        2. ตรวจสอบ Referer หรือ Origin Header<br />
                        วิธีนี้เช็คว่า Referer หรือ Origin ของคำขอมาจากเว็บไซต์ของเราหรือไม่ หากไม่ใช่ ให้ปฏิเสธคำขอ <br />
                        แต่การใช้วิธีนี้อาจไม่ได้ผลในทุกกรณี เช่น บางเบราว์เซอร์หรือไฟร์วอลล์อาจไม่ส่ง Header นี้มา


                      </Typography>
                      <CodeWindow
                        codeSnippets={codeSnippet2}
                      />
                    </Box>

                    <Box sx={{
                      my: 5,
                    }}>
                      <Typography sx={{
                        mb: 7
                      }}>
                        3. ใช้ SameSite Cookie Attribute<br />
                        เป็นวิธีที่ช่วยเพิ่มความปลอดภัยให้กับคุกกี้ โดยการควบคุมว่า cookie นั้นสามารถส่งไปกับคำขอจากเว็บไซต์ที่ต่างกัน (cross-site) หรือไม่ ในการตั้งค่า SameSite Cookie Attribute จะมีสามตัวเลือกหลักคือ Strict, Lax, และ None ซึ่งแต่ละตัวเลือกจะมีข้อจำกัดที่แตกต่างกันเกี่ยวกับการส่งคุกกี้ในคำขอที่มาจากแหล่งต่าง ๆ

                      </Typography>
                      <CodeWindow
                        codeSnippets={codeSnippet3}
                      />
                    </Box>
                  </Box>
                </Box>

              </Container>


              <Box
                sx={{
                  textAlign: 'center',
                  py: 10,
                  pl: 6,
                }}>

                <PageNavigation />

              </Box>



            </Box>
          </Box>
        </Box>

      </Container>

    </>
  )
}
