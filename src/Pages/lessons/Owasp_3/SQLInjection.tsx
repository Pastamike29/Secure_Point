import { Box, Container, Grid2, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import GridCard from '../../../Components/GridCard'
import GridCard2 from '../../../Components/GridCard2'
import Sidebar from '../../../Components/Sidebar'
import Navbar from '../../../Components/Navbar'
import PageNavigation from '../../../Components/PageNavigation'
import CodeWindow from '../../../Components/Code/CodeWindow'
import { getSQLICodeSnippets } from '../../../Components/Code/Owasp3_Code/SQLInjection'
import CodeDescriptionTemplate from '../../CodeExample/Component/CodeDescriptionTemplate'

export default function SQLInjection() {

     const codeSnippet1 = getSQLICodeSnippets('Lesson1')
     const codeSnippet2 = getSQLICodeSnippets('Lesson2')
     const codeSnippet3 = getSQLICodeSnippets('Lesson3')
     const ExampleCode = getSQLICodeSnippets('ExampleCode')
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
                                                  <Typography variant='h4'> SQL injection</Typography>
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

                                                       <Box sx={{
                                                            py: 3
                                                       }}>
                                                            <img src="https://learn.g2.com/hubfs/G2CM_FI694_Learn_Article_Images-%5BSQL_Injection%5D_V1a.png" alt="" />

                                                       </Box>

                                                       <Typography sx={{
                                                            pt: 3,
                                                            pb: 6
                                                       }}>
                                                            SQL Injection เป็นช่องโหว่ด้านความปลอดภัยที่เกิดขึ้นเมื่อแฮกเกอร์สามารถใส่โค้ด SQL เข้าไปในช่องรับข้อมูล เช่น ฟอร์มกรอกข้อมูลของเว็บไซต์ เพื่อให้ระบบรันคำสั่ง SQL ที่แฮกเกอร์ต้องการ ส่งผลให้แฮกเกอร์สามารถเข้าถึงข้อมูลในฐานข้อมูลโดยไม่ได้รับอนุญาต เช่น การดูข้อมูลส่วนตัว การแก้ไขหรือลบข้อมูล< br /><br />
                                                            ตัวอย่างง่าย ๆ คือ เมื่อผู้ใช้กรอกข้อมูลในฟอร์ม เช่น ฟิลด์ Username หรือ Password แล้วระบบนำข้อมูลนี้ไปใช้ในคำสั่ง SQL หากระบบไม่ได้กรองหรือป้องกันการใส่โค้ด SQL ที่ไม่ปลอดภัย แฮกเกอร์อาจใส่โค้ด SQL เพื่อหลอกระบบ เช่น การดูข้อมูลบัญชีทั้งหมดของผู้ใช้
                                                       </Typography>

                                                  </Box>
                                             </Box>

                                             <Box>




                                                  <Box sx={{
                                                       boxShadow: 3,
                                                       p: 6,
                                                       my: 3,
                                                  }}>
                                                       <Typography variant='h4'
                                                            sx={{
                                                                 pb: 2
                                                            }}>
                                                            How to solve
                                                       </Typography>


                                                       <Typography variant='h6' sx={{
                                                            mb: 7
                                                       }}>
                                                            1. ใช้ Prepared Statements
                                                            <Typography>Prepared Statements เป็นวิธีการที่ปลอดภัยในการจัดการกับข้อมูลที่ผู้ใช้ป้อนเข้ามาและใช้ในคำสั่ง SQL ซึ่งจะช่วยป้องกัน SQL Injection โดยการแยกคำสั่ง SQL ออกจากข้อมูลที่ได้รับจากผู้ใช้ ทำให้ไม่สามารถดัดแปลงคำสั่ง SQL ได้จากการโจมตีผ่านข้อมูลที่ได้รับจากผู้ใช้ </Typography>
                                                       </Typography>
                                                       <Typography variant='h6' sx={{
                                                            mb: 7
                                                       }}>
                                                            การทำงานของ Prepared Statement
                                                            <Typography>Prepared Statements คือการเตรียมคำสั่ง SQL ก่อนการส่งไปยังฐานข้อมูล จากนั้นจะใช้ค่าที่มาจากผู้ใช้มาแทนที่ placeholder (เช่น ?) ที่เราเตรียมไว้ในคำสั่ง SQL โดยค่าที่ใส่เข้าไปจะถูกแยกออกจากคำสั่ง SQL จริงๆ ทำให้ไม่สามารถเกิด SQL Injection ได้ </Typography>
                                                       </Typography>

                                                       <CodeWindow
                                                            codeSnippets={codeSnippet1}
                                                       />


                                                       <Typography variant='h6' sx={{
                                                            mb: 7
                                                       }}>
                                                            2. ใช้ ORM (Object-Relational Mapping)
                                                            <Typography>ORM เช่น Sequelize (Node.js), SQLAlchemy (Python) ช่วยให้คุณสามารถจัดการกับฐานข้อมูลโดยไม่ต้องเขียนคำสั่ง SQL โดยตรง ซึ่งจะช่วยลดความเสี่ยงของ SQL Injection </Typography>
                                                       </Typography>

                                                       <CodeWindow
                                                            codeSnippets={codeSnippet2}
                                                       />

                                                       <Typography my={6}>คำอธิบาย: SQLAlchemy จะจัดการการแปลงข้อมูลให้เป็นคำสั่ง SQL ที่ปลอดภัยโดยอัตโนมัติ ทำให้ไม่ต้องกังวลเรื่อง SQL Injection</Typography>
                                                       <Typography variant='h6' sx={{
                                                            mb: 7
                                                       }}>
                                                            3. ใช้ Escaped string หรือ Escaped Character
                                                            <Typography>Escaped string หรือ escaped character คือการใช้สัญลักษณ์พิเศษ (escape sequences) เพื่อแทนที่ตัวอักษรหรือสัญลักษณ์ที่มีความหมายพิเศษในภาษาการเขียนโปรแกรม เช่น ตัวอักษรที่ใช้ในคำสั่ง, เครื่องหมายคำพูด, หรือแม้กระทั่งตัวอักษรที่ไม่สามารถแสดงได้ในข้อความปกติ เช่น newline (ขึ้นบรรทัดใหม่) หรือ tab (แท็บ)

                                                                 การใช้ escape character ช่วยให้คุณสามารถใช้ตัวอักษรพิเศษเหล่านี้ในข้อความได้อย่างถูกต้อง และไม่ทำให้เกิดข้อผิดพลาดในโปรแกรม</Typography>
                                                       </Typography>

                                                       <CodeWindow
                                                            codeSnippets={codeSnippet3}
                                                       />




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
