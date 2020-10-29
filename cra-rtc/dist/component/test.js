import React, { useState } from 'react';

const Test = () => {
  const [state, setState] = useState('howdyyyy');
  return /*#__PURE__*/React.createElement("div", null, state);
};

export default Test;