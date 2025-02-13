import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { MusicProvider } from './context/MusicContext/MusicProvider.tsx'
import { HeaderMenuProvider } from './context/HeaderMenuContext/HeaderMenuProvider.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeaderMenuProvider>
      <MusicProvider>
        <App />
      </MusicProvider>
    </HeaderMenuProvider>
  </StrictMode>,
)
