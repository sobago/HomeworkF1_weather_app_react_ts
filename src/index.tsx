import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './css/index.css';
import App from './components/App';

const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <App />
);
