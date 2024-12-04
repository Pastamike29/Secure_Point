import { Box, Container, Grid2, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Navbar from '../../../Components/Navbar'
import PageNavigation from '../../../Components/PageNavigation'
import FitImage from '../../../Components/FitImage'
import CodeWindow from '../../../Components/Code/CodeWindow'
import { getDirectoryTraversalCodeSnippets } from '../../../Components/Code/Owasp1_Code/DirectorySourceCode'
export default function DirectoryTraversal() {

     const codeSnippet1 = getDirectoryTraversalCodeSnippets('Lesson1')
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
                              <Navbar>

                              </Navbar>
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
                                                  <Typography variant='h4'> Directory Traversal</Typography>
                                                  <Typography variant='h4' sx={{
                                                       color: '#5155f5'
                                                  }}>
                                                       Pastar Mike
                                                  </Typography>
                                                  <Box sx={{
                                                       boxShadow: 3,
                                                       p: 6,
                                                       my: 5,
                                                  }}>

                                                       <FitImage src='https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2F3(DirectoryTraversal).png?alt=media&token=08e9e96d-b2f3-44fb-83b6-d4c8e518f964' />

                                                       <Typography sx={{
                                                            pt: 3,
                                                            pb: 6
                                                       }}>
                                                            Directory Traversal หรือที่เรียกกันว่า "การเข้าถึงไดเรกทอรีโดยไม่ได้รับอนุญาต" คือช่องโหว่ที่เกิดขึ้นเมื่อผู้ไม่หวังดีสามารถเจาะระบบเพื่อเข้าถึงไฟล์หรือโฟลเดอร์ที่อยู่นอกเหนือสิทธิ์ที่ควรเข้าถึงได้ ตัวอย่างเช่น<br />
                                                            การส่งคำสั่งพิเศษไปยังเซิร์ฟเวอร์เพื่อดึงข้อมูลไฟล์ที่ไม่ควรเปิดเผย เช่น ไฟล์ระบบ หรือข้อมูลสำคัญอื่น ๆ<br /><br />
                                                            วิธีการนี้จะใช้การเข้าถึงเส้นทางไฟล์ (path) ที่เซิร์ฟเวอร์เก็บไว้ โดยอาจใช้สัญลักษณ์ "../" ในการเลื่อนระดับไปยังโฟลเดอร์ก่อนหน้าและข้ามข้อจำกัดในการเข้าถึงไฟล์ ทำให้ผู้โจมตีสามารถดึงข้อมูลหรือแก้ไขไฟล์ได้
                                                       </Typography>

                                                  </Box>
                                             </Box>

                                             <Box>
                                                  <Box sx={{
                                                       my: 5,
                                                       p:6
                                                  }}>

                                                       <Typography variant='h4'
                                                            sx={{
                                                                 pb: 2
                                                            }}>
                                                            How to solve
                                                       </Typography>
                                                       <Typography sx={{
                                                            mb: 7
                                                       }}>
                                                            การแก้ปัญหาช่องโหว่ Directory Traversal ในเบื้องต้นมีวิธีที่สามารถนำไปใช้ได้ง่าย ๆ ดังนี้:<br /><br />
                                                            1.จำกัดเส้นทางที่สามารถเข้าถึงได้<br />
                                                            ห้ามให้ผู้ใช้สามารถระบุเส้นทางแบบสัมพัทธ์ (เช่น ../) เพื่อป้องกันการเลื่อนระดับออกนอกไดเรกทอรีที่กำหนดไว้<br />
                                                            2.การตรวจสอบ Input ที่ผู้ใช้ส่งมา<br />
                                                            ตรวจสอบและกรองข้อมูลที่ผู้ใช้กรอกเข้ามา ห้ามให้มีการใช้สัญลักษณ์ที่อาจนำไปสู่การเข้าถึงไฟล์หรือโฟลเดอร์ที่ไม่ได้รับอนุญาต เช่น ../ <br />
                                                            3.การใช้ฟังก์ชันที่ปลอดภัย<br />
                                                            ใช้ฟังก์ชันในภาษาโปรแกรมที่ออกแบบมาเพื่อป้องกันการเข้าถึงไดเรกทอรีนอกเหนือจากที่กำหนด

                                                       </Typography>

                                                       <CodeWindow
                                                            codeSnippets={codeSnippet1}
                                                       />

                                                       <Typography>
                                                            วิธีการป้องกัน:<br />
                                                            path.basename() ใช้เพื่อลบส่วนที่เป็นเส้นทางสัมพัทธ์ (../) ออกไป <br />
                                                            ตรวจสอบว่าไฟล์ที่ผู้ใช้ร้องขออยู่ในไดเรกทอรีที่ถูกต้องก่อนที่จะส่งข้อมูลออกไป
                                                       </Typography>
                                                  </Box>
                                             </Box>
                       
                                        </Box>
                                   </Container>

                                   <Box
                                        sx={{
                                             textAlign: 'center',
                                             py: 10,
                                             pl: 6,
                                        }}>

                                        <PageNavigation>

                                        </PageNavigation>

                                   </Box>



                              </Box>
                         </Box>
                    </Box>

               </Container>

          </>
     )
}
