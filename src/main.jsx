import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import App from './App';
import { store } from './store';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router> {/* Wrap your app with Router */}
        <App />
      </Router>
    </Provider>
  </StrictMode>,
);

  {/* // <Provider store={store}>
  //   <PersistGate loading={null} persistor={persistor}>
  //     <ApiProvider api={authApi}>
  //       <App />
  //     </ApiProvider>
  //   </PersistGate>
  // </Provider> */}
