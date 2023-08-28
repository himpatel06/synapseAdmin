import React from 'react';
import { Box, CircularProgress, Typography ,useTheme} from '@mui/material';
import { tokens } from "../theme";
import PersonIcon from '@mui/icons-material/Person';

const CustomerBox = ({ customersData }) => {
  const totalCustomers = Object.keys(customersData).length;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
    sx={{
      width: 1,
      height: 150,
      backgroundColor: colors.blueAccent[600],
      borderRadius: 5,
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
     <PersonIcon sx={{ fontSize: 60, color: colors.greenAccent[900]}} />
 
    <Typography variant="h2" sx={{ mt: 0 }}>
      {totalCustomers}
    </Typography>
    <Typography variant="h3">Total Customers</Typography>
  </Box>
  );
};

export default CustomerBox;
