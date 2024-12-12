import { Box, Container, List, ListItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Navbar from '../../../Components/Navbar'
import FitImage from '../../../Components/FitImage'
import CodeWindow from '../../../Components/Code/CodeWindow'
import { getLaxSecuritySettingCodeSnippets } from '../../../Components/Code/Owasp5_Code/LaxSecuritySourceCode'

export default function LaxSecuritySetting() {


  const codeSnippet1 = getLaxSecuritySettingCodeSnippets('Lesson1');
  const codeSnippet2 = getLaxSecuritySettingCodeSnippets('Lesson2');
  const codeSnippet3 = getLaxSecuritySettingCodeSnippets('Lesson3');
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
                    <Typography variant='h4'> Lax Security Settings </Typography>
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

                      <FitImage src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F10(LaxSecureSetting).png?alt=media&token=9af1fe65-efc7-4ad0-8105-ef705d605b04' />

                      <Typography sx={{
                        pt: 3,
                        pb: 6,
                      }}><b>Lax Security Settings</b> หมายถึง การตั้งค่าความปลอดภัยที่ผ่อนปรนหรือไม่เข้มงวดมากนักในการปกป้องระบบหรือแอปพลิเคชันจากการโจมตีหรือการเข้าถึงที่ไม่เหมาะสม โดยทั่วไปแล้ว LaxSecuritySetting มักจะใช้เพื่อความสะดวกในการใช้งานหรือเพื่อให้ระบบทำงานได้อย่างรวดเร็วและมีประสิทธิภาพในบางสถานการณ์ แต่อาจจะทำให้ระบบมีช่องโหว่ด้านความปลอดภัยที่สามารถถูกโจมตีได้

                      </Typography>
                      <Typography variant='h6' >Lax Security Settings สามารถเกิดได้หลายสาเหตุ เช่น</Typography>
                      <List>
                        <ListItem>
                          <Typography>1. การกำหนดนโยบายคุกกี้ (Cookie Policy)
                            <ListItem>การตั้งค่าคุกกี้ให้สามารถใช้งานได้แม้ในกรณีที่มีการแชร์ข้อมูลข้ามโดเมนหรือบางกรณีที่ไม่จำเป็นต้องใช้ Secure หรือ HttpOnly flags</ListItem>
                            <ListItem>ซึ่งอาจทำให้การโจมตีเช่น Cross-Site Scripting (XSS) หรือ Cross-Site Request Forgery (CSRF) สามารถเกิดขึ้นได้ง่ายขึ้น</ListItem>
                          </Typography>
                        </ListItem>

                        <ListItem>
                          <Typography>2. การตั้งค่าระดับการเข้ารหัส (Encryption Level)
                            <ListItem>การใช้การเข้ารหัสที่ต่ำหรือไม่มีการเข้ารหัสข้อมูลบางประเภท เช่น ข้อมูลการเข้าใช้งานหรือข้อมูลที่สำคัญ</ListItem>
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <Typography>3. การตรวจสอบการเข้าสู่ระบบ (Login Attempts)
                            <ListItem>ไม่จำกัดจำนวนการพยายามเข้าสู่ระบบ (Brute Force Attack) หรือไม่ใช้การตรวจสอบสองชั้น (Two-Factor Authentication) ซึ่งทำให้แฮกเกอร์สามารถพยายามเดารหัสผ่านได้หลายครั้งจนกว่าจะสำเร็จ</ListItem>
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <Typography>4. การอนุญาตการเข้าถึงแบบกว้างเกินไป (Permissions)
                            <ListItem>การให้สิทธิ์การเข้าถึงข้อมูลหรือฟังก์ชันที่ไม่จำเป็นแก่ผู้ใช้ เช่น ให้ผู้ใช้ทุกคนสามารถดูข้อมูลที่ละเอียดอ่อนได้โดยไม่จำกัดการเข้าถึง</ListItem>
                          </Typography>
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
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>1. ใช้การตั้งค่าคุกกี้ที่ปลอดภัย (Secure, HttpOnly, SameSite)</Typography>
                          การตั้งค่าคุกกี้ที่มีคุณสมบัติ Secure, HttpOnly, และ SameSite จะช่วยป้องกันการโจมตีต่างๆ เช่น Cross-Site Scripting (XSS) และ Cross-Site Request Forgery (CSRF) โดยการตั้งค่าคุกกี้ให้สามารถใช้งานได้เฉพาะใน HTTPS การตั้งค่าคุกกี้ไม่ให้เข้าถึงจาก JavaScript และการจำกัดการส่งคุกกี้ในแต่ละเว็บไซต์

                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet1}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. Secure: ทำให้คุกกี้ถูกส่งผ่านทาง HTTPS เท่านั้น ป้องกันการโจมตีจากการขโมยข้อมูลผ่าน HTTP ที่ไม่มีการเข้ารหัส</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. HttpOnly: ทำให้คุกกี้ไม่สามารถเข้าถึงได้จาก JavaScript ซึ่งจะช่วยป้องกันการโจมตีเช่น Cross-Site Scripting (XSS) ที่แฮกเกอร์อาจใช้ในการขโมยคุกกี้จากผู้ใช้</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>3. SameSite=Strict: จำกัดการส่งคุกกี้ไปกับการร้องขอจากโดเมนอื่น เพื่อป้องกัน Cross-Site Request Forgery (CSRF) โดยการส่งคุกกี้เฉพาะเมื่อการร้องขอนั้นมาจากโดเมนเดียวกัน</Typography>
                          </ListItem>
                        </List>
                      </Box>


                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>2. ใช้การเข้ารหัสข้อมูลที่สำคัญ (Encryption)</Typography>
                          การเข้ารหัสข้อมูลที่สำคัญ เช่น รหัสผ่าน หรือข้อมูลส่วนตัวของผู้ใช้ ทำให้แม้แฮกเกอร์จะสามารถเข้าถึงฐานข้อมูลได้ ก็ไม่สามารถใช้งานข้อมูลที่เข้ารหัสนั้นได้
                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet2}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. CryptoJS.AES.encrypt(): ใช้การเข้ารหัสแบบ AES (Advanced Encryption Standard) โดยใช้ secret_key ซึ่งจะต้องเก็บไว้เป็นความลับ</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. การเข้ารหัสนี้จะช่วยป้องกันไม่ให้รหัสผ่านที่เก็บในฐานข้อมูลสามารถถูกเข้าถึงได้ในรูปแบบที่เป็นข้อความธรรมดา (Plain Text)</Typography>
                          </ListItem>
                  
                        </List>
                      </Box>

                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>3. ใช้การตรวจสอบหลายขั้นตอน (Multi-Factor Authentication - MFA)</Typography>
                          การใช้ Multi-Factor Authentication (MFA) จะช่วยเพิ่มความปลอดภัยให้กับบัญชีผู้ใช้ โดยการให้ผู้ใช้ยืนยันตัวตนด้วยหลายขั้นตอน เช่น การใช้รหัสผ่านและรหัสที่ส่งมาทาง SMS หรือแอปพลิเคชันสำหรับการยืนยันตัวตน                        </Typography>

                        <CodeWindow
                          codeSnippets={codeSnippet3}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. fetch('/api/request-otp'): ส่งข้อมูลไปยังเซิร์ฟเวอร์เพื่อขอรหัส OTP สำหรับการยืนยันตัวตน</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. prompt("กรุณากรอกรหัส OTP..."): ร้องขอให้ผู้ใช้กรอกรหัส OTP ที่ส่งไปยังโทรศัพท์ของเขา</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>3. fetch('/api/verify-otp'): ส่งรหัส OTP ที่ผู้ใช้กรอกไปตรวจสอบกับเซิร์ฟเวอร์ว่าถูกต้องหรือไม่</Typography>
                          </ListItem>
                        </List>
                      </Box>
                      <Box>
                        <Typography variant='h5'>สรุป</Typography>
                        <Typography>LaxSecuritySetting คือการตั้งค่าความปลอดภัยที่ยืดหยุ่นหรือผ่อนปรนเกินไป ซึ่งอาจทำให้การใช้งานสะดวกแต่ก็เพิ่มความเสี่ยงให้กับระบบ หากต้องการป้องกันการโจมตีที่รุนแรง ควรตั้งค่าความปลอดภัยที่เหมาะสมและเข้มงวดมากขึ้น</Typography>
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
