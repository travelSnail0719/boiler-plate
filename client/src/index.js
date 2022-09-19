import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// index.html 의 root아이디의 div를 element로 잡은 다음
// 해당 div에 보여줄 컴포넌트를 render을 통해 보여주는 것.
const root = ReactDOM.createRoot(document.getElementById('root'));
// App.js의 컴포넌트가 이 안으로 들어와서 실행되고 있음
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
