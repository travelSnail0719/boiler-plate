import logo from './logo.svg';
import './App.css';


// 메인화면이 실행됬을 App.js를 랜더링해서 보여주는 화면
// 이 App.js 는 index.js에서 컴포넌트를 넣어줬기 때문에 시작화면에서 뜨게되는 것.
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
