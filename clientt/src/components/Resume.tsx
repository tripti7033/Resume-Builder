import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  ThemeProvider,
  Typography,
} from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { MainTheme } from '../MainTheme';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SchoolIcon from '@mui/icons-material/School';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

interface UserState {
  email: string;
  userid: string;
  image: string;
  isLoggedin: boolean;
}
const Resume = () => {
  const { userid } = useSelector((state: { user: UserState }) => state.user);
// console.log(userid);

  const [userData, setUserData] = useState({
    image: '',
    name: '',
    designation: '',
    email: '',
    gitHub: '',
    phoneNumber: '',
    address: '',
    pinCode: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    hobbies: '',
    language: '',
    objective: '',
    course: '',
    collegeName: '',
    universityName: '',
    yearOfStarting: '',
    yearOfPassing: '',
    grade: '',
    skill1: '',
    description1: '',
    skill2: '',
    description2: '',
    title: '',
    description: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get(
          `http://localhost:6005/users/2/preview`
        );
        
        const id = parseInt(userid) -1;
        // console.log(response.data[id]);
        const result = response.data[id];
        console.log(result);
        console.log(result.image, "dfghbjnkml");
        
        
        setUserData((prevstate) => ({
          ...prevstate,
          image: result.image,
          name: result.person.name,
          designation: result.person.designation,
          email: result.person.email,
          gitHub: result.person.gitHub,
          phoneNumber: result.person.phoneNumber,
          address: result.person.address,
          pinCode: result.person.pincode,
          dateOfBirth: result.person.dateOfBirth,
          gender: result.person.gender,
          nationality: result.person.nationality,
          hobbies: result.person.hobbies,
          language: result.person.language,
          objective: result.person.objective,
          course: result.educationDetails[0].course,
          collegeName: result.educationDetails[0].collegeName,
          universityName: result.educationDetails[0].univerSityName,
          yearOfStarting: result.educationDetails[0].yearOfStarting,
          yearOfPassing: result.educationDetails[0].yearOfPassing,
          grade: result.educationDetails[0].grade,
          skill1: result.skills[0].skill1,
          description1: result.skills[0].description1,
          skill2: result.skills[0].skill2,
          description2: result.skills[0].description2,
          title: result.projects[0].title,
          description: result.projects[0].description,
        }));
        
      } catch (err){
        
      }
    }
    fetchData();
  }, [userid]);
  console.log(userData);

  const downloadRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => downloadRef.current,
  });

  return (
  <ThemeProvider theme={MainTheme}>
      <Box display={'flex'}>
      <Box display={'flex'} justifyContent={'center'} ref={downloadRef}>
        <Paper
          elevation={3}
          sx={{
            height: '900px',
            width: '90%',
            marginTop: '15px',
            marginLeft: '10px',
          }}
        >
          <Box
            height={150}
            display={'flex'}
            flexDirection={'column'}
            borderBottom={'1px solid rgba(25, 179, 238, 0.8)'}
            sx={{background: "rgba(25, 179, 238, 0.5)"}}
          >
            <Box display={'flex'} justifyContent={'space-around'} >
              <Box display={'flex'}>
                <IconButton>
                  <Avatar
                    sx={{
                      height: '130px',
                      width: ' 130px',
                    }}
                    alt={userData.name}
                    src={userData.image}
                  />
                </IconButton>
              </Box>
              <Box 
              // display={"flex"}  flexDirection={"column"} justifyContent={"center"} alignItems={"center"}
              >
                <Typography variant="h2" >
                  {userData.name}
                </Typography>
                <Typography variant="h5">
                  {userData.designation}
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* <hr/> */}
          <Box
            overflow="auto"
            padding={2}
          >
            <Grid
              container
              spacing={12}
              sx={{
                paddingLeft: "10px",
                height: '100%',
              }}
            >
              <Grid
                item
                md={4}
                xs={6}
               >
                <Box>
                  <Typography
                    variant="h6">
                    <ContactMailIcon/>
                    Contact     
                  </Typography>
                  <Box paddingLeft={2} paddingTop={1}>
                    <Typography
                      sx={{
                        display: 'flex',
                        gap: '10px',
                        paddingBottom: '2px',
                      }}
                    >
                      <PhoneIcon />
                      {userData.phoneNumber}
                    </Typography>
                    <Typography
                      sx={{
                        display: 'flex',
                        gap: '10px',
                        paddingBottom: '3px',
                      }}
                    >
                      <MailOutlineIcon />
                      {userData.email}
                    </Typography>
                    <Typography
                      sx={{
                        display: 'flex',
                        gap: '10px',
                        paddingBottom: '3px',
                      }}
                    >
                      <GitHubIcon />
                      {userData.gitHub}
                      {/* {userData.github} */}
                    </Typography>
                    <Typography
                      sx={{
                        display: 'flex',
                        gap: '10px',
                        paddingBottom: '3px',
                      }}
                    >
                      <HomeIcon />
                      {userData.address}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                  >
                    <ManageAccountsIcon/>
                    Skill
                  </Typography>
                  <Box paddingLeft={3} paddingTop={1}>
                    <Typography
                    //    sx={{paddingLeft: '13px' }}
                    >
                      {userData.skill1}{' '}
                    </Typography>
                    <Typography sx={{ paddingLeft: '20px' }}>
                      {userData.description1}
                    </Typography>
                  </Box>
                  <Box paddingLeft={3} paddingTop={1}>
                    <Typography
                    //    sx={{paddingLeft: '13px' }}
                    >
                      {userData.skill2}{' '}
                    </Typography>
                    <Typography sx={{ paddingLeft: '20px' }}>
                      {userData.description2}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                  >
                    <AddBoxIcon/>
                    Others
                  </Typography>
                  <Box paddingLeft={3} paddingTop={1}>
                    <Grid container>
                      <Grid item md={6}>
                        <Typography>Nationality : </Typography>
                        <Typography>Gender : </Typography>
                        <Typography>Date of Birth : </Typography>
                        <Typography>Hobbies : </Typography>
                        <Typography>Language : </Typography>
                      </Grid>
                      <Grid item md={6}>
                        <Typography>{userData.nationality}</Typography>
                        <Typography> {userData.gender}</Typography>
                        <Typography> {userData.dateOfBirth}</Typography>
                        <Typography> {userData.hobbies}</Typography>
                        <Typography> {userData.language}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} md={8}>
                <Box>
                  <Typography
                    variant="h6">
                    <AdsClickIcon/>
                    Objective
                  </Typography>
                  <Box
                    paddingTop={1}
                    sx={{
                      paddingLeft: '30px',
                    }}
                  >
                    <Typography>
                      {/* A highly organized and hard-working individual looking for
                      a responsible position to gain practical experience. */}
                      {userData.objective}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="h6">
                    <SchoolIcon/>
                    Education
                  </Typography>
                  <Box
                    paddingTop={1}
                    sx={{
                      paddingLeft: '30px',
                    }}
                  >
                    <Typography>cousre: {userData.course}</Typography>
                    <Typography>college: {userData.collegeName}</Typography>
                    <Typography>
                      university: {userData.universityName}
                    </Typography>
                    <Typography>grade: {userData.grade}</Typography>
                    <Typography>
                      Session: {userData.yearOfPassing} - {userData.yearOfStarting}
                    </Typography>
                  </Box>
                  <Box></Box>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                  >
                    <ArchitectureIcon/>
                    Projects
                  </Typography>
                  <Box
                    paddingTop={1}
                    sx={{
                      paddingLeft: '30px',
                    }}
                  >
                    <Typography> {userData.title}</Typography>
                    <Typography sx={{ paddingLeft: '20px' }}>
                      {userData.description}
                    </Typography>
                  </Box>
                </Box>
                <Box paddingTop={1}>
                  <Typography
                    variant="h6"
                  >
                    <DriveFileRenameOutlineIcon/>
                    Declaration
                  </Typography>
                  <Box
                    sx={{
                      paddingTop: '10px',
                      paddingLeft: '30px',
                    }}
                  >
                    <Typography>
                      {' '}
                      I hearby confirm that the information given above is true
                      to the best of my knowledge and belief.
                    </Typography>
                    <Box
                      p={1}
                      display={'flex'}
                      justifyContent={'space-between'}
                    >
                      <Typography>Name: {userData.name}</Typography>
                      <Typography>Place: {userData.address}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
      <Box margin={2}>
        <Button onClick={handlePrint} variant="contained">
          Download
        </Button>
      </Box>
    </Box>
  </ThemeProvider>
  );
};

export default Resume;
