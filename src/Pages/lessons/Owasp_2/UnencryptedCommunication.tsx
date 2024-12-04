import { Box, Container, Grid2, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import GridCard from '../../../Components/GridCard'
import GridCard2 from '../../../Components/GridCard2'
import Sidebar from '../../../Components/Sidebar'
import Navbar from '../../../Components/Navbar'
import PageNavigation from '../../../Components/PageNavigation'
import FitImage from '../../../Components/FitImage'
import { getUnencryptedCodeSnippets } from '../../../Components/Code/Owasp2_Code/UnencryptedSourceCode'
import CodeWindow from '../../../Components/Code/CodeWindow'
import { Code } from '@mui/icons-material'

export default function UnencryptedCommunication() {


  const codeSnippet1 = getUnencryptedCodeSnippets('Lesson1');
  const codeSnippet2 = getUnencryptedCodeSnippets('Lesson2');
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
                    <Typography variant='h4'> Unencrypted Communication</Typography>
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

                      <FitImage src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F4(UnencryptCommu).png?alt=media&token=54247f20-92c3-4d94-b522-f1c17179f3f7' />

                      <Typography sx={{
                        pt: 3,
                        pb: 6
                      }}>
                        Unencrypted Communication หรือการสื่อสารที่ไม่เข้ารหัส คือการส่งข้อมูลระหว่างผู้ใช้งานและเซิร์ฟเวอร์โดยไม่มีการป้องกัน ซึ่งทำให้ข้อมูลสำคัญ เช่น รหัสผ่าน หรือข้อมูลส่วนตัว ถูกดักจับได้โดยง่าย หากผู้โจมตีเข้ามาสอดแนมการเชื่อมต่อ การใช้โปรโตคอลที่ไม่เข้ารหัสอย่าง HTTP แทนที่จะเป็น HTTPS อาจทำให้ข้อมูลที่ส่งผ่านถูกเปิดเผยต่อสาธารณะ

                      </Typography>

                    </Box>
                  </Box>

                  <Box>




                    <Box sx={{
                      boxShadow: 3,
                      p: 6,
                      my: 3,
                    }}>
                      <Box sx={{
                        my: 5,
                      }}>
                        <Typography variant='h4'
                          sx={{
                            pb: 2
                          }}>
                          How to solve
                        </Typography>

                        <Typography sx={{
                          mb: 7
                        }}>
                          การแก้ไขปัญหา Unencrypted Communication หรือการสื่อสารที่ไม่มีการเข้ารหัส สามารถช่วยป้องกันการดักจับข้อมูลที่สำคัญ เช่น ข้อมูลล็อกอินหรือข้อมูลบัตรเครดิต วิธีการแก้ไขนั้นเน้นไปที่การใช้งานโปรโตคอลที่ปลอดภัยและการเข้ารหัสข้อมูล ตัวอย่างการแก้ไขมีดังนี้:<br /><br />
                          <Typography variant='h6'>1. บังคับให้ใช้ HTTPS แทน HTTP</Typography>
                          การใช้ HTTPS แทน HTTP จะช่วยให้การสื่อสารระหว่างผู้ใช้กับเซิร์ฟเวอร์ถูกเข้ารหัสผ่าน SSL/TLS เพื่อป้องกันการดักจับข้อมูล
                          
                        </Typography>

                        <CodeWindow
                          codeSnippets={codeSnippet1}
                        />
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6'>2.การเข้ารหัสข้อมูลที่สำคัญก่อนส่ง</Typography>
                          แม้จะใช้ HTTPS แต่การเข้ารหัสข้อมูลสำคัญก่อนการส่งผ่าน API หรือเน็ตเวิร์กจะช่วยเพิ่มความปลอดภัยอีกขั้น
                        </Typography>

                        <CodeWindow
                          codeSnippets={codeSnippet2}
                        />
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
