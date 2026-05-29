import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Main from "./main/Main"
import List from "./list/List"
import Animal from "./animal/Animal";
import Chart from "./chart/Chart";

import { Provider } from 'react-redux';
import store from './store';
import Testing from './testing/Testing';

const router = createBrowserRouter([
    {
        path: "",
        element: <Main />,
    },
    {
        path: "/list",
        element: <List />,
    },
    {
        path: "/animal/:id",
        element: <Animal />,
    },
    {
        path: "/chart",
        element: <Chart />
    },
    {
        path: "/test",
        element: <Testing />
    }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
