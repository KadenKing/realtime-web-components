import React, { useEffect, useState } from 'react';
import './App.css';
import RTTextInput from 'cra-rtc/dist/TextInput/RTTextInput'

function App() {
  return (

      <div className="App">
        <header className="App-header">
          <RTTextInput id="text1"></RTTextInput>
        </header>
      </div>
  );
}

export default App;
