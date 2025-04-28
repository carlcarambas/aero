// import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
// import AppContextProvider from '@context/app.context';
// import AppContextProvider from './context/app.context';
import AppContextProvider from '@context/app.context';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './query-client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
