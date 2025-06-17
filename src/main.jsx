import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.css'   // mova seu index.css para dentro de styles/

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div className="container-fluid p-0">
        <App />
      </div>
    </BrowserRouter>
  </StrictMode>
)
