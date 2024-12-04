import { Box, Container, Grid2, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import GridCard from '../../../Components/GridCard'
import GridCard2 from '../../../Components/GridCard2'
import Sidebar from '../../../Components/Sidebar'
import Navbar from '../../../Components/Navbar'
import PageNavigation from '../../../Components/PageNavigation'
import FitImage from '../../../Components/FitImage'
import CodeWindow from '../../../Components/Code/CodeWindow'
import { getBrokenAccControlCodeSnippets } from '../../../Components/Code/Owasp1_Code/BrokenSourceCode'

export default function BrokenAccControl() {


  const codeSnippet1 = getBrokenAccControlCodeSnippets('Lesson1');
  const codeSnippet2 = getBrokenAccControlCodeSnippets('Lesson2');
  const codeSnippet3 = getBrokenAccControlCodeSnippets('Lesson3');
  const codeSnippet4 = getBrokenAccControlCodeSnippets('Lesson4');
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
                    <Typography variant='h4'fontWeight={650}>Broken Access Control</Typography>
                    <Typography variant='h4' sx={{
                      color: '#5155f5'
                    }}>
                      Secure Point
                    </Typography>
                    <Box sx={{
                      boxShadow: 3,
                      p:6,
                      my: 4,
                    }}>

                      <FitImage src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F19(SSRF).png?alt=media&token=494c3c37-2c98-4937-b31e-74cca0569303' />

                      <Typography sx={{
                        pt: 3,
                        pb: 6,
                      }}>
                        Broken Access Control หมายถึง ช่องโหว่ในระบบที่เกิดจากการที่ผู้ใช้สามารถเข้าถึงข้อมูลหรือฟังก์ชันที่ไม่ควรเข้าถึงได้ เนื่องจากระบบไม่ได้ตรวจสอบหรือควบคุมสิทธิ์การเข้าถึงอย่างถูกต้อง <br /><br />
                        ตัวอย่างเช่น <br /><br />
                        1. การเข้าถึงข้อมูลของคนอื่น: ผู้ใช้สามารถเปลี่ยน URL หรือรหัสในระบบเพื่อดูข้อมูลของคนอื่น เช่น การเปลี่ยน ID ของคำสั่งซื้อในร้านค้าออนไลน์เพื่อดูคำสั่งซื้อของลูกค้าคนอื่น <br />
                        2. สิทธิ์เกินกว่าที่ควร: ผู้ใช้ธรรมดาสามารถเข้าถึงฟังก์ชันของผู้ดูแลระบบได้ เช่น การลบหรือแก้ไขข้อมูลที่สำคัญ
                      </Typography>

                    </Box>
                  </Box>

                  <Box>
                    <Box 
                    sx={{
                      boxShadow: 3,
                      p:6,
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
                          การแก้ปัญหา Broken Access Control แบบพื้นฐานในโค้ดเพื่อป้องกันช่องโหว่ประเภทนี้ สามารถทำได้โดยใช้หลักการต่อไปนี้:<br /><br />
                          1. จำกัดสิทธิ์การเข้าถึงอย่างเหมาะสม<br />
                          กำหนดให้ผู้ใช้สามารถเข้าถึงเฉพาะฟังก์ชันหรือข้อมูลที่เกี่ยวข้องกับสิทธิ์ของตนเองเท่านั้น<br />
                          ตัวอย่างเช่น ตรวจสอบว่าผู้ใช้สามารถเข้าถึงไฟล์เฉพาะของตัวเองได้เท่านั้น ไม่สามารถเข้าถึงข้อมูลของผู้ใช้คนอื่นได้

                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet1}
                        />
                      </Box>

                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          2. ตรวจสอบสิทธิ์การเข้าถึงทุกครั้ง<br />
                          ตรวจสอบสิทธิ์การเข้าถึงก่อนที่จะอนุญาตให้ผู้ใช้ทำการกระทำใด ๆ เช่น แก้ไข หรือลบข้อมูล
                        </Typography>

                        <CodeWindow
                          codeSnippets={codeSnippet2}
                        />
                      </Box>

                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          3. ใช้การยืนยันตัวตนและการกำหนดสิทธิ์<br />
                          การยืนยันตัวตน (Authentication) เป็นสิ่งสำคัญที่ควรทำให้แน่ใจว่าผู้ใช้ที่ทำการร้องขอเป็นใคร<br />
                          กำหนดสิทธิ์ (Authorization) ต้องตรวจสอบว่าผู้ใช้นั้นสามารถทำการกระทำที่ร้องขอได้หรือไม่
                        </Typography>

                        <CodeWindow
                          codeSnippets={codeSnippet3}
                        />
                      </Box>
                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          4. ใช้หลักการ "Deny by Default" (ปฏิเสธโดยค่าเริ่มต้น)<br />
                          ตั้งค่าให้ทุกการเข้าถึงถูกปฏิเสธโดยค่าเริ่มต้น หากผู้ใช้ไม่มีสิทธิ์เฉพาะในการทำสิ่งใดสิ่งหนึ่ง<br />
                          ยกตัวอย่างเช่น หากไม่ได้กำหนดสิทธิ์ในการเข้าถึงส่วนใดส่วนหนึ่งของระบบ จะต้องปฏิเสธการเข้าถึงโดยอัตโนมัติ
                        </Typography>

                        <CodeWindow
                          codeSnippets={codeSnippet4}
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
