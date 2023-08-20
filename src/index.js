import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './utils/store/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <RouterProvider router={App} />
    </Provider>
);
