import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';
import Reducer from './_reducers';

//store에서 promise, function을 받을 수 있게 middleware를 연결해줌(연결해주지 않으면 object만 받을 수 있음)
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, reduxThunk)(createStore);

// index.html 의 root아이디의 div를 element로 잡은 다음
// 해당 div에 보여줄 컴포넌트를 render을 통해 보여주는 것.
const root = ReactDOM.createRoot(document.getElementById('root'));
// App.js의 컴포넌트가 이 안으로 들어와서 실행되고 있음
root.render(
  <React.StrictMode>
    {/* react-redux의 Provider을 통해 app를 감싸줌으로써  App와 redux를 연결시켜준다 */}
      <Provider
      // state는 관리를 하는 전용 장소로, state들이 store안에 객체 형식으로 저장된다. 
        store={createStoreWithMiddleware(Reducer,
              window.__REDUX_DEVTOOLS_EXTENSION__ &&
              window.__REDUX_DEVTOOLS_EXTENSION__()
          )}
      >
        <App />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



// Redux
// state 관리 라이브러리
// Redux는 한방향으로만 흘러가는 unidirectional data flow를 가지고 있으며 Component에서 시작해서 -> Action -> Reducer -> Store 다시 Component의 Flow를 반복한다.
// Action : 객체로 되어있으며 어떤 행동이 일어났는지를 설명하는 것
// Reducer : 이전 state와 action object를 받은 후에 next state(변경된 상태 값)를 return한다.
// Store : State를 감싸주는 역할을 하고 있음

// props vs state
// 1. props
//    1) properties의 약자
//    2) 부모 컴포넌트와 자식컴포넌트가 있을 때 컴포넌트간에 무언가를 주고 받을 떄는 props를 이용해야 한다.
//    3) props는 소통 방식이 부모 -> 자식으로 위에서 아래로만 보낼 수 있음
//    4) props는 부모컴포넌트에서 받은 값은 자식컴포넌트 내에서 바꿀 수가 없다.(immutable)
// 2. state
//    1) 부모 컴포넌트 -> 자식 컴포넌트가 아닌 그 컴포넌트 안에서 데이터를 전달 할 때는 state를 사용
//    2) 값을 전달받은 컴포넌트는 그 안에서도 전달 받은 값을 변경 할 수 있다.(mutable)
//    3) 전달 받은 값이 변경되면 reRendering 된다.