import AddJobs from "./Pages/AddJobs";
import Login from "./Pages/Login";
import MainPage from "./Pages/MainPage";
import Register from "./Pages/Register";
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import SingleJobPost from "./Pages/SingleJobPost";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
      </Routes>
      <Routes>
        <Route exact path="/register" element={<Register/>}/>
      </Routes>
      <Routes>
        <Route exact path="/home-page" element={<MainPage/>}/>
      </Routes>
      <Routes>
        <Route exact path="/add-jobPost" element={<AddJobs/>}/>
      </Routes>
      <Routes>
        <Route exact path="/singleJobPost/:jobId" element={<SingleJobPost/>}/>
      </Routes>
     

    </BrowserRouter>

    </>
  );
}

export default App;
