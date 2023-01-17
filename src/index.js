import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './pages/Home';
import Helmet from 'react-helmet'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Helmet title="Lista de tarefas" />
    <App />
  </React.StrictMode>
);
