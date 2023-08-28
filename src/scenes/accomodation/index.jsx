import { Box, Typography, useTheme,IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerBox from '../component';


 

const Accomodation = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
   
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  
    {
      field: "email",
      headerName: "Emial Address",
      flex: 1,
    },
    {
      field: "mobileNumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "collegeName",
      headerName: "College Name",
      flex: 1,
    },
    {
      field: "days",
      headerName: "Number of Days",
      flex: 1,
    },
    {
      field: "transectionId",
      headerName: "Transection Id",
      flex: 1,
    },
    
    
   
   
  ];
  const [mockDataTeam, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/accommodation-bookings');
      setCustomers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };
  return (
   
    <Box m="20px">
      <CustomerBox customersData={mockDataTeam}/>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
};

export default Accomodation;