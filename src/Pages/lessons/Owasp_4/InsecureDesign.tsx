import { Box, Container, List, ListItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Navbar from '../../../Components/Navbar'
import FitImage from '../../../Components/FitImage'
import CodeWindow from '../../../Components/Code/CodeWindow'
import { getInsecureDesignCodeSnippets } from '../../../Components/Code/Owasp4_Code/InsecureSourceCode'

export default function InsecureDesign() {


  const codeSnippet1 = getInsecureDesignCodeSnippets('Lesson1');
  const codeSnippet2 = getInsecureDesignCodeSnippets('Lesson2');
  const codeSnippet3 = getInsecureDesignCodeSnippets('Lesson3');
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
                    <Typography variant='h4'> Insecure Design </Typography>
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

                      <FitImage src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F9(InsecureDesign).png?alt=media&token=842033bc-d045-4a9c-9762-708ac8645850' />

                      <Typography sx={{
                        pt: 3,
                        pb: 6,
                      }}><b>Insecure Design หรือ "การออกแบบที่ไม่ปลอดภัย"</b> คือการที่ระบบซอฟต์แวร์หรือแอปพลิเคชันไม่ได้ถูกออกแบบมาให้รับมือกับภัยคุกคามที่อาจเกิดขึ้นจากภายนอกหรือจากการใช้งานผิดวิธี ตั้งแต่การออกแบบในขั้นตอนแรก เช่น การกำหนดการทำงานของระบบหรือการวางโครงสร้างข้อมูล จนถึงการกำหนดวิธีการเข้าถึงและจัดการข้อมูลต่างๆ โดยไม่ได้คำนึงถึงมาตรการด้านความปลอดภัยที่เพียงพอ

                      </Typography>
                      <Typography variant='h6' >การออกแบบที่ไม่ปลอดภัยสามารถเกิดขึ้นได้จากหลายสาเหตุ เช่น</Typography>
                      <List>
                        <ListItem><Typography>1. การออกแบบที่ไม่ได้คำนึงถึงความปลอดภัย: หากตั้งแต่ตอนเริ่มต้นของการออกแบบระบบ หรือการพัฒนาระบบ ซอฟต์แวร์ไม่ได้ถูกคิดถึงว่าผู้ไม่หวังดีจะสามารถโจมตีหรือใช้ช่องโหว่ได้ ระบบจะมีความเสี่ยงสูงที่จะถูกแฮกหรือถูกโจมตีจากผู้ไม่ประสงค์ดีในอนาคต</Typography></ListItem>
                        <ListItem><Typography>2. การออกแบบที่ขาดการป้องกันที่เหมาะสม: เช่น การเก็บข้อมูลสำคัญ (เช่น รหัสผ่าน ข้อมูลบัตรเครดิต หรือข้อมูลส่วนตัว) โดยไม่ใช้การเข้ารหัสที่ปลอดภัย หรือการกำหนดสิทธิ์ในการเข้าถึงข้อมูลที่ไม่ถูกต้อง อาจทำให้ผู้ที่ไม่ได้รับอนุญาตสามารถเข้าถึงข้อมูลเหล่านี้ได้</Typography></ListItem>
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
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>1. การเข้ารหัสข้อมูลที่สำคัญ (Encryption of Sensitive Data)</Typography>
                          การเก็บข้อมูลที่สำคัญ เช่น รหัสผ่าน หรือข้อมูลบัตรเครดิต ควรทำการเข้ารหัสเพื่อป้องกันไม่ให้ข้อมูลเหล่านี้ถูกขโมยหรือถูกเข้าถึงได้หากฐานข้อมูลถูกโจมตี

                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet1}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. เราใช้ bcrypt.hash() เพื่อทำการเข้ารหัสรหัสผ่าน ซึ่งใช้วิธีการ bcrypt ที่ปลอดภัยในการแปลงรหัสผ่านเป็นข้อมูลที่ไม่สามารถถอดรหัสกลับได้</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. ค่า 10 เป็นจำนวนรอบในการแฮช (ค่าเพิ่มจะยิ่งทำให้การแฮชช้าลง ซึ่งยากต่อการโจมตีแบบ brute force)</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>3. โค้ดนี้ช่วยให้แม้ฐานข้อมูลจะถูกโจมตี รหัสผ่านจริงจะไม่สามารถเข้าถึงได้ เพราะมีแค่รหัสผ่านที่ถูกเข้ารหัส</Typography>
                          </ListItem>
                        </List>
                      </Box>


                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>2. การใช้การยืนยันตัวตนที่แข็งแกร่ง (Multi-factor Authentication)</Typography>
                          การใช้การยืนยันตัวตนหลายขั้นตอน (MFA) เช่น การใช้รหัส OTP (One-Time Password) หรือการยืนยันตัวตนจากแอปพลิเคชันที่ปลอดภัย (เช่น Google Authenticator) จะเพิ่มความปลอดภัยให้กับการเข้าสู่ระบบของผู้ใช้
                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet2}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. เราใช้ไลบรารี otplib เพื่อสร้างและตรวจสอบ OTP</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. otplib.authenticator.generateSecret() จะสร้าง secret key ที่ไม่ซ้ำกันสำหรับผู้ใช้</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>3. otplib.authenticator.generate(secret) จะสร้าง OTP ที่สามารถส่งให้ผู้ใช้ได้</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>4. เมื่อผู้ใช้ป้อน OTP กลับมา ระบบจะตรวจสอบด้วย otplib.authenticator.check() ว่า OTP ที่ผู้ใช้ป้อนนั้นถูกต้องหรือไม่</Typography>
                          </ListItem>
                        </List>
                      </Box>

                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>3. การป้องกันการโจมตีจากการเข้าถึงที่ไม่ได้รับอนุญาต (Access Control)</Typography>
                          การออกแบบระบบให้มีการตรวจสอบสิทธิ์ (authorization) และการตรวจสอบความถูกต้องของสิทธิ์ผู้ใช้ (role-based access control) จะช่วยป้องกันไม่ให้ผู้ใช้งานที่ไม่ได้รับอนุญาตสามารถเข้าถึงข้อมูลหรือฟังก์ชันที่ควรจะเป็นสิทธิ์ของผู้ใช้อื่น
                        </Typography>

                        <CodeWindow
                          codeSnippets={codeSnippet3}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. เราใช้ middleware authenticate เพื่อตรวจสอบว่า user มีการส่ง token ที่ถูกต้องใน headers หรือไม่</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. หากไม่พบ token หรือ token ไม่ถูกต้อง ระบบจะส่ง HTTP 403 หรือ HTTP 401 กลับไป</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>3. ถ้า token ถูกต้อง ระบบจะให้ผู้ใช้เข้าถึงข้อมูลที่ต้องการได้ เช่น ในตัวอย่างนี้คือ route /secure-data</Typography>
                          </ListItem>
                        </List>
                      </Box>
                      <Box>
                        <Typography variant='h5'>สรุป</Typography>
                        <Typography>Insecure Design คือการออกแบบระบบหรือแอปพลิเคชันที่ไม่คำนึงถึงความปลอดภัยอย่างเพียงพอ ซึ่งทำให้ระบบมีความเสี่ยงสูงที่จะถูกโจมตีจากภัยคุกคามต่าง ๆ การหลีกเลี่ยงการออกแบบที่ไม่ปลอดภัยจะต้องเริ่มตั้งแต่การออกแบบเบื้องต้น โดยการคำนึงถึงวิธีการป้องกันที่เหมาะสมและการทดสอบระบบอย่างต่อเนื่อง</Typography>
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
