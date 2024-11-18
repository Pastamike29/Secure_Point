import { Box, Container, List, ListItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Navbar from '../../../Components/Navbar'
import FitImage from '../../../Components/FitImage'
import CodeWindow from '../../../Components/Code/CodeWindow'
import { getInformationLeakageCodeSnippet } from '../../../Components/Code/Owasp4_Code/InformationSourceCode'

export default function InformationLeakage() {


  const codeSnippet1 = getInformationLeakageCodeSnippet('Lesson1');
  const codeSnippet2 = getInformationLeakageCodeSnippet('Lesson2');
  const codeSnippet3 = getInformationLeakageCodeSnippet('Lesson3');
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
                    <Typography variant='h4'> Information Leakage </Typography>
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
                      }}><b>Information Leakage (การรั่วไหลของข้อมูล)</b> คือสถานการณ์ที่ข้อมูลที่ควรจะเป็นความลับหรือไม่ควรเปิดเผย ได้ถูกเปิดเผยออกมาโดยไม่ได้ตั้งใจ หรือได้รับการเข้าถึงโดยผู้ที่ไม่ควรจะได้รับข้อมูลนั้นๆ ซึ่งมักเกิดขึ้นจากช่องโหว่ในระบบหรือข้อผิดพลาดในการออกแบบระบบต่างๆ<br />

                      </Typography>
                      <Typography variant='h6' >การรั่วไหลของข้อมูลอาจเกิดขึ้นได้จากหลายแหล่ง เช่น</Typography>
                      <List>
                        <ListItem><Typography>1. การตั้งค่าไม่ปลอดภัย: ระบบอาจตั้งค่าให้ข้อมูลบางประเภทเข้าถึงได้ง่ายเกินไป เช่น การเปิดเผยข้อความแสดงข้อผิดพลาดที่มีข้อมูลสำคัญ หรือการตั้งค่าเซิร์ฟเวอร์ให้เปิดเผยข้อมูลส่วนบุคคล</Typography></ListItem>
                        <ListItem><Typography>2. การจัดการสิทธิ์ไม่ถูกต้อง: หากระบบไม่ได้ตรวจสอบสิทธิ์ของผู้ใช้ได้อย่างถูกต้อง ข้อมูลที่ควรจะถูกจำกัดการเข้าถึง อาจถูกเปิดเผยให้ผู้ที่ไม่มีสิทธิ์ได้เห็น</Typography></ListItem>
                        <ListItem><Typography>3. การส่งข้อมูลแบบไม่ปลอดภัย: ข้อมูลอาจถูกส่งผ่านช่องทางที่ไม่ปลอดภัย เช่น การส่งข้อมูลผ่าน HTTP แทนที่จะเป็น HTTPS ซึ่งทำให้ข้อมูลอาจถูกดักจับได้ง่าย</Typography></ListItem>
                        <ListItem><Typography>4. ช่องโหว่ในซอฟต์แวร์: บางครั้งช่องโหว่ในซอฟต์แวร์ที่ใช้งานอาจทำให้ผู้โจมตีสามารถดึงข้อมูลที่ไม่ควรได้รับออกมาได้ เช่น การใช้การโจมตีแบบ SQL Injection เพื่อดึงข้อมูลจากฐานข้อมูล</Typography></ListItem>
                      </List>
                      <Typography my={5}>ผลกระทบจากการรั่วไหลของข้อมูลสามารถเป็นอันตรายได้มากมาย อาจนำไปสู่การสูญเสียความเชื่อมั่นจากลูกค้า หรือเสียชื่อเสียงขององค์กร และในบางกรณีอาจส่งผลให้เกิดการละเมิดกฎหมายหรือข้อบังคับเกี่ยวกับการปกป้องข้อมูลส่วนบุคคล เช่น GDPR หรือ PDPA</Typography>


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
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>1. การซ่อนข้อมูลที่ไม่จำเป็นจากข้อความแสดงข้อผิดพลาด (Error Messages)</Typography>
                          ปัญหา: การแสดงข้อความแสดงข้อผิดพลาดที่มีข้อมูลที่ไม่จำเป็น เช่น รายละเอียดของฐานข้อมูล หรือข้อมูลเกี่ยวกับเซิร์ฟเวอร์ อาจทำให้ผู้โจมตีรู้จักระบบได้มากขึ้นและทำให้เกิดการโจมตีที่มีประสิทธิภาพ<br></br><br></br>
                          วิธีแก้ไข: ปิดการแสดงข้อความแสดงข้อผิดพลาดที่มีข้อมูลสำคัญในกรณีที่เกิดข้อผิดพลาด และให้แสดงข้อความที่เข้าใจง่ายและไม่เปิดเผยข้อมูลระบบ

                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet1}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. ในโค้ดนี้ เมื่อเกิดข้อผิดพลาด จะมีการแสดงข้อความทั่วไปที่ผู้ใช้สามารถเข้าใจได้ง่าย แต่ไม่มีข้อมูลสำคัญที่อาจเปิดเผยข้อมูลของฐานข้อมูลหรือโค้ดที่ใช้</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. ข้อความแสดงข้อผิดพลาดจะไม่แสดงข้อมูลที่อาจช่วยให้ผู้โจมตีสามารถใช้ประโยชน์จากช่องโหว่ได้</Typography>
                          </ListItem>
                        </List>
                      </Box>


                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>2. การเข้ารหัสข้อมูลทั้งที่เก็บและส่งผ่าน (Encryption)</Typography>
                          ปัญหา: ข้อมูลที่ถูกส่งไปในรูปแบบที่ไม่ได้รับการเข้ารหัส (เช่น HTTP แทน HTTPS) อาจทำให้ข้อมูลถูกดักจับระหว่างการส่งและถูกนำไปใช้ในทางที่ไม่เหมาะสม<br></br><br></br>
                          วิธีแก้ไข: ใช้การเข้ารหัสทั้งข้อมูลที่เก็บในฐานข้อมูลและข้อมูลที่ส่งผ่านเครือข่าย (ใช้ HTTPS) เพื่อป้องกันไม่ให้ข้อมูลถูกดักจับและเปิดเผย
                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet2}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. crypto.randomBytes(16).toString('hex'): ใช้เพื่อสร้าง salt ซึ่งเป็นค่าที่ใช้ในการเพิ่มความปลอดภัยให้กับการแฮชรหัสผ่าน</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512'): ใช้เพื่อทำการแฮชรหัสผ่านโดยใช้การเข้ารหัสแบบ PBKDF2 (Password-Based Key Derivation Function 2) เพื่อสร้างรหัสผ่านที่เข้ารหัสแล้ว โดยใช้ salt ที่สร้างขึ้นและกำหนดจำนวนรอบ (1000) เพื่อเพิ่มความปลอดภัย</Typography>
                          </ListItem>
                        </List>
                      </Box>

                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>3. การจำกัดการเข้าถึงข้อมูลตามสิทธิ์ (Access Control)</Typography>
                          ปัญหา: การเปิดเผยข้อมูลที่ไม่จำเป็นแก่ผู้ใช้ที่ไม่มีสิทธิ์เข้าถึงข้อมูลนั้น เช่น ข้อมูลส่วนตัวของผู้ใช้อื่นๆ หรือข้อมูลที่เกี่ยวกับระบบ อาจทำให้ข้อมูลรั่วไหลได้<br></br><br></br>
                          วิธีแก้ไข: ตรวจสอบและจำกัดสิทธิ์การเข้าถึงข้อมูลที่มีความละเอียดอ่อน โดยใช้การตรวจสอบสิทธิ์ที่เข้มงวด (Role-based Access Control, RBAC)
                        </Typography>

                        <CodeWindow
                          codeSnippets={codeSnippet3}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. checkAccess(userRole, resource): ฟังก์ชันนี้ใช้ตรวจสอบว่าผู้ใช้มีสิทธิ์เข้าถึงข้อมูลที่ร้องขอหรือไม่ โดยอิงจาก role (เช่น admin หรือ user) และ resource ที่ต้องการเข้าถึง</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. accessControl: เป็นอ็อบเจ็กต์ที่กำหนดข้อมูลว่าแต่ละบทบาท (role) สามารถเข้าถึงข้อมูลไหนได้บ้าง</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>3. หากผู้ใช้มีสิทธิ์เข้าถึงข้อมูลที่ร้องขอ ฟังก์ชันจะอนุญาตการเข้าถึง ถ้าไม่ ฟังก์ชันจะปฏิเสธการเข้าถึง</Typography>
                          </ListItem>
                        </List>
                      </Box>
                      <Box>
                        <Typography variant='h5'>สรุป</Typography>
                        <Typography>การแก้ปัญหาช่องโหว่ Information Leakage จำเป็นต้องใช้หลายวิธีในการป้องกันข้อมูลที่สำคัญจากการถูกเปิดเผยโดยไม่ตั้งใจ</Typography>
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
