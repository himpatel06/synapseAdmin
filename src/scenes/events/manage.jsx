import { Box, Typography, useTheme,IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
   
    {
      field: "eventName",
      headerName: "Event Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "eventDescription",
      headerName: "Event Description",
      headerAlign: "left",
      flex: 1,
      align: "left",
    },
    {
      field: "eventType",
      headerName: "Event Type",
      flex: 1,
    },
    {
      field: "isTentative",
      headerName: "isTentative",
      flex: 1,
    },
    {
      field: "eventDateTime",
      headerName: "eventDateTime",
      flex: 1,
    },
    {
      headerName:"",
      flex: 1,
      renderCell:({row})=>{
        //{console.log(row);}
        return(
         
          <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            
            window.location.href = `/edit/${row._id}`
          }}
        >
          Edit
        </Button>
        )
      }
    }
   
   
  ];

  const [mockDataTeam, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/events');
      setEvents(response.data);
    
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  return (
    <Box m="20px">
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
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} getRowId={(row)=>row._id}/>
      </Box>
    </Box>
  );
};

export default Team;