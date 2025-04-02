import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx';

import App from './App.jsx'

// import stylesheets from styles folder
import './styles/reset.css';
import './styles/global.css';

// wrap app in UserProvider to provide context
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
