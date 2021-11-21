import "./App.css";
import GlobalStyles from "./styles/global";
import Routes from "./routes";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <GlobalStyles />
      <Toaster position="top-center" reverseOrder={true} />
      <div className="title">
        Kenzie
        <div>Hub</div>
      </div>
      <Routes />
      <div className="whitespace"></div>
    </>
  );
}

export default App;
