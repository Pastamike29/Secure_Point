import React from 'react'
import { Container, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import DropdownContent from './Components/DropdownContent'
import SliderContent from '../../Components/SliderContent'
import Navbar from '../../Components/Navbar'
import AutoSlidingCards from '../../Components/AutoSlidingCards'

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
              <h2>This website is knowledge-base about vulnerability in Coding</h2>
              <p>It provides detailed insights into common security flaws, such as injection attacks, authentication weaknesses, and insecure data handling.<br /> By understanding these vulnerabilities, developers can implement stronger security measures to protect applications from potential threats</p>
            </Typography>
          </Box>

          <Container sx={{
            pb: 10,
          }}>
            <DropdownContent />

          </Container>
        </Box>


      </Container>





    </>

  )
}

