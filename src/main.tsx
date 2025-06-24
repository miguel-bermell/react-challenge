import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const root = document.getElementById('root')!;

createRoot(root).render(
  <StrictMode>
    <h1>Custom Elements</h1>
  </StrictMode>
);
