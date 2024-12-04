import React from 'react'
import { Container, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import DropdownContent from './Components/DropdownContent'
import SliderContent from '../../Components/SliderContent'
import Navbar from '../../Components/Navbar'
import AutoSlidingCards from '../../Components/AutoSlidingCards'
import Chatbot from '../../Components/Chatbot'

export default function MainContent() {


  return (
    <>

      <Box>
        <Navbar />
      </Box>

      <Box sx={{
        py: 18
      }}>
        <SliderContent />
      </Box>

      <Container maxWidth={false} sx={{
        position: 'relative',
        height: '80vh',
      }}>

        <Box sx={{
          position: 'absolute',
          zindex: -1,
          width: '100.4%',
          ml: '-4vh',
        }}>
          <Box>
            <AutoSlidingCards />
          </Box>

          <Box>
            <Typography sx={{
              textAlign: 'center',
            }}>
              <h1>Secure Point</h1>
              <h2>เว็บไซต์นี้เป็นฐานข้อมูลความรู้ที่จะรวบรวมข้อมูลเกี่ยวกับช่องโหว่ต่าง ๆ ที่มักพบเจอระหว่างการพัฒนาเว็บแอปพลิเคชัน</h2>
              <p>ซึ่งจะช่วยให้ข้อมูลเชิงลึกเกี่ยวกับช่องโหว่ด้านความปลอดภัยที่พบได้บ่อย เช่น SQL Injection, Broken Access Control, Insecure Design<br /> โดยการทำความเข้าใจช่องโหว่เหล่านี้ นักพัฒนาสามารถใช้มาตรการรักษาความปลอดภัยที่เข้มงวดขึ้นเพื่อปกป้องแอปพลิเคชันจากภัยคุกคามที่อาจเกิดขึ้นได้</p>
            </Typography>
          </Box>

          <Container sx={{
            pb: 10,
          }}>
            <DropdownContent />

          </Container>
        </Box>

        <Chatbot />

      </Container>





    </>

  )
}

