import React, { useEffect, useState } from 'react';
import './App.css';
// import RTTextInput from 'cra-rtc/dist/TextInput/RTTextInput'
import Test from 'cra-rtc/dist/component/test'

// import RTTextInput from 'realtime-components'

function App() {
  return (

      <div className="App">
        <header className="App-header">
          <Test></Test>
          {/* <RTTextInput id="text1"></RTTextInput> */}
          {/* <RTTextInput id="text2"></RTTextInput>
          <RTTextArea id="text2"></RTTextArea>
          <LikeCounter id="like1"></LikeCounter> */}
        </header>
      </div>
  );
}

export default App;
