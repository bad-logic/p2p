import './index.css';

import React from 'react';

import {
  P2P_CONNECTION_TYPE,
  PeerProvider,
} from 'context';
import ReactDOM from 'react-dom/client';

import App from './App';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <PeerProvider type={P2P_CONNECTION_TYPE.FRONT} p2pId="application2">
    <App />
  </PeerProvider>
);
