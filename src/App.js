
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import { News } from './components/news';
// businessentertainmentgeneralhealthsciencesportstechnology


function App() {
  return (
    <>
   
   <Router>
    <Navbar></Navbar>
    
    <Routes>
      <Route path="/" element={<News key="general"  pageSize={15} content="general"/>}></Route>
      <Route  path="/business" element={<News key="business" pageSize={15} content="business"/>}></Route>
      <Route  path="/entertainment" element={<News key="entertainment" pageSize={15} content="entertainment"/>}></Route>
      <Route  path="/general" element={<News key="general" pageSize={15} content="general"/>}></Route>
      <Route   path="/health" element={<News key="health" pageSize={15} content="health"/>}></Route>
      <Route path="/science" element={<News key="science" pageSize={15} content="science"/>}></Route>
      <Route  path="/sports" element={<News key="sports" pageSize={15} content="sports"/>}></Route>
      <Route  path="/technology" element={<News key="technology" pageSize={15} content="technology"/>}></Route>
    </Routes>
    </Router>
    </>
  );
}

export default App;
