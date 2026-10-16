import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
// Design geometry first, then application overrides; preserve this cascade order.
import './design/design.css';
import './styles.css';
import './components/interactions.css';
import './design/mobile-design.css';
import './components/mobile/mobile.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
