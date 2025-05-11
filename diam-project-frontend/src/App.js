import { Routes, Route } from 'react-router-dom';
import Home from './Home.js';
import About from './About.js';
import Login from './Login.js';
import Signup from './Signup.js';
import Anuncio from './Anuncio.js';
import CreateAnuncio from './CreateAnuncio.js';

function App() {
  return (
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sobre" element={<About/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/anuncio" element={<Anuncio/>}/>
          <Route path="/anuncio/criar-anuncio" element={<CreateAnuncio/>}/>
      </Routes>
  );
}

export default App;