import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"
import Shoppies from "./components/Shoppies";

function App() {
  return (
    <BrowserRouter>
    <Route exact path="/" component={Shoppies}/>
    </BrowserRouter>
  );
}

export default App;
