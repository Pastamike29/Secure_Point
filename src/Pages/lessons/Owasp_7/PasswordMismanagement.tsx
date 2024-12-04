import { Box, Container, List, ListItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Navbar from '../../../Components/Navbar'
import FitImage from '../../../Components/FitImage'
import CodeWindow from '../../../Components/Code/CodeWindow'
import { getPasswordMismanagementCodeSnippets } from '../../../Components/Code/Owasp7_Code/PasswordSourceCode'

export default function PasswordMismanagement() {


  const codeSnippet1 = getPasswordMismanagementCodeSnippets('Lesson1');
  const codeSnippet2 = getPasswordMismanagementCodeSnippets('Lesson2');
 
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
                    <Typography variant='h4'> Password Mismanagement </Typography>
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

                      <FitImage src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F11(ToxicDepen).png?alt=media&token=56fc37a3-49af-4d8c-b2b3-541cb7dd67a8' />

                      <Typography sx={{
                        pt: 3,
                        pb: 6,
                      }}><b>Password Mismanagement หรือ การจัดการรหัสผ่านที่ไม่เหมาะสม</b> คือการจัดการและรักษารหัสผ่านในลักษณะที่เสี่ยงต่อการถูกโจมตี หรือไม่ปฏิบัติตามมาตรฐานความปลอดภัยที่เหมาะสม ซึ่งทำให้ข้อมูลส่วนตัวและระบบที่เราควบคุมอาจตกอยู่ในอันตรายจากผู้ไม่หวังดี นี่คือคำอธิบายของการจัดการรหัสผ่านที่ไม่ดีในหลายๆ ด้าน

                      </Typography>
                      <Typography variant='h6' >การออกแบบที่ไม่ปลอดภัยสามารถเกิดขึ้นได้จากหลายสาเหตุ เช่น</Typography>
                      <List>
                        <ListItem>
                          <Typography><b>1. การใช้รหัสผ่านที่อ่อนแอ (Weak Passwords)</b><br></br>
                            การตั้งรหัสผ่านที่ง่ายเกินไป เช่น ใช้คำที่เดาง่ายอย่าง "123456" หรือ "password" หรือแม้แต่ข้อมูลที่เกี่ยวข้องกับตัวเอง เช่น วันเกิด หรือชื่อสัตว์เลี้ยง ซึ่งการตั้งรหัสผ่านแบบนี้ทำให้ผู้โจมตีสามารถเดาได้ง่ายและเข้าถึงข้อมูลของเราได้เร็ว
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <Typography>2. การใช้รหัสผ่านเดียวสำหรับหลายบัญชี (Reusing Passwords)<br></br>
                            หลายคนมักใช้รหัสผ่านเดียวกันกับหลายบริการ เช่น ใช้รหัสเดียวกันสำหรับอีเมล, โซเชียลมีเดีย, หรือบริการธนาคารออนไลน์ การใช้รหัสเดียวกันในหลายบริการทำให้ถ้าใครสามารถแฮ็กบัญชีหนึ่งได้ ก็อาจทำให้สามารถเข้าถึงข้อมูลสำคัญในที่อื่นได้เช่นกัน
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <Typography>3.  การไม่เปลี่ยนรหัสผ่านเป็นระยะ (Not Changing Password Regularly)<br></br>
                            การไม่เปลี่ยนรหัสผ่านเป็นประจำหรือไม่อัปเดตรหัสผ่านเมื่อมีเหตุการณ์ที่น่าสงสัย อาจทำให้บัญชีของเราตกอยู่ในความเสี่ยงได้ เมื่อผู้ไม่หวังดีสามารถจับรหัสผ่านได้จากการโจมตีแบบอื่น (เช่น Phishing หรือ Data Breach)
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <Typography>4. การจัดเก็บรหัสผ่านในที่ไม่ปลอดภัย (Storing Passwords Insecurely)<br></br>
                            บางคนอาจเก็บรหัสผ่านในรูปแบบที่ไม่ปลอดภัย เช่น บันทึกในไฟล์ข้อความธรรมดาหรือจดในกระดาษ หากรหัสผ่านถูกขโมยหรือหลุดออกมา จะทำให้ข้อมูลของผู้ใช้ตกอยู่ในความเสี่ยงอย่างมาก
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <Typography>5. การไม่ใช้การยืนยันตัวตนแบบสองขั้นตอน (Not Using Two-Factor Authentication - 2FA)<br></br>
                            การไม่เปิดใช้งานการยืนยันตัวตนแบบสองขั้นตอน (2FA) ทำให้บัญชีของเรามีความเสี่ยงสูงขึ้น แม้ว่าผู้โจมตีจะสามารถขโมยรหัสผ่านของเราได้ หากไม่มี 2FA ก็ยังสามารถเข้าถึงบัญชีของเราได้ง่ายๆ
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
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>1. การใช้รหัสผ่านที่แข็งแรง (Strong Passwords)</Typography>
                          การใช้รหัสผ่านที่มีความยากในการเดาหรือคาดเดา คือการตั้งรหัสผ่านที่ประกอบด้วยตัวอักษรตัวใหญ่ ตัวเล็ก ตัวเลข และอักขระพิเศษที่ยาวพอสมควร (แนะนำให้มีความยาวมากกว่า 12 ตัวอักษร)
                        </Typography>
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>2. การใช้การยืนยันตัวตนแบบสองขั้นตอน (Two-Factor Authentication - 2FA)</Typography>
                          การใช้ 2FA เป็นการเพิ่มชั้นความปลอดภัยอีกหนึ่งชั้น แม้ว่าผู้โจมตีจะสามารถขโมยรหัสผ่านได้ก็ยังไม่สามารถเข้าใช้งานบัญชีได้ เนื่องจากต้องมีรหัส OTP หรือการยืนยันจากอุปกรณ์อีกชิ้นหนึ่ง
                        </Typography>

                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>3. การแฮชรหัสผ่าน (Password Hashing)</Typography>
                          การไม่เก็บรหัสผ่านในรูปแบบข้อความที่สามารถอ่านได้ แต่ควรแฮชรหัสผ่าน (โดยใช้เทคนิคที่ไม่สามารถย้อนกลับได้) ก่อนที่จะเก็บลงในฐานข้อมูล เพื่อให้แม้แต่ผู้ดูแลระบบก็ไม่สามารถเห็นรหัสผ่านจริงของผู้ใช้ได้
                        </Typography>
                        <Typography sx={{
                          mb: 7
                        }}>
                          ในตัวอย่างนี้จะใช้ bcrypt.js ซึ่งเป็นหนึ่งในไลบรารียอดนิยมในการแฮชรหัสผ่าน และใช้ JWT (JSON Web Tokens) สำหรับการสร้าง Token สำหรับการยืนยันตัวตน (ซึ่งสามารถใช้งาน 2FA หรือยืนยันตัวตนผ่านแอปฯ ได้)
                        </Typography>
                        <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>ขั้นตอนที่ 1: การติดตั้ง bcryptjs และ jsonwebtoken (สำหรับ JWT)</Typography>

                        <CodeWindow
                          codeSnippets={codeSnippet1}
                        />
                        <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>ขั้นตอนที่ 2: ตัวอย่างโค้ดสำหรับการแฮชรหัสผ่าน, การตรวจสอบรหัสผ่าน, และการใช้ JWT</Typography>

                        <CodeWindow
                          codeSnippets={codeSnippet2}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>
                              1. การแฮชรหัสผ่าน (Password Hashing)
                              <ListItem>
                                <Typography>bcrypt.genSalt(10): ใช้เพื่อสร้าง salt ที่จะถูกใช้ในการแฮชรหัสผ่าน โดยการใช้ Salt ทำให้การแฮชรหัสผ่านปลอดภัยมากขึ้น และยากต่อการโจมตีแบบ rainbow table หรือ brute force attack</Typography>
                              </ListItem>
                              <ListItem>
                                <Typography>bcrypt.hash(password, salt): ทำการแฮชรหัสผ่านโดยใช้ Salt ที่สร้างขึ้น ซึ่งจะส่งผลให้รหัสผ่านเก็บในรูปแบบที่ไม่สามารถอ่านได้ และป้องกันการนำรหัสผ่านไปใช้งานได้ง่ายๆ</Typography>
                              </ListItem>
                            </Typography>

                          </ListItem>
                          <ListItem>
                            <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>
                              2. การตรวจสอบรหัสผ่าน (Password Verification)
                              <ListItem>
                                <Typography>bcrypt.compare(inputPassword, storedHashedPassword): ใช้เพื่อตรวจสอบว่ารหัสผ่านที่ผู้ใช้กรอกตรงกับรหัสผ่านที่ถูกแฮชและเก็บไว้ในฐานข้อมูลหรือไม่ การเปรียบเทียบจะเกิดขึ้นระหว่างรหัสผ่านที่กรอกกับค่าที่แฮชไว้ในฐานข้อมูล</Typography>
                              </ListItem>
                            </Typography>
                          </ListItem>
                          <ListItem>
                            <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>
                              3. การสร้าง JWT Token (JSON Web Token)
                              <ListItem>
                                <Typography>jwt.sign(payload, secretKey,  [expiresIn: '1h'] ): สร้าง Token ที่ประกอบด้วยข้อมูลบางประการ เช่น ชื่อผู้ใช้และบทบาทผู้ใช้ พร้อมกับระยะเวลาในการหมดอายุ (ในตัวอย่างนี้คือ 1 ชั่วโมง)</Typography>
                              </ListItem>
                              <ListItem>
                                <Typography>secretKey: ใช้เพื่อเข้ารหัสและตรวจสอบความถูกต้องของ JWT ซึ่งในที่นี้ควรเป็นความลับที่ปลอดภัย</Typography>
                              </ListItem>
                            </Typography>
                          </ListItem>
                        </List>
                      </Box>


                      <Box>
                        <Typography variant='h5'>สรุป</Typography>
                        <Typography>การจัดการรหัสผ่านที่ปลอดภัยประกอบไปด้วยหลายๆ แนวทางเช่น การใช้รหัสผ่านที่แข็งแรง, การแฮชรหัสผ่าน, และการใช้การยืนยันตัวตนแบบสองขั้นตอน (2FA). โค้ดตัวอย่างนี้ช่วยให้คุณสามารถแฮชรหัสผ่านได้อย่างปลอดภัย พร้อมทั้งสร้างระบบการยืนยันตัวตนที่ปลอดภัยโดยใช้ JWT เพื่อใช้ในการสร้างระบบการยืนยันตัวตน (Authentication) และการยืนยันสิทธิ์การเข้าถึง (Authorization)</Typography>
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
