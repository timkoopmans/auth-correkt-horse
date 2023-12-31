import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FronteggProvider } from "@frontegg/react";

const contextOptions = {
    baseUrl: 'https://id.correkt.horse',
};

const authOptions = {
    keepSessionAlive: true
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <FronteggProvider contextOptions={contextOptions}
                        hostedLoginBox={false}
                        authOptions={authOptions}>
          <App />
      </FronteggProvider>,
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
