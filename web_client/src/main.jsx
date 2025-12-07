
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter  as Router } from "react-router-dom"; // or HashRouter
import App from './App.jsx';
import './index.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Router> 
    <App />
     </Router> 
  </StrictMode>,
)













// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter as Router } from "react-router-dom"; // or HashRouter
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Router>
//       <App />
//     </Router>
//   </StrictMode>,
// )
