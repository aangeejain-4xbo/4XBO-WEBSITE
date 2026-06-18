import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import App from './App.tsx';
import { RouterProvider } from './router.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* reducedMotion="user" makes all Framer Motion animations honor the OS
        "reduce motion" setting (transforms are reduced, opacity is kept). */}
    <MotionConfig reducedMotion="user">
      <RouterProvider>
        <App />
      </RouterProvider>
    </MotionConfig>
  </StrictMode>,
);
