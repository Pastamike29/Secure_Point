import { Box, Container, List, ListItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Navbar from '../../../Components/Navbar'
import FitImage from '../../../Components/FitImage'
import CodeWindow from '../../../Components/Code/CodeWindow'
import { getPrivilegeEscalationCodeSnippets } from '../../../Components/Code/Owasp7_Code/PriviledgeSourceCode'

export default function PrivilegeEscalation() {


  const codeSnippet1 = getPrivilegeEscalationCodeSnippets('Lesson1');
  const codeSnippet2 = getPrivilegeEscalationCodeSnippets('Lesson2');
  const codeSnippet3 = getPrivilegeEscalationCodeSnippets('Lesson3');
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
                    <Typography variant='h4'> Privilege Escalation </Typography>
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

                      <FitImage src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F13(PrivilegeEs).png?alt=media&token=1fd7b9ee-86b3-42b0-bd07-887315efed67' />

                      <Typography sx={{
                        pt: 3,
                        pb: 6,
                      }}><b>Privilege Escalation</b> คือ กระบวนการที่ผู้โจมตีหรือผู้ใช้ที่มีสิทธิ์เข้าถึงระบบในระดับต่ำ (เช่น ผู้ใช้ทั่วไป) พยายามเพิ่มระดับสิทธิ์ของตัวเองเพื่อเข้าถึงทรัพยากรหรือทำการกระทำที่มีสิทธิ์สูงกว่า (เช่น ผู้ดูแลระบบหรือ root) บนระบบคอมพิวเตอร์หรือเครือข่าย

                      </Typography>
                      <Typography variant='h6' >ประเภทของ Privilege Escalation</Typography>
                      <List>
                        <ListItem>
                          <Typography>
                            1. Vertical Privilege Escalation (การยกระดับสิทธิ์ในแนวตั้ง)
                            <ListItem>
                              <Typography>ผู้ใช้ที่มีสิทธิ์ระดับต่ำ (เช่น ผู้ใช้ทั่วไป) พยายามยกระดับสิทธิ์ตัวเองไปยังระดับที่สูงกว่า เช่น ผู้ดูแลระบบ (administrator) หรือ root เพื่อเข้าถึงข้อมูลที่สำคัญหรือทำการกระทำที่ต้องการสิทธิ์สูง</Typography>
                            </ListItem>
                            <ListItem>
                              <Typography>ตัวอย่าง: หากมีการตั้งค่าความปลอดภัยที่ไม่รัดกุม ผู้ใช้ทั่วไปอาจสามารถใช้ช่องโหว่ของระบบเพื่อเพิ่มสิทธิ์ของตนเองเป็นผู้ดูแลระบบได้</Typography>
                            </ListItem>
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <Typography>
                            2. Horizontal Privilege Escalation (การยกระดับสิทธิ์ในแนวนอน)
                            <ListItem>
                              <Typography>ผู้ใช้พยายามเข้าถึงสิทธิ์ของผู้ใช้คนอื่นที่อยู่ในระดับเดียวกัน โดยไม่ได้มีการยกระดับสิทธิ์ขึ้นไปยังระดับสูงกว่า</Typography>
                            </ListItem>
                            <ListItem>
                              <Typography>ตัวอย่าง: ผู้ใช้ A ที่มีสิทธิ์ในการเข้าถึงบางส่วนของระบบอาจพยายามเข้าถึงข้อมูลหรือการตั้งค่าของผู้ใช้ B ที่มีสิทธิ์เท่าๆ กัน</Typography>
                            </ListItem>
                          </Typography>
                        </ListItem>
                      </List>
                      <Typography variant='h6' my={3}>สาเหตุของแอปพลิเคชันที่ถูกโจมตีจาก Privilege Escalation อาจเกิดได้หลายสาเหตุ เช่น</Typography>
                      <List>
                        <ListItem>
                          <Typography>ช่องโหว่ในซอฟต์แวร์หรือระบบปฏิบัติการ: บางครั้งระบบอาจมีช่องโหว่ที่ไม่ได้รับการแก้ไขหรืออัพเดท เช่น buffer overflow, race conditions หรือ misconfigurations ที่อนุญาตให้ผู้ใช้สามารถยกระดับสิทธิ์ได้</Typography>
                        </ListItem>
                        <ListItem>
                          <Typography>การตั้งค่าความปลอดภัยที่ไม่ถูกต้อง: หากผู้ดูแลระบบไม่ตั้งค่าระบบให้ปลอดภัย เช่น การให้สิทธิ์ที่ไม่เหมาะสมกับโปรแกรมหรือบริการบางอย่าง ก็อาจทำให้เกิดช่องทางสำหรับ Privilege Escalation</Typography>
                        </ListItem>
                        <ListItem>
                          <Typography>การใช้คำสั่งที่สามารถทำงานได้ในระดับสูง: เช่น การเข้าถึงคำสั่งที่สามารถทำงานได้ในระดับผู้ดูแลระบบผ่านช่องทางที่ถูกตั้งค่าไม่ถูกต้อง</Typography>
                        </ListItem>
                        <ListItem>
                          <Typography>การใช้ความผิดพลาดในการจัดการรหัสผ่านหรือการตรวจสอบสิทธิ์: เช่น การเก็บรหัสผ่านในที่ที่ไม่ปลอดภัยหรือการตรวจสอบสิทธิ์ที่อ่อนแอ</Typography>
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
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>
                            1. การใช้ Principle of Least Privilege (POLP)
                            <List>
                              <ListItem>
                                <Typography>แนวคิด: ผู้ใช้และแอปพลิเคชันควรได้รับสิทธิ์ขั้นต่ำสุดที่จำเป็นในการทำงาน เพื่อให้สามารถทำงานได้โดยไม่ให้มีสิทธิ์เกินความจำเป็น</Typography>
                              </ListItem>
                              <ListItem>
                                <Typography>การป้องกัน: ไม่ให้ผู้ใช้หรือแอปพลิเคชันมีสิทธิ์เกินกว่าที่จำเป็น เช่น ไม่ให้ผู้ใช้ที่มีสิทธิ์ในการดูข้อมูลสามารถเข้าไปเปลี่ยนแปลงการตั้งค่าหรือข้อมูลสำคัญ</Typography>
                              </ListItem>
                            </List>

                          </Typography>

                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet1}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. userRole: ตัวแปรที่เก็บข้อมูลเกี่ยวกับบทบาทของผู้ใช้ เช่น 'user', 'admin' เป็นต้น</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. ฟังก์ชัน accessSettings() จะตรวจสอบว่าผู้ใช้มีสิทธิ์เป็น 'admin' หรือไม่ หากไม่มีก็จะไม่อนุญาตให้เข้าถึงการตั้งค่า</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>3. วิธีนี้ช่วยให้มั่นใจว่าแต่ละผู้ใช้สามารถทำงานได้ภายในขอบเขตที่กำหนดโดยไม่สามารถเข้าถึงสิทธิ์ที่ไม่จำเป็นได้</Typography>
                          </ListItem>
                        </List>
                      </Box>


                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>
                            2. การตรวจสอบและบันทึกกิจกรรมการใช้งาน (Logging and Monitoring)</Typography>
                          <List>
                            <ListItem>
                              <Typography>
                                แนวคิด: การตรวจสอบกิจกรรมของผู้ใช้บนระบบและการบันทึกกิจกรรมที่น่าสงสัยสามารถช่วยในการตรวจจับการพยายามยกระดับสิทธิ์หรือการกระทำที่ไม่ถูกต้อง
                              </Typography>
                            </ListItem>
                            <ListItem>
                              <Typography>
                                การป้องกัน: ใช้การบันทึกกิจกรรมที่มีการเปลี่ยนแปลงสิทธิ์การเข้าถึง หรือกิจกรรมที่สำคัญบนระบบ
                              </Typography>
                            </ListItem>
                          </List>
                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet2}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. ฟังก์ชัน logActivity() ใช้บันทึกการกระทำของผู้ใช้ เช่น การพยายามเข้าถึงการตั้งค่าผู้ดูแลระบบ</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. การบันทึกกิจกรรมช่วยให้สามารถตรวจสอบภายหลังได้ว่าเหตุการณ์ใดเกิดขึ้นและสามารถติดตามได้ว่าผู้ใช้พยายามทำอะไรในระบบ</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>3. การบันทึกและตรวจสอบกิจกรรมจะช่วยในการตรวจจับการกระทำที่อาจเป็นการพยายามยกระดับสิทธิ์ได้</Typography>
                          </ListItem>
                        </List>
                      </Box>

                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>3. การใช้ Multi-Factor Authentication (MFA)</Typography>
                          <List>
                            <ListItem>
                              แนวคิด: การใช้การยืนยันตัวตนหลายขั้นตอน (MFA) ทำให้ยากขึ้นสำหรับผู้โจมตีที่จะยกระดับสิทธิ์โดยใช้วิธีการโจมตีที่ไม่ถูกต้อง
                            </ListItem>
                          </List>
                          <List>
                            <ListItem>
                              การป้องกัน: การใช้รหัสผ่านพร้อมกับการยืนยันตัวตนในลักษณะต่างๆ เช่น การใช้รหัส OTP, การยืนยันทางโทรศัพท์ หรือแอปพลิเคชันการยืนยัน                            </ListItem>
                          </List>
                        </Typography>

                        <CodeWindow
                          codeSnippets={codeSnippet3}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. generateOTP(): ฟังก์ชันนี้จะสร้าง OTP (รหัสผ่านใช้ครั้งเดียว) และแสดงผลออกมา</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. verifyOTP(): ฟังก์ชันนี้ใช้ตรวจสอบว่า OTP ที่ผู้ใช้กรอกตรงกับที่ถูกสร้างขึ้นหรือไม่</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>3. การใช้งาน OTP ในการยืนยันตัวตนจะทำให้การโจมตีด้วยการขโมยรหัสผ่านเพียงอย่างเดียวไม่เพียงพอ และจะเพิ่มความปลอดภัยให้กับระบบ</Typography>
                          </ListItem>
                        </List>
                      </Box>
                      <Box>
                        <Typography variant='h5'>สรุป</Typography>
                        <Typography>Privilege Escalation คือ การใช้ช่องโหว่ในระบบหรือการตั้งค่าผิดพลาดเพื่อยกระดับสิทธิ์การเข้าถึงจากผู้ใช้ที่มีสิทธิ์ต่ำให้กลายเป็นผู้ใช้ที่มีสิทธิ์สูงขึ้น เพื่อเข้าถึงข้อมูลหรือการควบคุมระบบที่ไม่ควรเข้าถึงได้ การป้องกัน Privilege Escalation จึงเป็นสิ่งสำคัญในการรักษาความปลอดภัยของระบบทุกประเภท</Typography>
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
