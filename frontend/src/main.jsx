// react-router-dom exports many things (BrowserRouter, Route, Link, etc.) as named exports, so you must use {} to pick the one you want.
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
 
    <BrowserRouter>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </BrowserRouter>
)
