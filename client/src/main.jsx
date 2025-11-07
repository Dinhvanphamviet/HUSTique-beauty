import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import { AppContextProvider } from './context/AppContext.jsx'
import { ChatProvider } from './context/ChatContext.jsx'
import { BrowserRouter } from "react-router-dom"; 

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChatProvider> 
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <BrowserRouter> 
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </BrowserRouter>
      </ClerkProvider>
    </ChatProvider>
  </React.StrictMode>,
)