import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { LessonProvider } from './context/LessonContext.jsx';
import { AudioProvider } from './context/AudioContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LessonProvider>
          <AudioProvider>
            <App />
          </AudioProvider>
        </LessonProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
