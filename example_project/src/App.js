import React, { useEffect, useState } from 'react';
import './App.css';
//import RTTextInput from 'cra-rtc/dist/TextInput/RTTextInput'
import RTTextInput from 'cra-rtc/dist/TextInput/RTTextInput'
import RTTextArea from 'cra-rtc/dist/TextInput/RTTextArea'
import RTDraw from './RTDraw'
import LikeCounter from 'cra-rtc/dist/NumericInput/LikeCounter'
import jwt from 'jsonwebtoken'
import CanvasDraw from "react-canvas-draw";
/**

request that goes to developer's own server
const authObj = request(user, password) {
  return sign(user, date.now, SECRET)
}

**/


function App() {
  //const token = jwt.sign({user: 'u1234'}, 'shh');

  return (

      <div className="App">
        <header className="App-header">
          <RTTextInput style={{marginBottom: "40px"}} id="text1"></RTTextInput>
          <RTTextArea style={{marginBottom: "40px"}} id="textarea1"></RTTextArea>
          <LikeCounter style={{marginBottom: "40px"}} id="like1"></LikeCounter>
          <RTDraw id="draw1"/>
        </header>
      </div>
  );
}

export default App;
