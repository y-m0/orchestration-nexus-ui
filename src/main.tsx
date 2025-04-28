
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Make sure we're targeting the correct root element
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
      <SpeedInsights />
    </React.StrictMode>
  );
}
