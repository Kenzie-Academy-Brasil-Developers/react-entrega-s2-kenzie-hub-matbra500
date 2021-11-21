import './App.css';
import GlobalStyles from './styles/global'
import  Routes  from './routes';
function App() {
  return (
    <>
    <GlobalStyles/>
    <div className='title'>
      Kenzie
      <div>Hub</div>
    </div>
    <Routes/>
    <div className='whitespace'></div>
    </>
  );
}

export default App;
