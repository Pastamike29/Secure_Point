import { Box, Container, List, ListItem, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Navbar from '../../../Components/Navbar'
import FitImage from '../../../Components/FitImage'
import CodeWindow from '../../../Components/Code/CodeWindow'
import { getFileUploadVulnerabilitiesCodeSnippets } from '../../../Components/Code/Owasp4_Code/FileUploadVulSourceCode'

export default function FileUploadVulnerabilities() {


  const codeSnippet1 = getFileUploadVulnerabilitiesCodeSnippets('Lesson1');
  const codeSnippet2 = getFileUploadVulnerabilitiesCodeSnippets('Lesson2');
  const codeSnippet3 = getFileUploadVulnerabilitiesCodeSnippets('Lesson3');
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
                    <Typography variant='h4'> File Upload Vulnerabilities </Typography>
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

                      <FitImage src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F4(UnencryptCommu).png?alt=media&token=54247f20-92c3-4d94-b522-f1c17179f3f7' />

                      <Typography sx={{
                        pt: 3,
                        pb: 6,
                      }}><b>File Upload Vulnerabilities หรือ ช่องโหว่ในการอัปโหลดไฟล์</b> เป็นความเสี่ยงที่เกิดจากการที่แอปพลิเคชันเปิดให้ผู้ใช้อัปโหลดไฟล์เข้าสู่ระบบ โดยไม่มีการตรวจสอบหรือตั้งกฎควบคุมที่เพียงพอ ซึ่งอาจทำให้ผู้ไม่ประสงค์ดีอัปโหลดไฟล์ที่เป็นอันตราย เช่น ไฟล์สคริปต์ (เช่น .php, .jsp, .aspx) หรือไฟล์ที่ฝังโค้ดมัลแวร์ เข้ามาในระบบได้ เมื่อไฟล์เหล่านี้ถูกประมวลผลหรือรันโดยเซิร์ฟเวอร์ อาจทำให้ผู้โจมตีสามารถเข้าควบคุมระบบ ขโมยข้อมูล หรือเปลี่ยนแปลงข้อมูลในระบบได้<br />

                      </Typography>
                      <Typography variant='h6' >ตัวอย่างการโจมตีที่เกิดจาก File Upload Vulnerabilities</Typography>
                      <List>
                        <ListItem><Typography>1. การอัปโหลดไฟล์สคริปต์อันตราย: หากระบบไม่มีการตรวจสอบประเภทไฟล์ (MIME type) หรือชนิดของไฟล์ (file extension) ที่อัปโหลด ผู้โจมตีอาจอัปโหลดไฟล์ที่มีโค้ดสคริปต์อันตราย เช่น .php หรือ .js ซึ่งสามารถรันคำสั่งได้บนเซิร์ฟเวอร์</Typography></ListItem>
                        <ListItem><Typography>2. การแปลงชนิดของไฟล์หรือการเปลี่ยนนามสกุลไฟล์: ผู้โจมตีสามารถแปลงชนิดของไฟล์หรือเปลี่ยนนามสกุลเพื่อให้ผ่านการตรวจสอบเบื้องต้น เช่น เปลี่ยนชื่อไฟล์จาก shell.php เป็น shell.php.jpg ซึ่งระบบอาจเข้าใจว่าเป็นไฟล์ภาพและยอมให้อัปโหลด</Typography></ListItem>
                        <ListItem><Typography>3. การใช้ไฟล์ที่มีโค้ดซ่อน: ผู้โจมตีอาจซ่อนโค้ดมัลแวร์ในไฟล์ เช่น ไฟล์เอกสารหรือไฟล์ภาพที่ดูเหมือนไม่มีอันตราย แต่เมื่อผู้ใช้หรือระบบเปิดไฟล์ โค้ดจะถูกรันขึ้นมา</Typography></ListItem>
                      </List>
                      <Typography variant='h6'>ผลกระทบของ File Upload Vulnerabilities</Typography>
                      <List>
                        <ListItem><Typography>1. การเข้าถึงระบบโดยไม่ได้รับอนุญาต: ผู้โจมตีสามารถใช้งานไฟล์ที่อัปโหลดในการเข้าถึงหรือควบคุมเซิร์ฟเวอร์ (MIME type) หรือชนิดของไฟล์ (file extension) ที่อัปโหลด ผู้โจมตีอาจอัปโหลดไฟล์ที่มีโค้ดสคริปต์อันตราย เช่น .php หรือ .js ซึ่งสามารถรันคำสั่งได้บนเซิร์ฟเวอร์</Typography></ListItem>
                        <ListItem><Typography>2. การเปลี่ยนแปลงข้อมูลในระบบ: ผู้โจมตีอาจเปลี่ยนแปลงข้อมูล หรือลบข้อมูลที่สำคัญในระบบได้</Typography></ListItem>
                        <ListItem><Typography>3. การกระจายมัลแวร์: ไฟล์ที่เป็นอันตรายสามารถกระจายมัลแวร์ไปยังผู้ใช้รายอื่นที่ดาวน์โหลดไฟล์ดังกล่าวจากระบบ</Typography></ListItem>
                        <ListItem><Typography>4. ขโมยข้อมูลสำคัญ: ไฟล์อันตรายสามารถใช้เป็นช่องทางในการเข้าถึงข้อมูลที่ละเอียดอ่อน เช่น ข้อมูลส่วนตัว หรือข้อมูลทางการเงิน</Typography></ListItem>
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
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>1. การจำกัดประเภทและนามสกุลของไฟล์ (File Type and Extension Restriction)</Typography>
                          การตรวจสอบประเภทของไฟล์ที่ผู้ใช้อัปโหลดเป็นวิธีสำคัญเพื่อให้แน่ใจว่าระบบยอมรับเฉพาะไฟล์ที่ปลอดภัย เช่น อนุญาตเฉพาะภาพ (.jpg, .png) หรือไฟล์เอกสาร (.pdf) และปฏิเสธไฟล์ประเภทอื่นๆ เช่น ไฟล์ที่สามารถรันโค้ดได้ (.php, .exe)

                        </Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet1}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. allowedExtensions: กำหนดรายการนามสกุลไฟล์ที่อนุญาต (ในที่นี้คือ .jpg, .jpeg, .png, .pdf)</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. file.name.split('.').pop().toLowerCase(): ดึงนามสกุลไฟล์จากชื่อไฟล์ และแปลงเป็นตัวพิมพ์เล็กเพื่อความแม่นยำ</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>3. allowedExtensions.includes(fileExtension): ตรวจสอบว่านามสกุลของไฟล์อยู่ในรายการที่อนุญาตหรือไม่ หากไม่อยู่ ระบบจะแจ้งเตือนผู้ใช้และล้างข้อมูลของ input</Typography>
                          </ListItem>
                        </List>
                      </Box>


                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>2. จำกัดขนาดไฟล์ (File Size Limitation)</Typography>
                          การกำหนดขนาดไฟล์สูงสุดที่สามารถอัปโหลดได้ช่วยป้องกันการโจมตีด้วยไฟล์ขนาดใหญ่ที่อาจทำให้เซิร์ฟเวอร์ทำงานหนักเกินไป หรือหยุดทำงานได้</Typography>
                        <CodeWindow
                          codeSnippets={codeSnippet2}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. file.size / (1024 * 1024): แปลงขนาดไฟล์จากหน่วยไบต์เป็นเมกะไบต์ (MB) โดยการแบ่งด้วย 1024 สองครั้ง</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. fileSizeMB  น้อยว่าหรือเท่ากับ maxSizeMB: ตรวจสอบว่าขนาดไฟล์ไม่เกินขนาดสูงสุดที่กำหนด (ในที่นี้คือ 2MB)</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>3. หากไฟล์มีขนาดเกิน ระบบจะล้างข้อมูล input และแจ้งผู้ใช้ให้อัปโหลดไฟล์ที่เล็กกว่า</Typography>
                          </ListItem>
                        </List>
                      </Box>

                      <Box sx={{
                        mb: 10
                      }}>
                        <Typography sx={{
                          mb: 7
                        }}>
                          <Typography variant='h6' sx={{ mb: 3, fontWeight: '650' }}>3. เปลี่ยนชื่อไฟล์ที่อัปโหลด (File Renaming)</Typography>
                          การเปลี่ยนชื่อไฟล์เป็นชื่อสุ่มหรือชื่อที่ปลอดภัยหลังการอัปโหลด สามารถลดความเสี่ยงจากการเรียกใช้ไฟล์โดยตรงจากชื่อไฟล์ที่ผู้ใช้อัปโหลด ซึ่งอาจทำให้ผู้โจมตีเรียกใช้ไฟล์อันตรายได้
                        </Typography>

                        <CodeWindow
                          codeSnippets={codeSnippet3}
                        />
                        <Typography variant='h6'>คำอธิบาย</Typography>
                        <List>
                          <ListItem>
                            <Typography>1. Date.now(): ใช้เวลาในขณะนั้น (timestamp) เพื่อสร้างส่วนแรกของชื่อไฟล์ที่ไม่ซ้ำกัน</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>2. Math.random().toString(36).substring(2, 15): สร้างสตริงสุ่มด้วยอักขระตัวเลขและตัวอักษร เพื่อทำให้ชื่อไฟล์ปลอดภัยและยากต่อการคาดเดา</Typography>
                          </ListItem>
                          <ListItem>
                            <Typography>3. file.mv(uploadPath, (err) arrow function {}): บันทึกไฟล์ไปยังตำแหน่งที่กำหนด โดยใช้ชื่อไฟล์ใหม่</Typography>
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
