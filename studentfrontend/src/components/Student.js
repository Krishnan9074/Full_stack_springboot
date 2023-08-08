import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

const StyledForm = styled('form')(({ theme }) => ({
  '& > *': {
    margin: theme.spacing(1),
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '50px 20px',
  width: 600,
  margin: '20px auto',
}));

export default function Student() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [students, setStudents] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    const student = { name, address };
    console.log(student);
    fetch('http://localhost:8080/student/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    }).then(() => {
      console.log('New Student added');
    });
  };

  useEffect(() => {
    fetch('http://localhost:8080/student/getAll')
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);

  return (
    <Container>
      <StyledPaper elevation={3}>
        <h1 style={{ color: 'blue' }}>
          <u>Add Student</u>
        </h1>

        <StyledForm noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Student Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Student Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={handleClick}>
            Submit
          </Button>
        </StyledForm>
      </StyledPaper>
      <h1>Students</h1>

      <StyledPaper elevation={3}>
        {students.map((student) => (
          <Paper
            elevation={6}
            style={{ margin: '10px', padding: '15px', textAlign: 'left' }}
            key={student.id}
          >
            Id:{student.id}
            <br />
            Name:{student.name}
            <br />
            Address:{student.address}
          </Paper>
        ))}
      </StyledPaper>
    </Container>
  );
}
