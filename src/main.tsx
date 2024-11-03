import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { MusicProvider } from './context/MusicContext/MusicProvider.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MusicProvider>
      <App />
    </MusicProvider>
  </StrictMode>,
)
