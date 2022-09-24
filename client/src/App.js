// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage'

// 메인화면이 실행됬을 App.js를 랜더링해서 보여주는 화면
// 이 App.js 는 index.js에서 컴포넌트를 넣어줬기 때문에 시작화면에서 뜨게되는 것.
function App() {
  return (
    // react-router-dom은 6버전 이상부터는 Switch대신 Routes를 사용하고
    // Routes의 자식요소로는 Route만 올 수 있다.
    // 그리고 component 대신 element를 사용한다.
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<LandingPage />} />
        <Route path="/login" element = {<LoginPage />} />
        <Route path="/register" element = {<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;