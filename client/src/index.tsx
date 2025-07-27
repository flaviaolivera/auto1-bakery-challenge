import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.scss';  
import App from './App';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);