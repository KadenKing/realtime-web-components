import React, { useState } from 'react';
import { useRealtimeText } from '../hooks/realtime';

const LikeCounter = ({
  id
}) => {
  const [likes, setLikes] = useRealtimeText(`likecounter:${id}`, 0);

  const incLikes = e => {
    setLikes(likes + 1);
  };

  const decLikes = e => {
    setLikes(likes === 0 ? likes : likes - 1);
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
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