import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Send from "./Pages/Send";
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/send' element={<Send/>}/>
    </Routes>
</BrowserRouter>  
</>
  );
}

export default App;
