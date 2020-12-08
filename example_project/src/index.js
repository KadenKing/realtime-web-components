import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {RTContext} from 'react-realtimewebcomponents/dist/rtInit'

const config ={
  id: "f6dad0f9-ac3e-490d-83cb-d1683418fd6f",
  name: "test",
  user_id: 2
}

ReactDOM.render(
  <React.StrictMode>
    <RTContext.Provider value={config}>
    <App />
    </RTContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
