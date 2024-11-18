import { Box, Container, List, ListItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Navbar from '../../../Components/Navbar'
import FitImage from '../../../Components/FitImage'
import CodeWindow from '../../../Components/Code/CodeWindow'
import { getLoggingAndMonitoringFailuresCodeSnippets } from '../../../Components/Code/Owasp9_Code/LoggingSourceCode'

export default function LoggingAndMonitoringFailures() {


  const codeSnippet1 = getLoggingAndMonitoringFailuresCodeSnippets('Lesson1');
  const codeSnippet2 = getLoggingAndMonitoringFailuresCodeSnippets('Lesson2');
  const codeSnippet3 = getLoggingAndMonitoringFailuresCodeSnippets('Lesson3');
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
                    <Typography variant='h4'> Logging And Monitoring Failures </Typography>
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
                      }}><b>Logging and Monitoring Failures</b> หมายถึงความล้มเหลวในระบบการบันทึกและตรวจสอบข้อมูล ซึ่งมักเกิดจากระบบที่ไม่สามารถติดตามหรือบันทึกกิจกรรมต่าง ๆ ได้อย่างถูกต้องในแอปพลิเคชันหรือโครงสร้างพื้นฐาน เช่น เมื่อมีการเข้าสู่ระบบ การทำธุรกรรม หรือการเข้าถึงข้อมูล

                      </Typography>
                      <Typography variant='h6' >สาเหตุหลักของ Logging and Monitoring Failures</Typography>
                      <List>
                        <ListItem><Typography>1. ขาดการบันทึกที่ครอบคลุม: ระบบบางระบบอาจไม่ได้บันทึกข้อมูลที่สำคัญหรือไม่ได้บันทึกในจุดที่เสี่ยง เช่น การล็อกอินผิดพลาด หรือการเข้าถึงข้อมูลที่ผิดปกติ ทำให้เกิดช่องโหว่</Typography></ListItem>
                        <ListItem><Typography>2. ไม่แจ้งเตือนในเวลาที่เหมาะสม: เมื่อเกิดปัญหาหรือภัยคุกคาม ระบบอาจไม่ได้แจ้งเตือนทันที ทำให้ผู้ดูแลระบบไม่สามารถดำเนินการแก้ไขหรือป้องกันได้ทันท่วงที</Typography></ListItem>
                        <ListItem><Typography>ไม่สามารถติดตามหรือค้นหาข้อมูลย้อนหลังได้: ถ้าการบันทึกข้อมูลไม่เพียงพอ ผู้ดูแลระบบจะไม่สามารถตรวจสอบเหตุการณ์ที่เกิดขึ้นในอดีตได้ เช่น การสืบค้นหาสาเหตุที่ผู้ใช้งานถูกแฮ็ก</Typography></ListItem>
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
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>1. บันทึกข้อมูลกิจกรรมอย่างปลอดภัยและครบถ้วน (Comprehensive Logging)</Typography>
                          ควรบันทึกเหตุการณ์ที่สำคัญ เช่น การเข้าระบบ การแก้ไขข้อมูล และการเข้าถึงข้อมูลที่อ่อนไหว เพื่อให้สามารถตรวจสอบย้อนหลังได้เมื่อเกิดปัญหา นอกจากนี้ ควรเก็บข้อมูลบันทึกในที่ปลอดภัย เช่น บริการจัดเก็บ Log ภายนอก หรือฐานข้อมูลที่เข้ารหัส
                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet1}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. crypto.createCipher('aes-256-cbc', 'your-secure-key'): ใช้เข้ารหัสข้อมูล log เพื่อป้องกันการอ่านข้อมูลโดยผู้ไม่หวังดี</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. fs.appendFileSync(): บันทึกข้อมูล log ลงในไฟล์ activity.log พร้อมเข้ารหัสข้อความ
                            </Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>3. logEvent(): ฟังก์ชันนี้ใช้บันทึกเหตุการณ์ พร้อมระบุประเภทของเหตุการณ์ (เช่น LOGIN_ATTEMPT) และชื่อผู้ใช้งาน (username)</Typography>
                          </ListItem>
                        </List>
                      </Box>


                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>2. การตั้งค่าแจ้งเตือนเมื่อพบการใช้งานที่ผิดปกติ (Alerting on Anomalies)</Typography>
                          ควรกำหนดให้ระบบแจ้งเตือนเมื่อมีเหตุการณ์ที่ผิดปกติเกิดขึ้น เช่น การล็อกอินผิดพลาดหลายครั้งภายในระยะเวลาสั้น ๆ การแจ้งเตือนจะช่วยให้ผู้ดูแลสามารถตรวจสอบได้ทันที                        </Typography>
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
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>3. การ Masking ข้อมูลที่เป็นความลับ</Typography>
                          การใช้ Masking (เช่น แสดงเฉพาะบางส่วนของข้อมูล) เพื่อให้สามารถระบุตัวตนของข้อมูลได้ แต่ไม่แสดงข้อมูลทั้งหมด เช่น API key                       
                          </Typography>

                        <CodeWindow
                          codeSnippets={codeSnippet3}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. maskSensitiveInfo(): ฟังก์ชันนี้ทำหน้าที่ Mask ข้อมูล โดยแสดงเฉพาะ 4 ตัวท้ายของ API key และซ่อนรหัสผ่านทั้งหมด</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. logEvent(): ฟังก์ชันบันทึกเหตุการณ์ โดยจะใช้ข้อมูลที่ถูก Mask แล้วมาแสดง</Typography>
                          </ListItem>
                    
                        </List>
                      </Box>
                      <Box>
                        <Typography variant='h5'>สรุป</Typography>
                        <Typography>Logging and Monitoring Failures เป็นความล้มเหลวในการบันทึกและตรวจสอบข้อมูลในระบบที่อาจก่อให้เกิดช่องโหว่ทางความปลอดภัย ควรมีการจัดการที่ดีเพื่อลดความเสี่ยงและเพิ่มความปลอดภัยในระบบ</Typography>
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
