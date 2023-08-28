import { useState,useEffect } from 'react';
import axios from 'axios';

import{Routes,Route} from "react-router-dom";
import { ColorModeContext,useMode } from './theme';
import { Accordion, CssBaseline,ThemeProvider } from '@mui/material';
import Topbar from "./scenes/global/Topbar"
import Accomodation from './scenes/accomodation'
import Sidebar from './scenes/global/Sidebar'
import Curstomer from './scenes/curstomers'
import AddEvents from './scenes/events/add'
import ManageEvents from './scenes/events/manage'
import EditEvent from './scenes/events/edit'
import NotifyEvents from './scenes/events/notify'
import Results from './scenes/events/results'
import Participant from './scenes/particitants'
import Payment from './scenes/payment'

function App() { 

  const [theme,colorMode] = useMode();
return(
  <ColorModeContext.Provider value={colorMode}>
<ThemeProvider theme={theme}>
  <CssBaseline/>
  <div className='app'>
    <Sidebar/>
    <main className='content'>
      <Topbar/>
      <Routes>
        <Route path='/' element={<Curstomer/>}/>
        <Route path='/customer' element={<Curstomer/>}/>
        <Route path='/addevents' element={<AddEvents/>}/>
        <Route path='/manage' element={<ManageEvents/>}/>
        <Route  path="/edit/:id" element={<EditEvent/>} />
        <Route  path='/results' element={<Results/>} />
        <Route  path='/participants' element={<Participant/>} />
        <Route  path='/payment' element={<Payment/>} />
        <Route  path='/accomodation' element={<Accomodation/>} />
        

      </Routes>
    </main>
  </div>
</ThemeProvider>
</ColorModeContext.Provider>
)
}

export default App;
