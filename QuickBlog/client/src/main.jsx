
import { createRoot } from 'react-dom/client';
import './index.css';
import 'quill/dist/quill.snow.css';
import App from './App.jsx';
import { AppProvider } from './context/AppContext.jsx';
import { BrowserRouter } from 'react-router-dom';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>,
)
