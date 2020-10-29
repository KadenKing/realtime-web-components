import React, { useContext, useEffect, useState } from 'react';
import { RTContext } from '../rtInit';

const {
  Socket
} = require('phoenix-channels');

let socket = new Socket("ws://localhost:4000/socket");
socket.connect();

const useChannel = channelName => {
  const [channel, setChannel] = useState();
  useEffect(() => {
    let channel = socket.channel(channelName, {});
    channel.join().receive("ok", resp => {
      console.log("Joined successfully", resp);
      setChannel(channel);
    }).receive("error", resp => {
      console.log("Unable to join", resp);
    });
    return () => {
      channel.leave();
    };
  }, []);
  return [channel];
};

const useRealtimeText = (id, initialValue) => {
  const context = useContext(RTContext);
  const [channel] = useChannel(`room:${context.projectID}:${id}`);
  const [text, setStateText] = useState(initialValue);

  const setText = text => {
    setStateText(text);
    channel.push("new_msg", {
      body: text
    });
  };

  useEffect(() => {
    if (!channel) {
      return;
    }

    channel.on("new_msg", payload => {
      setStateText(payload.body);
    });
  }, [channel]);
  return [text, setText];
};

export { useRealtimeText };