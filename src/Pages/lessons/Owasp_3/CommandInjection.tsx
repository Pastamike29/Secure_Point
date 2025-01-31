import { Box, Container, Grid2, List, ListItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Navbar from '../../../Components/Navbar'
import FitImage from '../../../Components/FitImage'
import CodeWindow from '../../../Components/Code/CodeWindow'
import { getCommandInjectionCodeSnippets } from '../../../Components/Code/Owasp3_Code/CommanInjection'

export default function CommanInjection() {


  const codeSnippet1 = getCommandInjectionCodeSnippets('Lesson1');
  const codeSnippet2 = getCommandInjectionCodeSnippets('Lesson2');
  const codeSnippet3 = getCommandInjectionCodeSnippets('Lesson3');
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
                    <Typography variant='h4'> Command Injection</Typography>
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

                      <FitImage src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F4(UnencryptCommu).png?alt=media&token=54247f20-92c3-4d94-b522-f1c17179f3f7' />

                      <Typography sx={{
                        pt: 3,
                        pb: 6,
                      }}>Command Injection คือการโจมตีประเภทหนึ่งที่เกิดขึ้นเมื่อผู้โจมตีสามารถแทรกคำสั่งที่ไม่พึงประสงค์ (หรือคำสั่งที่เป็นอันตราย) เข้าไปในระบบปฏิบัติการหรือแอปพลิเคชันผ่านทางช่องโหว่ที่เกิดจากการรับข้อมูลจากผู้ใช้โดยไม่ได้ทำการกรองหรือป้องกันอย่างเหมาะสม <br /><br />
                        <b>การทำงานของ Command Injection:</b><br /><br />
                        เมื่อแอปพลิเคชันหรือโปรแกรมรับข้อมูลจากผู้ใช้ (เช่น คำสั่งจากฟอร์มที่กรอกข้อมูล) แล้วนำข้อมูลนั้นไปใช้ในการรันคำสั่งในระบบปฏิบัติการ (เช่น การใช้คำสั่งใน Linux หรือ Windows) โดยไม่มีการตรวจสอบหรือกรองข้อมูลให้ดีพอ ผู้โจมตีอาจสามารถแทรกคำสั่งพิเศษหรือคำสั่งอันตรายเข้าไปได้<br />

                      </Typography>

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
                         <Typography variant='h6'  sx={{mb:3,fontWeight:'650'}}>1.ใช้ Parameterized APIs หรือ Libraries ที่ปลอดภัย</Typography> 
                          การใช้ APIs หรือ libraries ที่จัดการคำสั่งโดยไม่ต้องใช้ shell commands ช่วยลดความเสี่ยงในการโจมตี ตัวอย่างเช่น ใน JavaScript หากต้องการเรียกใช้คำสั่งระบบ (เช่น ใน Node.js) ควรใช้ฟังก์ชัน child_process.execFile() แทน exec() เนื่องจาก execFile() จะส่งพารามิเตอร์ไปยังคำสั่งโดยตรง ไม่ต้องใช้การ parsing ของ shell ซึ่งลดโอกาสการโจมตีด้วย Command Injection

                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet1}
                        />
                        <Typography>คำอธิบาย:</Typography>
                        <List>
                          <ListItem>
                            <Typography>• execFile('cat', [filename]) ใช้ execFile() เพื่อเรียกใช้งานคำสั่ง cat โดยใส่ชื่อไฟล์ที่ต้องการเป็นอาร์กิวเมนต์แทนการใช้คำสั่ง string เดียว ซึ่งลดความเสี่ยงในการแทรกคำสั่งจากผู้ใช้</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>• ฟังก์ชันนี้จะไม่รันคำสั่งพิเศษจากผู้ใช้ ทำให้คำสั่ง rm -rf / หรือคำสั่งอันตรายอื่น ๆ ไม่สามารถทำงานได้</Typography>
                          </ListItem>
                        </List>
                      </Box>


                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                         <Typography variant='h6'  sx={{mb:3, fontWeight:'650'}}>2. ตรวจสอบและกรองข้อมูลที่รับเข้ามาจากผู้ใช้ (Input Validation)</Typography> 
                         การตรวจสอบข้อมูลที่รับเข้ามาก่อนใช้งานเป็นวิธีที่ช่วยป้องกันการแทรกคำสั่งอันตรายได้ เช่น การกรองเฉพาะตัวอักษรที่ต้องการใช้ (whitelisting) เพื่อให้มั่นใจว่าผู้ใช้ไม่ได้ป้อนคำสั่งที่อาจเป็นอันตรายเข้ามา
                        </Typography>

                        <CodeWindow
                          codeSnippets={codeSnippet2}
                        />
                        <Typography>คำอธิบาย:</Typography>
                        <List>
                          <ListItem>
                            <Typography>• ฟังก์ชัน sanitizeInput() ใช้ regex [^a-zA-Z0-9_] เพื่อแทนที่อักขระที่ไม่ใช่ตัวอักษรหรือตัวเลขด้วยค่าว่าง (''), ทำให้ ;, &, หรือคำสั่งพิเศษอื่นๆ ถูกลบออก</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>• การใช้คำสั่ง exec(command) โดยใส่เฉพาะตัวอักษรที่กำหนดไว้จะช่วยป้องกันไม่ให้ผู้ใช้ส่งคำสั่งที่เป็นอันตรายเข้าไปในระบบได้</Typography>
                          </ListItem>
                        </List>
                      </Box>

                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                         <Typography variant='h6'  sx={{mb:3, fontWeight:'650'}}>3. จำกัดสิทธิ์ของผู้ใช้ที่รันคำสั่งระบบ</Typography> 
                         การจำกัดสิทธิ์ของผู้ใช้ที่มีสิทธิเข้าถึงระบบทำให้การโจมตี Command Injection ลดความเสียหาย ตัวอย่างเช่น ใน Node.js ควรทำงานใน context ที่มีสิทธิน้อยที่สุดเพื่อป้องกันไม่ให้ผู้โจมตีเข้าถึงทรัพยากรสำคัญ
                        </Typography>

                        <CodeWindow
                          codeSnippets={codeSnippet3}
                        />
                        <Typography>คำอธิบาย:</Typography>
                        <List>
                          <ListItem>
                            <Typography>• ฟังก์ชัน restrictedSpawn() ใช้ spawn() เพื่อรันคำสั่งใน context ที่จำกัด โดยกำหนด UID ที่ไม่มีสิทธิ์สูง (เช่น root) และกำหนด directory ให้เข้าถึงได้แค่เฉพาะที่ต้องการ (เช่น /var/www/app)</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>• การจำกัด PATH และ directory ที่สามารถเข้าถึงช่วยลดความเสี่ยงให้ระบบไม่ถูกโจมตีไปถึงไฟล์อื่น ๆ หรือ directory ที่สำคัญ</Typography>
                          </ListItem>
                        </List>
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
