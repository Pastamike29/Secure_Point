import { Box, Container, List, ListItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Navbar from '../../../Components/Navbar'
import FitImage from '../../../Components/FitImage'
import CodeWindow from '../../../Components/Code/CodeWindow'
import { getToxicDependenciesCodeSnippets } from '../../../Components/Code/Owasp6_Code/ToxicSourceCode'

export default function ToxicDependencies() {


  const codeSnippet1 = getToxicDependenciesCodeSnippets('Lesson1');
  const codeSnippet2 = getToxicDependenciesCodeSnippets('Lesson2');
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
                    <Typography variant='h4'> Toxic Dependencies </Typography>
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

                      <FitImage src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F11(ToxicDepen).png?alt=media&token=56fc37a3-49af-4d8c-b2b3-541cb7dd67a8' />

                      <Typography sx={{
                        pt: 3,
                        pb: 6,
                      }}><b>Toxic Dependencies</b> คือการที่โปรเจกต์หรือแอปพลิเคชันของคุณพึ่งพาหรือใช้งานไลบรารีหรือแพ็กเกจภายนอก (เช่น ไลบรารีที่ดาวน์โหลดจาก npm, PyPI หรือ Maven) ที่มีปัญหาหรือข้อบกพร่องที่อาจทำให้โปรเจกต์ของคุณเกิดความเสี่ยง ซึ่งอาจมีผลกระทบต่อความมั่นคงปลอดภัย (security), ความเสถียร (stability), หรือความสามารถในการบำรุงรักษา (maintainability) ในระยะยาว

                      </Typography>
                      <Typography variant='h6' >Toxic Dependencies สามารถเกิดขึ้นได้จากหลายสาเหตุ เช่น</Typography>
                      <List>
                        <ListItem><Typography>1. ปัญหาด้านความปลอดภัย (Security Risks): ไลบรารีที่เราใช้บางครั้งอาจมีช่องโหว่ที่ไม่ได้รับการแก้ไขจากผู้พัฒนา ซึ่งอาจทำให้แฮกเกอร์ใช้ช่องโหว่นี้ในการโจมตีระบบของคุณได้ เช่น การใช้โค้ดที่มีช่องโหว่ที่สามารถแทรกซึมรหัสผ่านหรือข้อมูลสำคัญได้</Typography></ListItem>
                        <ListItem><Typography>2. การใช้ Libraries เวอร์ชันเก่า (Abandoned Libraries): บางไลบรารีที่เราใช้ในโปรเจกต์อาจไม่ได้รับการอัปเดตอีกต่อไปจากผู้พัฒนา ซึ่งอาจหมายถึงว่าไม่มีการแก้ไขบั๊กหรืออัปเดตเพื่อรองรับเวอร์ชันใหม่ๆ ของภาษาโปรแกรมหรือเฟรมเวิร์กที่คุณใช้</Typography></ListItem>
                        <ListItem><Typography>3. การเข้ากันไม่ได้กับระบบที่มีอยู่ (Compatibility Issues): ไลบรารีบางตัวอาจไม่สามารถทำงานได้ดีเมื่อใช้งานร่วมกับไลบรารีตัวอื่น หรือเมื่ออัปเกรดเวอร์ชันของภาษาหรือเฟรมเวิร์กที่ใช้อยู่ ทำให้เกิดปัญหาการใช้งานหรือแม้แต่แครชของระบบ</Typography></ListItem>
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
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>1. อัปเดต Dependencies ให้เป็นเวอร์ชันล่าสุด</Typography>
                          การอัปเดตไลบรารีที่คุณใช้ให้เป็นเวอร์ชันล่าสุดที่ผู้พัฒนาออกให้ เป็นวิธีที่ดีที่สุดในการแก้ไขช่องโหว่ที่มีในเวอร์ชันเก่า เนื่องจากไลบรารีใหม่ ๆ มักจะมีการอัปเดตด้านความปลอดภัยและฟีเจอร์ที่ดีกว่า
                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet1}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. npm outdated: ใช้เพื่อตรวจสอบว่ามีไลบรารีตัวไหนบ้างที่มีเวอร์ชันใหม่กว่าเวอร์ชันที่คุณติดตั้งอยู่</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. npm update: ใช้เพื่ออัปเดตไลบรารีทั้งหมดให้เป็นเวอร์ชันล่าสุดที่รองรับใน package.json</Typography>
                          </ListItem>
                            <Typography>การอัปเดต dependencies อย่างสม่ำเสมอจะช่วยลดความเสี่ยงจากช่องโหว่ที่อาจถูกพบในเวอร์ชันเก่าได้</Typography>
                        </List>
                      </Box>


                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>2. ตรวจสอบและหลีกเลี่ยงไลบรารีที่ถูกทิ้งร้าง (Abandoned Libraries)</Typography>
                          ไลบรารีที่ไม่ได้รับการพัฒนาอีกต่อไปหรือถูกทิ้งร้าง อาจไม่มีการแก้ไขบั๊กหรือช่องโหว่ที่พบหลังจากนั้น การตรวจสอบว่าไลบรารีที่ใช้ยังคงได้รับการพัฒนาอยู่หรือไม่เป็นสิ่งที่สำคัญ                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet2}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. npm audit: เครื่องมือที่ใช้ตรวจสอบช่องโหว่ที่อาจมีใน dependencies ทั้งหมดในโปรเจกต์ของคุณ และแนะนำวิธีการแก้ไข</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. npm info 'package-name': ใช้เพื่อดูข้อมูลของไลบรารี เช่น สถานะการอัปเดตว่าไลบรารีนั้นยังได้รับการสนับสนุนหรือไม่</Typography>
                          </ListItem>
                         </List>
                         </Box>
                      <Box>
                        <Typography variant='h5'>สรุป</Typography>
                        <Typography>โดยการตรวจสอบและจัดการกับการพึ่งพาอย่างรอบคอบ ทำให้สามารถหลีกเลี่ยงความเสี่ยงจาก Toxic Dependencies และรักษาความเสถียรและความปลอดภัยของโปรเจกต์ในระยะยาวได้</Typography>
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
