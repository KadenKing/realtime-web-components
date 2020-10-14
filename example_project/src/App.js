import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const { Socket } = require('phoenix-channels')
 
let socket = new Socket("ws://localhost:4000/socket")
 
socket.connect()
 
// Now that you are connected, you can join channels with a topic:



const useChannel = (channelName) => {
  const [channel, setChannel] = useState();

  useEffect(() => {
    let channel = socket.channel(channelName, {})
    channel.join()
      .receive("ok", resp => { 
        console.log("Joined successfully", resp)
        setChannel(channel);
     })
      .receive("error", resp => { console.log("Unable to join", resp) })

      return () => {
        channel.leave()
      }
  }, [])

    return [channel]

}

function App() {
  const [channel] = useChannel('room:lobby');
  const [resp, setResp] = useState();

  useEffect(() => {
    if (!channel) {
      return
    }

    
  }, [channel])

  return (

      <div className="App">
        <header className="App-header">
          {channel && JSON.stringify(channel.data)}
        </header>
      </div>
  );
}

export default App;
