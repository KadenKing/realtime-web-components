import React, { useState } from 'react';
import { useRealtimeData } from '../hooks/realtime';

const LikeCounter = ({
  id,
  ...rest
}) => {
  const [likes, setLikes] = useRealtimeData(`likecounter:${id}`);

  const incLikes = e => {
    setLikes(likes + 1);
  };

  const decLikes = e => {
    setLikes(likes === 0 ? likes : likes - 1);
  };

  return /*#__PURE__*/React.createElement("div", rest, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: incLikes
  }, "\uD83D\uDC4D"), /*#__PURE__*/React.createElement("div", {
    onClick: decLikes
  }, "\uD83D\uDC4E")), /*#__PURE__*/React.createElement("div", null, likes));
};

export default LikeCounter;