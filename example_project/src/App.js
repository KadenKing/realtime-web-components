import React, { useEffect, useState } from 'react';
import './App.css';
import RTTextInput from 'cra-rtc/dist/TextInput/RTTextInput'
import jwt from 'jsonwebtoken'

/**

request that goes to developer's own server
const authObj = request(user, password) {
  return sign(user, date.now, SECRET)
}

**/


function App() {
  const token = jwt.sign({user: 'u1234'}, 'shh');

  return (

      <div className="App">
        <header className="App-header">
          {JSON.stringify(token)}
          <RTTextInput id="text1"></RTTextInput>
        </header>
      </div>
  );
}

export default App;
