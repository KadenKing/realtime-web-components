import React, { useContext, useEffect, useState } from 'react';
import {RTContext} from '../rtInit'

const { Socket } = require('phoenix-channels')
 
let socket = new Socket("wss://realtimewebcomponents.com:4001/socket")
 
socket.connect()

const useChannel = (channelName) => {
    const [channel, setChannel] = useState();
    const [value, setValue] = useState();

    useEffect(() => {
      let channel = socket.channel(channelName, {})
      channel.join()
        .receive("ok", resp => { 
          console.log("Joined successfully", resp)
          setValue(resp);
          setChannel(channel);
       })
        .receive("error", resp => { console.log("Unable to join", resp) })
        return () => {
          channel.leave()
        }
    }, [])
  
      return [channel, value]
  
  }

const useRealtimeData = (id) => {
  const context = useContext(RTContext)
  var projectID = context.projectID;

  if (!projectID) {
    projectID = context.id;
  }

  const [channel, val] = useChannel(`room:${projectID}:${id}`);
  const [text, setStateText] = useState();

  const setText = (text) => {
    setStateText(text)
    channel.push("new_msg", {body: text})
  }

  // add initial value to useEffect channel
  useEffect(() => {
    if (!channel) {
      return
    }

    channel.on("new_msg", payload => {
      setStateText(payload.body)
    })


  }, [channel])

  useEffect(() => {
    if (!val) {
      return
    }

    setStateText(val)

  }, [val])

  return [text, setText]
}

export {useRealtimeData}