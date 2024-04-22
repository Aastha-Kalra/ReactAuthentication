import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div style={{background:'black' , minHeight:'100vh', color:"green"}}>
  <BrowserRouter>
  <Navbar />
  </BrowserRouter>
    </div>
  );
}

export default App;