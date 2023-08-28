import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { DataGrid } from "@mui/x-data-grid";
import { FormControl, InputLabel, Select, MenuItem, TextField, Button,Box,useTheme, } from '@mui/material';
import { tokens } from "../../theme";
import ShowEvents from "./showEvents"


const validationSchema = Yup.object().shape({
  eventName: Yup.string().required('Please select an event name'),
  contestantName: Yup.string().required('Candidate name is required'),
  position: Yup.string().required('Position is required'),
});

const Edit = () => {
  const [eventsName,setEvents] = useState([]);
  const [mockDataTeam, setCustomers] = useState([]);
  
useEffect(() => {
  addResults();
  setResults();
}, [mockDataTeam]);

const addResults = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/events');
    setEvents(response.data);
   
   
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
};

const setResults = async ()=>{
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/event-results');
    setCustomers(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
}
  const handleSubmit = (values,{ resetForm }) => {
    
    console.log(values);
    const response =  axios.post('http://localhost:5000/api/event-results', values);
    setResults();
   resetForm(); 
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
    <div>
      <h1>Even Winners Results</h1>
      <Formik
        initialValues={{
          eventName: '',
          contestantName: '',
          position: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="eventName">Add Event Name</InputLabel>
              <Field
                as={Select}
                name="eventName"
                label="Select Event"
                id="eventName"
                fullWidth
                variant="outlined"
              >
                <MenuItem value="">Select an event</MenuItem>
                {eventsName.map((event, index) => (
                  <MenuItem key={index} value={event.eventName}>
                    {event.eventName}
                  </MenuItem>
                ))}
              </Field>
              <ErrorMessage name="eventName" component="div" className="error" />
            </FormControl>

            <Field
              as={TextField}
              fullWidth
              label="Candidate Name"
              name="contestantName"
              id="contestantName"
              variant="outlined"
              margin="normal"
            />
            <ErrorMessage name="contestantName" component="div" className="error" />

            <Field
              as={TextField}
              fullWidth
              label="Position (First, Second, or Third)"
              name="position"
              id="position"
              variant="outlined"
              margin="normal"
            />
            <ErrorMessage name="position" component="div" className="error" />

            <Button variant="contained" color="primary" type="submit"  style={{
                      color: colors.grey[100],
                      background:colors.blueAccent[700]
                    }}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
    <Box m="20px">
            <ShowEvents mockDataTeam={mockDataTeam}/>      
    </Box>
    </Box>
  );
};

export default Edit;
