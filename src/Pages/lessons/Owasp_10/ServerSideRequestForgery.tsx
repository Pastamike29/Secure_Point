import { Box, Container, List, ListItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Navbar from '../../../Components/Navbar'
import FitImage from '../../../Components/FitImage'
import CodeWindow from '../../../Components/Code/CodeWindow'
import { getServerSideRequestForgeryCodeSnippets } from '../../../Components/Code/Owasp10_Code/ServerSideSourceCode'

export default function ServerSideRequestForgery() {


  const codeSnippet1 = getServerSideRequestForgeryCodeSnippets('Lesson1');
  const codeSnippet2 = getServerSideRequestForgeryCodeSnippets('Lesson2');
  const codeSnippet3 = getServerSideRequestForgeryCodeSnippets('Lesson3');
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
                    <Typography variant='h4'> Server Side Request Forgery </Typography>
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

                      <FitImage src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F19(SSRF).png?alt=media&token=494c3c37-2c98-4937-b31e-74cca0569303' />

                      <Typography sx={{
                        pt: 3,
                        pb: 6,
                      }}><b>Server Side Request Forgery (SSRF)</b> เป็นการโจมตีที่เกิดขึ้นเมื่อผู้โจมตีสามารถส่งคำขอ HTTP ไปยังเซิร์ฟเวอร์ที่เป็นเป้าหมายผ่านแอปพลิเคชันอื่นที่อยู่ในระบบเดียวกัน ซึ่งช่วยให้ผู้โจมตีเข้าถึงทรัพยากรภายในระบบหรือเครือข่ายที่เซิร์ฟเวอร์นั้นสามารถเข้าถึงได้ ตัวอย่างเช่น ฐานข้อมูลภายใน ระบบไฟล์ของเซิร์ฟเวอร์ หรือบริการที่มีการควบคุมสิทธิ์จากภายนอกที่อาจเปิดเผยข้อมูลสำคัญ

                      </Typography>
                      <Typography variant='h6' >ลักษณะการโจมตีแบบ SSRF</Typography>
                      <List>
                        <ListItem><Typography>1. ค้นหาช่องโหว่การส่งคำขอ HTTP: ผู้โจมตีต้องหาฟังก์ชันหรือ API ที่อนุญาตให้ส่งคำขอไปยัง URL ใดๆ ได้ เช่น ฟีเจอร์การดึงข้อมูลจากภายนอก (fetch URL), การส่งไฟล์, หรือการแสดงข้อมูลที่อยู่ใน URL ที่ระบุ</Typography></ListItem>
                        <ListItem><Typography>2. สร้างคำขอที่ปรับแต่งให้เฉพาะเจาะจง: ผู้โจมตีจะกำหนด URL ภายในที่แอปพลิเคชันมีสิทธิ์เข้าถึง เช่น http://localhost:8080/admin หรือ http://169.254.169.254/latest/meta-data/ (AWS Metadata API) เพื่อลอบดึงข้อมูลสำคัญ</Typography></ListItem>
                        <ListItem><Typography>3. ส่งคำขอและรับข้อมูลตอบกลับ: เมื่อคำขอถูกส่ง เซิร์ฟเวอร์จะดำเนินการส่งคำขอไปยัง URL ที่กำหนดให้ตามสิทธิ์ของเซิร์ฟเวอร์นั้นๆ และส่งผลลัพธ์กลับมายังผู้โจมตี</Typography></ListItem>
                        <ListItem><Typography>4. อ่านข้อมูลสำคัญจากผลลัพธ์: ผู้โจมตีสามารถนำข้อมูลที่ได้มาใช้ในการเจาะระบบเพิ่มเติม เช่น ข้อมูลรับรองการเข้าถึง (Credentials) หรือใช้เพื่อขยายการเข้าถึงทรัพยากรอื่นๆ ภายในระบบ</Typography></ListItem>
                      </List>
                      <Typography variant='h6' my={3}>ตัวอย่างการโจมตีแบบ SSRF</Typography>
                      <List>
                        <Typography>ตัวอย่างหนึ่งที่เคยเกิดขึ้นคือการใช้ AWS Metadata API โดยผู้โจมตีสามารถส่งคำขอ HTTP ไปที่ http://169.254.169.254/latest/meta-data/iam/security-credentials/ ผ่านช่องโหว่ SSRF ในแอปพลิเคชันที่รันอยู่บน AWS EC2 ทำให้ดึงข้อมูลรับรอง (Credentials) ของ IAM Role ที่ใช้ในการเข้าถึงทรัพยากรอื่นๆ บน AWS ได้ ซึ่งข้อมูลนี้อาจมีการเข้าถึงทรัพยากรสำคัญของบริษัทหรือเซิร์ฟเวอร์อื่นๆ ใน AWS</Typography>
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
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>1. การใช้ Allowlist หรือ Whitelist เพื่อตรวจสอบ URL</Typography>
                          Allowlist จะช่วยให้เซิร์ฟเวอร์ยอมรับคำขอไปยัง URL ที่กำหนดเท่านั้น โดยกำหนดโดเมนหรือ IP ที่ปลอดภัยที่สามารถเรียกใช้ได้เท่านั้น หาก URL ไม่อยู่ใน Allowlist ให้ปฏิเสธคำขอทันที
                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet1}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. เรากำหนด allowedDomains ซึ่งเป็นรายชื่อของโดเมนที่ได้รับอนุญาต</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. ฟังก์ชัน fetchData จะตรวจสอบว่า URL ที่ถูกส่งเข้ามานั้นเริ่มต้นด้วยโดเมนที่อยู่ใน Allowlist หรือไม่</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>3. หาก URL ไม่ตรงกับโดเมนใน Allowlist จะโยน Error เพื่อปฏิเสธคำขอ แต่หากตรวจสอบผ่าน จะใช้ axios.get เพื่อส่งคำขอไปยัง URL ที่กำหนด</Typography>
                          </ListItem>
                        </List>
                      </Box>


                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>2. ตรวจสอบและกรอง Input URL</Typography>
                          การตรวจสอบและกรอง Input URL จะช่วยป้องกันการใช้ URL ที่ไม่ปลอดภัย เช่น IP ภายใน (Internal IP) หรือลูปแบ็ค (localhost) ที่อาจเปิดเผยข้อมูลสำคัญของเซิร์ฟเวอร์ได้ สามารถใช้ regex เพื่อตรวจสอบรูปแบบของ URL ได้                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet2}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. ฟังก์ชัน isValidUrl จะตรวจสอบว่า URL นั้นเป็นไปตามรูปแบบที่กำหนดโดย regex หรือไม่ (ในที่นี้คือเฉพาะ URL ที่อยู่ใน example.com และ api.example.com เท่านั้น)</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. ฟังก์ชัน fetchData จะเรียก isValidUrl เพื่อตรวจสอบว่ามี URL ที่ถูกต้องหรือไม่ หาก URL ไม่ถูกต้องจะโยน Error แต่หากผ่าน จะส่งคำขอไปยัง URL ดังกล่าว</Typography>
                          </ListItem>
                        </List>
                      </Box>

                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>3. การใช้ Network Firewall และ Outbound Filtering</Typography>
                          การกรองการส่งคำขอออกจากเซิร์ฟเวอร์ (Outbound Filtering) ช่วยป้องกัน SSRF โดยกำหนดให้สามารถส่งคำขอ HTTP ออกไปยัง URL ที่ได้รับอนุญาตเท่านั้น หรือใช้ไฟร์วอลล์ในระดับระบบเครือข่ายเพื่อบล็อก IP ที่ไม่ปลอดภัย เช่น ไอพีในเครือข่ายภายใน (Internal Network) การทำเช่นนี้มักจะเป็นการกำหนดค่าในไฟล์คอนฟิกของเซิร์ฟเวอร์หรือ Firewall ไม่ได้มีในโค้ด JavaScript โดยตรง แต่หากต้องการตัวอย่างโค้ดเพื่อกรอง IP หรือ Internal IP ก็สามารถทำได้ดังนี้                        </Typography>

                        <CodeWindow
                          codeSnippets={codeSnippet3}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. ฟังก์ชัน isInternalIp จะตรวจสอบว่า IP นั้นเป็น internal IP หรือไม่โดยใช้การเช็ค IP แบบพื้นฐาน</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. ฟังก์ชัน fetchData จะใช้ net.lookup เพื่อแปลง hostname ของ URL ให้เป็น IP address จากนั้นจะตรวจสอบ IP นั้น หากเป็น internal IP จะโยน Error ทันที</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>3. หาก IP เป็น public IP จะอนุญาตให้ส่งคำขอด้วย axios.get</Typography>
                          </ListItem>
                        </List>
                      </Box>
                      <Box>
                        <Typography variant='h5' my={2}>สรุป</Typography>
                        <Typography>การโจมตีแบบ Server-Side Request Forgery (SSRF) เป็นรูปแบบการโจมตีที่ผู้ไม่ประสงค์ดี (attacker) สามารถใช้เพื่อหลอกให้เซิร์ฟเวอร์เป้าหมายทำการร้องขอ (request) ไปยังปลายทางที่ไม่ได้รับอนุญาตหรือตั้งใจ ทั้งนี้ผู้โจมตีสามารถใช้ช่องโหว่นี้เพื่อเข้าถึงทรัพยากรภายในที่อยู่หลังไฟร์วอลล์หรือระบบป้องกันอื่นๆ ที่ปกติแล้วไม่สามารถเข้าถึงได้จากภายนอก</Typography>
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
