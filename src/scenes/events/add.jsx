import React from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { Box, TextField, Checkbox, FormControlLabel, Button, Select, MenuItem, useTheme, Typography } from '@mui/material';
import * as Yup from 'yup';
import { tokens } from "../../theme";

const validationSchema = Yup.object().shape({
  eventName: Yup.string().required('Event Name is required'),
  eventDescription: Yup.string().required('Event Description is required'),
  eventType: Yup.string().required('Event Type is required'),
  eventDateTime: Yup.string().when('isTentative', {
    is: false,
    then: Yup.string().required('Event Date and Time is required'),
  }),
});



const EventForm = () => {
  const initialValues = {
    eventName: '',
    eventDescription: '',
    isTentative: false,
    eventType: '',
    eventDateTime: '',
  };

  const handleSubmit =  (values,{ resetForm }) => {
    console.log(values);
   
    // You can perform any necessary actions with the form values here
    
    const response =  axios.post('http://localhost:5000/api/events', values);
    window.alert('Event added successfully!');
   resetForm(); 
   
    
   
  };

  const theme = useTheme();
const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {({ values, handleChange, handleBlur, errors, touched }) => (
        <Form>
          <Box
              display="grid"
              gap="30px"
             >
            
              <TextField
                variant="filled"
                label="Event Name"
                name="eventName"
                value={values.eventName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.eventName && !!errors.eventName}
                helperText={touched.eventName && errors.eventName}
                sx={{ gridColumn: "span 4" }}
              />
            

           
              <TextField
                variant="filled"
                label="Event Description"
                name="eventDescription"
                multiline
                rows={4}
                value={values.eventDescription}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.eventDescription && !!errors.eventDescription}
                helperText={touched.eventDescription && errors.eventDescription}
                sx={{ gridColumn: "span 4" }}
              />
            

            
              <FormControlLabel
                control={
                  <Checkbox
                    name="isTentative"
                    checked={values.isTentative}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      color: colors.greenAccent[600],
                    }}
                  />
                }
                label="Is Date and Time Tentative?"
                sx={{ gridColumn: "span 4" }}
              />
            

            {!values.isTentative && (
              
                <TextField
                  variant="filled"
                  label="Event Date and Time"
                  name="eventDateTime"
                  value={values.eventDateTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.eventDateTime && !!errors.eventDateTime}
                  helperText={touched.eventDateTime && errors.eventDateTime}
                  sx={{ gridColumn: "span 4" }}
                />
            
            )}

            <Typography>Select Event Type:</Typography>
            <Select
                variant="filled"
                label="Type of Event"
                name="eventType"
                value={values.eventType}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.eventType && !!errors.eventType}
                helperText={touched.eventType && errors.eventType}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="" disabled>
                  Select Event Type
                </MenuItem>
                <MenuItem value="competition">Competition</MenuItem>
                <MenuItem value="show">Show</MenuItem>
              </Select>
           
              
            <Button variant="contained" color="primary" type="submit"  style={{
                      color: colors.grey[100],
                      background:colors.blueAccent[700]
                    }}>
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
    </Box>
  );
};

export default EventForm;
