import './App.css'
import CareRecipientJournal from './CareRecipientJournal/CareRecipientJournal'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { CARE_RECIPIENT_ID } from './constants'
// import React from "react";

function App(): JSX.Element {
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="sm">
        <CareRecipientJournal careRecipientId={CARE_RECIPIENT_ID} />
      </Container>
    </div>
  )
}

export default App
