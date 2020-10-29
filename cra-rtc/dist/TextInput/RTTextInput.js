import React from 'react';
import { useRealtimeText } from '../hooks/realtime';

const RTTextInput = ({
  id
}) => {
  const [text, setText] = useRealtimeText(`textinput:${id}`, "");

  const onTextChange = e => {
    setText(e.target.value);
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: text,
    onChange: onTextChange
  }));
};

export default RTTextInput;