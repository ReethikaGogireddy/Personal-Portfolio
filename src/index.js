import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import initScrollReveal from "./components/ScrollReveal.js";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// initialize after initial render to ensure DOM nodes exist
document.addEventListener("DOMContentLoaded", () => {
  // call and keep the cleanup function if you want to disconnect later
  const cleanup = initScrollReveal();
  // optionally attach cleanup for HMR or other lifecycle hooks:
  if (import.meta && import.meta.hot) {
    import.meta.hot.dispose(() => cleanup());
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
