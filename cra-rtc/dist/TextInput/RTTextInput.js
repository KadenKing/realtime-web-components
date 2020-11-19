function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { useRealtimeData } from '../hooks/realtime';

const RTTextInput = ({
  id,
  ...rest
}) => {
  const [text, setText] = useRealtimeData(`textinput:${id}`);

  const onTextChange = e => {
    setText(e.target.value);
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", _extends({}, rest, {
    type: "text",
    value: text,
    onChange: onTextChange
  })));
};

export default RTTextInput;