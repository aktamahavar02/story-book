// import { StrictMode } from 'react'
// import { createRoot, hydrateRoot } from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'
// import { Providers } from "../store/Provider";
// import { HelmetProvider } from "react-helmet-async";

// const container = document.getElementById("root");
// if (!container) throw new Error('Failed to find the root element');

// const appContent = (
//   <StrictMode>
//     <HelmetProvider>
//       <Providers>
//         <App />
//       </Providers>
//     </HelmetProvider>
//   </StrictMode>
// );

// // Check if the root element has pre-rendered content
// if (container.hasChildNodes()) {
//   // Hydrate the existing HTML (from react-snap)
//   hydrateRoot(container, appContent);
// } else {
//   // Normal render for development
//   const root = createRoot(container);
//   root.render(appContent);
// }


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Providers } from "../store/Provider";
import { HelmetProvider } from 'react-helmet-async';
const container = document.getElementById("root");
if (!container) throw new Error('Failed to find the root element');
// import Helmet  from "react-helmet";

const root = createRoot(container);
root.render(
  <StrictMode>
    <HelmetProvider>
    <Providers>
      <App />
    </Providers>
    </HelmetProvider>
    </StrictMode>    
);
