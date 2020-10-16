import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const ProjectContext = React.createContext('Project_ID');
//from config file

const { Socket } = require('phoenix-channels')
 
let socket = new Socket("ws://localhost:4000/socket")
 
socket.connect()


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

export {useChannel}